export const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
export const SHOP_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
export const API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-01";

if (!SHOP_DOMAIN || !SHOP_TOKEN) {
  console.warn("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local");
}

async function shopifyFetch(query: string, variables?: Record<string, any>) {
  if (!SHOP_DOMAIN || !SHOP_TOKEN) {
    throw new Error("Missing Shopify env variables");
  }

  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOP_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify fetch failed ${res.status}: ${body}`);
  }

  const json = await res.json();
  if (json.errors) {

    console.error("GraphQL errors:", json.errors);
    throw new Error("Shopify GraphQL error: " + JSON.stringify(json.errors));
  }
  return json.data;
}

export async function getProducts(first = 12) {
  const query = `query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
            variants(first: 1) {
            edges {
                node {
                id
                price {
                    amount
                    currencyCode
                }
                availableForSale
                }
            }
           }
        }
      }
    }
  }`;

  const data = await shopifyFetch(query, { first });
  return data.products.edges; 
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          id
          name
          values
        }
        images(first: 3) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle });
  const product = data.product;

  // Flatten images for easy mapping in UI
  const images = [
    product.featuredImage,
    ...product.images.edges.map((edge: any) => edge.node),
  ];

  return { ...product, images };
}

// add to lib/shopify.ts (below your existing functions)
export async function getCollectionByHandle(handle: string, first = 12) {
  const query = `
    query collectionByHandle($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        description
        image { url altText }
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              featuredImage { url altText }
              priceRange { minVariantPrice { amount currencyCode } }
              variants(first:1) {
                edges { node { id price { amount currencyCode } availableForSale } }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle, first });
  return data.collectionByHandle;
}