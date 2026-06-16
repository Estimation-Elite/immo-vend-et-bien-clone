import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot anti-spam
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Validation des champs requis
    const { nom, email, telephone, ville } = body;
    if (!nom || !email || !telephone || !ville) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 },
      );
    }

    const hookUrl = process.env.HOOK_URL;
    if (!hookUrl) {
      console.error('HOOK_URL non configuré');
      return NextResponse.json(
        { error: 'Une erreur est survenue. Veuillez réessayer.' },
        { status: 500 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const content = {
      typeDeBien: body.typeDeBien || '',
      adresse: body.adresse || '',
      ville: body.ville,
      codePostal: body.codePostal || '',
      delaiVente: body.delaiVente || '',
      nom: body.nom,
      email: body.email,
      telephone: body.telephone,
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_term: body.utm_term || '',
      utm_content: body.utm_content || '',
      source: 'site-web',
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(hookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error('Webhook Make erreur:', response.status);
      return NextResponse.json(
        { error: 'Une erreur est survenue. Veuillez réessayer.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Webhook Make timeout');
      return NextResponse.json(
        { error: 'Le serveur met trop de temps à répondre. Veuillez réessayer.' },
        { status: 504 },
      );
    }
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 },
    );
  }
}
