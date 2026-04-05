// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { SHOP_DOMAIN, SHOP_TOKEN, API_VERSION } from '@/lib/shopify';

export async function POST(req: Request) {
  try {
    const { lineItems } = await req.json();

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { id checkoutUrl }
          userErrors { field message }
        }
      }
    `;

    const variables = {
      input: {
        lines: lineItems.map((item: any) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
      },
    };

    const resp = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOP_TOKEN || '',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await resp.json();
    console.log('shopify cartCreate response', JSON.stringify(data));


    if (!resp.ok || data?.errors) {
      console.error('GraphQL / HTTP error', data);
      return NextResponse.json({ error: 'cartCreate failed', details: data }, { status: 500 });
    }

    const userErrors = data?.data?.cartCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error('cartCreate userErrors', userErrors);
      return NextResponse.json({ error: 'cartCreate userErrors', details: userErrors }, { status: 400 });
    }

    const url = data?.data?.cartCreate?.cart?.checkoutUrl;
    if (!url) {
      console.error('Missing checkoutUrl in response', data);
      return NextResponse.json({ error: 'missing checkout url', details: data }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error('checkout route uncaught error', err);
    return NextResponse.json({ error: 'internal error', details: String(err) }, { status: 500 });
  }
}