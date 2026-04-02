// Frontend Shopify service using server API endpoints

// GraphQL Query for fetching products with metafields
export const PRODUCT_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
      vendor
      productType
      tags
      
      # Metafields with file_reference type (like hero_banner)
      heroBanner: metafield(namespace: "custom", key: "hero_banner") {
        id
        namespace
        key
        type
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      
      # Other metafields (adjust as needed)
      productIngredients: metafield(namespace: "custom", key: "product_ingredients") {
        id
        namespace
        key
        type
        value
        references(first: 10) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
              ... on GenericFile {
                url
              }
            }
          }
        }
      }
      
      productCardIngredientsImage: metafield(namespace: "custom", key: "product_card_ingredients_image") {
        id
        namespace
        key
        type
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      
      sideIngredient: metafield(namespace: "custom", key: "side_ingredient") {
        id
        namespace
        key
        type
        value
        references(first: 10) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
              ... on GenericFile {
                url
              }
            }
          }
        }
      }

      imageWithText: metafield(namespace: "custom", key: "image_with_text") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      heroSection: metafield(namespace: "custom", key: "hero_section") {
        value
        reference {
          ... on Metaobject {
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
      marquee: metafield(namespace: "custom", key: "marquee") {
        value
      }
      productDetails: metafield(namespace: "custom", key: "product_details") {
        value
      }
      iconWithText: metafield(namespace: "custom", key: "icon_with_text") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      keyIngredient: metafield(namespace: "custom", key: "key_ingredient") {
        value
        reference {
          ... on Metaobject {
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
      benefits: metafield(namespace: "custom", key: "benefits") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cardSpin: metafield(namespace: "custom", key: "card_spin") {
        value
      }
      cardWithIcon: metafield(namespace: "custom", key: "card_with_icon") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      faqList: metafield(namespace: "custom", key: "faq_list") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                }
              }
            }
          }
        }
      }
      features: metafield(namespace: "custom", key: "features") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      imageWithDetails: metafield(namespace: "custom", key: "image_with_details") {
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
        colors: metafield(namespace: "custom", key: "colors") {
        reference {
          ... on Metaobject {
            id
            fields {
              key
              value
            }
          }
        }
      }
    }
  }
