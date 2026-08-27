---
name: deploy-app
description: Build and deploy this Next.js app to its IONOS VPS server
disable-model-invocation: true
---

# Deploy the app to its server

Build and deploy this Next.js app (immo-vend-et-bien-clone) to the IONOS VPS server.

## Server

| Host | SSH password prefix | Remote directory |
|------|-------------------|------------------|
| Read from `.servers` → `MMB_HOST` | MMB | /opt/immo-vend-et-bien |

## Public URL

Once deployed, the app is live at **https://immovendbien.fr/** (served behind nginx-proxy-manager on the VPS). After deploying, verify with `curl -s -o /dev/null -w '%{http_code}' https://immovendbien.fr/` and report this URL to the user.

## Credentials

Server passwords are stored in the `.servers` file at the repo root. Read it to get the password. NEVER display passwords to the user.

## Prerequisites

A `Dockerfile` must exist at the project root. If it doesn't, create one before deploying:

```dockerfile
FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**Important**: This Dockerfile requires `output: "standalone"` in `next.config.ts`. If not already set, add it before building.

## Deployment steps

### Step 1: Validate

- Verify the `Dockerfile` exists at the project root. If not, create it (see Prerequisites).
- Verify `next.config.ts` has `output: "standalone"`. If not, add it.
- Read the `.servers` file to get the server password and host.

### Step 2: Build the Docker image

Run from the **project root**:

```bash
docker build -t immo-vend-et-bien:latest .
```

### Step 3: Export the image

```bash
docker save immo-vend-et-bien:latest | gzip > immo-vend-et-bien.tar.gz
```

### Step 4: Transfer to the server

```bash
sshpass -p '<PASSWORD>' scp immo-vend-et-bien.tar.gz root@<HOST>:/opt/immo-vend-et-bien/
```

### Step 5: Update .env on the server (if .env exists locally)

```bash
sshpass -p '<PASSWORD>' scp .env root@<HOST>:/opt/immo-vend-et-bien/.env
```

If no local `.env` exists, skip this step.

### Step 6: Load and restart on the server

```bash
sshpass -p '<PASSWORD>' ssh root@<HOST> \
  "cd /opt/immo-vend-et-bien && docker load < immo-vend-et-bien.tar.gz && rm immo-vend-et-bien.tar.gz && docker compose up -d && docker image prune -f"
```

### Step 7: Verify

```bash
sshpass -p '<PASSWORD>' ssh root@<HOST> "docker ps --filter name=immo-vend-et-bien --format '{{.Status}}'"
```

Report the container status to the user.

### Step 8: Cleanup

Remove the local tar.gz file:

```bash
rm immo-vend-et-bien.tar.gz
```

## Important notes

- Always build from the **project root**.
- The build can take a few minutes — inform the user.
- If the build fails, show the error and stop. Do NOT transfer a broken image.
- If disk space is low on the server, run cleanup: `docker system prune -a -f && docker builder prune -a -f`
- To update only the `.env` (no rebuild): `sshpass -p '<PASSWORD>' scp .env root@<HOST>:/opt/immo-vend-et-bien/.env && sshpass -p '<PASSWORD>' ssh root@<HOST> "cd /opt/immo-vend-et-bien && docker compose restart app"`
