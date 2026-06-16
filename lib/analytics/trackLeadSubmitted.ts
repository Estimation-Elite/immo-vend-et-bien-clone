import { pushDataLayerEvent } from "./dataLayer";

export function trackLeadSubmitted() {
  pushDataLayerEvent({
    event: "lead_submitted",
  });
}