`;

/**
 * Extracts fields from a Metaobject reference
 */
export const getMetaobjectField = (metaobject: any, key: string): any => {
  if (!metaobject || !metaobject.fields) return null;
  const field = metaobject.fields.find((f: any) => f.key === key);
  if (!field) return null;
  if (field.reference && field.reference.image) {
    return field.reference.image.url;
  }
  return field.value;
};

/**
 * Extracts a list of metaobjects from a metafield reference
 */
export const getMetaobjectsList = (metafield: any): any[] => {
  if (!metafield || !metafield.references || !metafield.references.edges) return [];
  return metafield.references.edges.map((edge: any) => edge.node);
};

// Types for Shopify data
export interface ShopifyMetafield {
  id?: string;
  namespace: string;
  key: string;
  value?: string;
  type?: string;

  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };

  references?: {
    edges?: Array<{
      node: {
        image?: {
          url: string;
          altText?: string;
        };
        url?: string;
      };
    }>;
    nodes?: Array<{
      image?: {
        url: string;
        altText?: string;
      };
      url?: string;
    }>;
  };
}



export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    id: string;
    url: string;
    src: string;
    altText?: string;
  }>;
  heroBanner?: ShopifyMetafield;
  productIngredients?: ShopifyMetafield;
  productCardIngredientsImage?: ShopifyMetafield;
  sideIngredient?: ShopifyMetafield;
  productMetafields?: ShopifyMetafield[];
  activeTitle?: string;
  activeDescription?: string;

  heroSection?: any;
  supplementHero?: any;
  imagesWithInfo?: any;
  marquee?: string[];
  productDetails?: any;
  iconWithText?: any[];
  keyIngredient?: any;
  benefitsMeta?: any;
  cardSpin?: any;
  cardWithIcon?: any;
  faqList?: any;
  featuresMeta?: any;
  supplementKeyIngredients?: any;
  howToUse?: any;
  qualityStandards?: any;
  whoShouldAvoid?: any;
  imageWithDetails?: any;
  colors?: {
    background_color?: string;
    primary_color?: string;
    secondary_color?: string;
    [key: string]: any;
  };


  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    available?: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;

  vendor?: string;
  productType?: string;
  tags: string[];

  // Derived fields from server
  ingredients?: string[];
  sideIngredients?: string[];
  imageWithText?: {
    title: string;
    description: string;
    icon: string;
    image: string;
    isLeft: boolean;
  }[];
}


export interface ShopifyCart {
  id: string;
  lineItems: Array<{
    id: string;
    title: string;
    variant: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      product: {
        title: string;
        handle: string;
      };
    };
    quantity: number;
  }>;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  webUrl: string;
}

export const getMetafieldImage = (
  product: ShopifyProduct,
  namespace: string,
  key: string
): string | undefined => {
  if (namespace === "custom") {
    if (key === "hero_banner" && product.heroBanner?.reference?.image?.url) {
      return product.heroBanner.reference.image.url;
    }
    if (key === "product_ingredients" && product.productIngredients?.reference?.image?.url) {
      return product.productIngredients.reference.image.url;
    }
    if (key === "product_card_ingredients_image" && product.productCardIngredientsImage?.reference?.image?.url) {
      return product.productCardIngredientsImage.reference.image.url;
    }
  }

  return product.productMetafields?.find(
    (field) => field.namespace === namespace && field.key === key
  )?.reference?.image?.url;
};

/**
 * Helper function to extract ingredients array from productIngredients metafield
 * Handles list.file_reference type with references.edges structure
 */
export const getProductIngredients = (product: ShopifyProduct): string[] => {
  // If ingredients are already extracted by server, use them
  if (product.ingredients && product.ingredients.length > 0) {
    return product.ingredients;
  }

  // Otherwise, extract from metafield
  if (!product.productIngredients) {
    return [];
  }

  const metafield = product.productIngredients;
  let ingredients: string[] = [];

  // 0. Handle already mapped array from server (as seen in server/shopify-client.ts)
  if (Array.isArray(metafield)) {
    return (metafield as any[]).map(item => {
      if (typeof item === 'string') return item;
      return item.url || item.image?.url;
    }).filter(Boolean);
  }

  // 1. Try references.edges (list.file_reference with proper GraphQL structure)
  if (metafield.references?.edges && metafield.references.edges.length > 0) {
    ingredients = metafield.references.edges
      .map((edge) => edge.node.image?.url || edge.node.url)
      .filter((url): url is string => Boolean(url));
  }
  // 2. Try references.nodes (alternative structure)
  else if (metafield.references?.nodes && metafield.references.nodes.length > 0) {
    ingredients = metafield.references.nodes
      .map((node) => node.image?.url || node.url)
      .filter((url): url is string => Boolean(url));
  }
  // 3. Try singular reference (single file_reference)
  else if (metafield.reference?.image?.url) {
    ingredients = [metafield.reference.image.url];
  }
  // 4. Try parsing value JSON array (fallback when references aren't fetched)
  else if (metafield.value) {
    try {
      const parsed = JSON.parse(metafield.value);
      if (Array.isArray(parsed)) {
        // These are GIDs, but we can't fetch them client-side
        // Server should handle this, but log for debugging
        console.warn('[getProductIngredients] Found GIDs in value, but references not fetched:', parsed);
      }
    } catch (e) {
      // Not JSON, ignore
    }
  }

  return ingredients;
};

/**
 * Helper function to extract side ingredients array from sideIngredient metafield
 * Handles list.file_reference type with references.edges structure
 */
export const getSideIngredients = (product: ShopifyProduct): string[] => {
  // If side ingredients are already extracted by server, use them
  if (product.sideIngredients && product.sideIngredients.length > 0) {
    return product.sideIngredients;
  }

  // Otherwise, extract from metafield
  if (!product.sideIngredient) {
    return [];
  }

  const metafield = product.sideIngredient;
  let sideIngredients: string[] = [];

  // 1. Try references.edges (list.file_reference with proper GraphQL structure)
  if (metafield.references?.edges && metafield.references.edges.length > 0) {
    sideIngredients = metafield.references.edges
      .map((edge) => edge.node.image?.url || edge.node.url)
      .filter((url): url is string => Boolean(url));
  }
  // 2. Try references.nodes (alternative structure)
  else if (metafield.references?.nodes && metafield.references.nodes.length > 0) {
    sideIngredients = metafield.references.nodes
      .map((node) => node.image?.url || node.url)
      .filter((url): url is string => Boolean(url));
  }
  // 3. Try singular reference (single file_reference)
  else if (metafield.reference?.image?.url) {
    sideIngredients = [metafield.reference.image.url];
  }
  // 4. Try parsing value JSON array (fallback when references aren't fetched)
  else if (metafield.value) {
    try {
      const parsed = JSON.parse(metafield.value);
      if (Array.isArray(parsed)) {
        // These are GIDs, but we can't fetch them client-side
        // Server should handle this, but log for debugging
        console.warn('[getSideIngredients] Found GIDs in value, but references not fetched:', parsed);
      }
    } catch (e) {
      // Not JSON, ignore
    }
  }

  return sideIngredients;
};

export const getMetafieldValue = (
  product: ShopifyProduct,
  namespace: string,
  key: string
): string | undefined => {
  if (namespace === "custom") {
    if (key === "hero_banner" && product.heroBanner?.value) {
      return product.heroBanner.value;
    }
    if (key === "product_ingredients" && product.productIngredients?.value) {
      return product.productIngredients.value;
    }
    if (key === "product_card_ingredients_image" && product.productCardIngredientsImage?.value) {
      return product.productCardIngredientsImage.value;
    }
  }

  return product.productMetafields?.find(
    (field) => field.namespace === namespace && field.key === key
  )?.value;
};


export const shopifyService = {
  // Fetch all products
  async fetchProducts(): Promise<ShopifyProduct[]> {
    try {

      // Add cache-busting parameter
      const cacheBuster = `?_=${Date.now()}`;
      const response = await fetch(`/api/shopify/products${cacheBuster}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();

      console.log(`📦 CLIENT: Received ${products.length} products from API`);

      if (products.length > 0) {
        const firstProduct = products[0];
        console.log('🔍 CLIENT: First product keys:', Object.keys(firstProduct));
        console.log('🔍 CLIENT: First product title:', firstProduct.title);
        console.log('🔍 CLIENT: Has heroBanner?', 'heroBanner' in firstProduct);
        console.log('🔍 CLIENT: Has productIngredients?', 'productIngredients' in firstProduct);
        console.log('🔍 CLIENT: Has productCardIngredientsImage?', 'productCardIngredientsImage' in firstProduct);

        if (firstProduct.heroBanner) {
          console.log('✅ CLIENT: heroBanner found!', firstProduct.heroBanner);
        } else {
          console.log('❌ CLIENT: heroBanner is undefined/null');
        }

        console.log('🔍 CLIENT: Full first product:', firstProduct);
      }

      return products;
    } catch (error) {
      console.error('❌ CLIENT: Error fetching products:', error);
      return [];
    }
  },

  // Fetch single product by handle (not implemented for server API yet)
  async fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    try {
      console.log(`🔍 CLIENT: Fetching product by handle: ${handle}`);

      // For now, fetch all products and find by handle
      const products = await this.fetchProducts();
      const product = products.find(p => p.handle === handle) || null;

      if (product) {
        console.log(`✅ CLIENT: Found product "${product.title}"`);
        console.log('🔍 CLIENT: Product has heroBanner?', !!product.heroBanner);
        console.log('🔍 CLIENT: Full product object:', product);
      } else {
        console.log(`❌ CLIENT: Product with handle "${handle}" not found`);
      }

      return product;
    } catch (error) {
      console.error('❌ CLIENT: Error fetching product:', error);
      return null;
    }
  },

  // Create cart
  async createCart(): Promise<ShopifyCart | null> {
    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error creating cart:', error);
      return null;
    }
  },

  // Add item to cart
  async addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<ShopifyCart | null> {
    try {
      const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ variantId, quantity })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
  },

  // Update cart item quantity
  async updateCartItem(cartId: string, lineItemId: string, quantity: number): Promise<ShopifyCart | null> {
    try {
      const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}/items/${encodeURIComponent(lineItemId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error updating cart:', error);
      return null;
    }
  },

  // Remove item from cart
  async removeFromCart(cartId: string, lineItemId: string): Promise<ShopifyCart | null> {
    try {
      const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}/items/${encodeURIComponent(lineItemId)}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return null;
    }
  },

  // Fetch cart by ID
  async fetchCart(cartId: string): Promise<ShopifyCart | null> {
    try {
      const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Cart fetch error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();
      return cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  },

  // Fetch a single collection by handle
  async fetchCollectionByHandle(handle: string): Promise<any | null> {
    try {
      console.log(`🔍 CLIENT: Fetching collection by handle: ${handle}`);
      const response = await fetch(`/api/shopify/collections/${encodeURIComponent(handle)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log(`❌ CLIENT: Collection with handle "${handle}" not found`);
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const collection = await response.json();
      console.log(`✅ CLIENT: Received collection "${collection.title}"`);
      return collection;
    } catch (error) {
      console.error('❌ CLIENT: Error fetching collection:', error);
      return null;
    }
  }
};
