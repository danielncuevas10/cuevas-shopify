export type Price = {
    amount: string;
    currencyCode: string;
  };
  
  export type VariantNode = {
    id: string;
    price: string;
    availableForSale: boolean;
  };
  
  export type VariantEdge = {
    node: VariantNode;
  };
  
  export type ProductNode = {
    id: string;
    title: string;
    handle: string;
    description?: string | null;
    featuredImage?: { url: string; altText?: string } | null;
    priceRange?: {
      minVariantPrice?: Price | null;
      maxVariantPrice?: Price | null;
    } | null;
    variants?: { edges: VariantEdge[] } | null;
  };
  
  export type ProductEdge = {
    node: ProductNode;
  };