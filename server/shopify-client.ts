import Client from 'shopify-buy';

// Initialize Shopify client with environment variables
const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-01'
});

export default client;

// Types for Shopify data (shared with frontend)
export interface ShopifyMetafield {
  id?: string;
  namespace: string;
  key: string;
  value: string;
  type?: string;
  reference?: {
    __typename?: "MediaImage" | string;
    image?: {
      url: string;
      altText?: string;
    };
  };
  references?: {
    edges: {
      node: {
        image?: {
          url: string;
          altText?: string;
        };
        url?: string;
      };
    }[];
  };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    id: string;
    src: string;
    url?: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    available: boolean;
    availableForSale?: boolean;
  }>;
  vendor?: string;
  productType?: string;
  tags: string[];

  // Metafields
  heroBanner?: ShopifyMetafield;
  productIngredients?: ShopifyMetafield;
  productCardIngredientsImage?: ShopifyMetafield;
  sideIngredient?: ShopifyMetafield;
  activeTitle?: string;
  activeDescription?: string;

  heroSection?: any;
  supplementHero?: any;
  imagesWithInfo?: any;
  marquee?: any;
  productDetails?: any;
  iconWithText?: any;
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

  // Derived fields
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

const PRODUCT_FIELDS_FRAGMENT = `
  id
  title
  description
  handle
  vendor
  productType
  tags
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
  activeTitle: metafield(namespace: "custom", key: "active_title") {
    value
  }
  activeDescription: metafield(namespace: "custom", key: "active_description") {
    value
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
            ... on Metaobject {
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image { url }
                  }
                }
              }
            }
          }
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url }
                      }
                    }
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
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url }
            }
          }
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  cardWithIcon: metafield(namespace: "custom", key: "card_with_icon") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url }
            }
          }
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url }
                      }
                    }
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
    reference {
      ... on Metaobject {
        fields {
          key
          value
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  features: metafield(namespace: "custom", key: "features") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url }
            }
          }
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  supplementHero: metafield(namespace: "custom", key: "supplement_hero") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url altText }
            }
          }
        }
      }
    }
  }
  imagesWithInfo: metafield(namespace: "custom", key: "images_with_info") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          references(first: 10) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url altText }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  supplementKeyIngredients: metafield(namespace: "custom", key: "supplement_key_ingredients") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url altText }
            }
          }
        }
      }
    }
  }
  howToUse: metafield(namespace: "custom", key: "how_to_use") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url altText }
            }
          }
        }
      }
    }
  }
  qualityStandards: metafield(namespace: "custom", key: "quality_standards") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          references(first: 20) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url altText }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  whoShouldAvoid: metafield(namespace: "custom", key: "who_should_avoid_it") {
    reference {
      ... on Metaobject {
        fields {
          key
          value
          references(first: 20) {
            edges {
              node {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on MediaImage {
                        image { url altText }
                      }
                    }
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
    reference {
      ... on Metaobject {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image { url }
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
`;

const COLLECTION_FIELDS_FRAGMENT = `
  id
  title
  handle
  collection_banner: metafield(namespace: "custom", key: "collection_banner") {
    value
    reference {
      ... on Metaobject {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
          references(first: 20) {
            edges {
              node {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


// Shopify service functions for server-side use
// Helper to parse Shopify RichText JSON to plain text
const parseRichText = (input: any): string => {
  if (!input) return '';
  try {
    const data = typeof input === 'string' ? JSON.parse(input) : input;
    if (!data || typeof data !== 'object') return String(input);

    const parseNode = (node: any): string => {
      if (!node) return '';
      if (node.type === 'text') return node.value || '';
      if (node.type === 'paragraph') {
        return (node.children?.map(parseNode).join('') || '') + '\n';
      }
      if (node.children && Array.isArray(node.children)) {
        return node.children.map(parseNode).join('');
      }
      return '';
    };
    return parseNode(data).trim();
  } catch (e) {
    console.error('Error parsing RichText:', e);
    return typeof input === 'string' ? input : JSON.stringify(input);
  }
};

// Helper to parse JSON list strings
const parseJsonList = (jsonString: string): string[] => {
  try {
    if (!jsonString || !jsonString.startsWith('[')) return [jsonString];
    return JSON.parse(jsonString);
  } catch (e) {
    return [jsonString];
  }
};

// Helper to extract fields from a metaobject reference
const mapMetaobject = (metafield: any): any => {
  const node = metafield?.reference || metafield;
  if (!node || !node.fields) return null;

  const result: any = { id: node.id };
  node.fields.forEach((f: any) => {
    let value = f.value;

    // Handle RichText (string containing JSON structure or already object)
    const isRichText = (val: any) => {
      if (!val) return false;
      if (typeof val === 'object' && val.type === 'root') return true;
      if (typeof val === 'string' && val.includes('"type":"root"')) return true;
      return false;
    };

    if (isRichText(value)) {
      value = parseRichText(value);
    }
    // Handle JSON lists
    else if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = parseJsonList(value);
    }

    // Handle Lists of Metaobjects (references/references)
    const refNodes = f.references?.nodes || f.references?.edges?.map((e: any) => e.node);
    if (refNodes && refNodes.length > 0) {
      value = refNodes.map((n: any) => {
        if (n.image?.url) return n.image.url;
        if (n.fields) return mapMetaobject({ reference: n });
        return null;
      }).filter(Boolean);
    }
    // Handle Single Metaobject reference with fields
    else if (f.reference?.fields) {
      value = mapMetaobject({ reference: f.reference });
    }
    // Handle Media Image
    else if (f.reference?.image?.url) {
      value = f.reference.image.url;
    }

    result[f.key] = value;
  });
  return result;
};


const mapMetaobjectsList = (metafield: any): any[] => {
  const nodes = metafield?.references?.nodes || metafield?.references?.edges?.map((e: any) => e.node) || [];
  return nodes.map((node: any) => mapMetaobject({ reference: node })).filter(Boolean);
};

// Internal product mapping logic shared between list and single fetch
const mapShopifyProduct = (product: any): ShopifyProduct => {
  const mainImage = product.images?.edges?.[0]?.node;
  const images = product.images?.edges?.map((e: any) => ({
    id: e.node.id,
    url: e.node.url,
    src: e.node.url,
    altText: e.node.altText
  })) || [];

  const variants = product.variants?.edges?.map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    price: e.node.price,
    availableForSale: e.node.availableForSale,
    available: e.node.availableForSale
  })) || [];

  const bannerImg = product.heroBanner?.reference?.image?.url;
  
  const productIngredients = product.productIngredients?.references?.edges?.map((e: any) => ({
    url: e.node.url || e.node.image?.url,
    altText: e.node.image?.altText
  })) || [];

  const sideIngredients = product.sideIngredient?.references?.edges?.map((e: any) => ({
    url: e.node.url || e.node.image?.url,
    altText: e.node.image?.altText
  })) || [];

  const imageWithText = product.imageWithText?.references?.edges?.map((e: any) => mapMetaobject({ reference: e.node })) || [];

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    handle: product.handle,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags,
    images: images,
    variants: variants,
    featuredImage: mainImage,
    
    heroBanner: bannerImg ? { image: { url: bannerImg } } : null,
    productIngredients: productIngredients,
    sideIngredients: sideIngredients,
    imageWithText: imageWithText,
    
    heroSection: mapMetaobject(product.heroSection),
    supplementHero: mapMetaobject(product.supplementHero),
    imagesWithInfo: mapMetaobject(product.imagesWithInfo),
    supplementKeyIngredients: mapMetaobject(product.supplementKeyIngredients),
    howToUse: mapMetaobject(product.howToUse),
    qualityStandards: mapMetaobject(product.qualityStandards),
    whoShouldAvoid: mapMetaobject(product.whoShouldAvoid),
    marquee: product.marquee?.value ? parseJsonList(product.marquee.value) : [],
    productDetails: mapMetaobject(product.productDetails),
    iconWithText: mapMetaobjectsList(product.iconWithText),
    keyIngredient: mapMetaobject(product.keyIngredient),
    benefitsMeta: mapMetaobject(product.benefits),
    cardSpin: mapMetaobject(product.cardSpin),
    cardWithIcon: mapMetaobject(product.cardWithIcon),
    faqList: mapMetaobject(product.faqList),
    featuresMeta: mapMetaobject(product.features),
    imageWithDetails: mapMetaobject(product.imageWithDetails),
    colors: mapMetaobject(product.colors)
  } as unknown as ShopifyProduct;
};

// Shopify service functions for server-side use
export const serverShopifyService = {
  // GraphQL query for fetching products with metafields
  async fetchProductsWithGraphQL(): Promise<ShopifyProduct[]> {
    try {
      const query = `
        query {
          products(first: 50) {
            edges {
              node {
                ${PRODUCT_FIELDS_FRAGMENT}
              }
            }
          }
        }
      `;

      const response = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const { data, errors } = await response.json();

      if (errors) {
        console.error('GraphQL errors:', errors);
        throw new Error('GraphQL query returned errors');
      }

      const edges = data.products?.edges || [];
      console.log(`✅ SERVER: GraphQL success - received ${edges.length} products`);

      const products = edges.map((edge: any) => mapShopifyProduct(edge.node));

      console.log(`✅ SERVER: Mapped ${products.length} products`);
      
      return products;
    } catch (error) {
      console.error('❌ SERVER: Error in fetchProductsWithGraphQL:', error);
      console.log('⚠️ SERVER: Falling back to SDK method');
      const sdkProducts = await this.fetchProductsWithSDK();
      return sdkProducts.map(p => ({
        ...p,
        heroSection: {},
        productDetails: {},
        keyIngredient: {},
        benefitsMeta: {},
        cardSpin: {},
        cardWithIcon: {},
        faqList: {},
        featuresMeta: {},
        imageWithDetails: {},
        iconWithText: [],
        marquee: []
      } as any));
    }
  },

  // Fetch a single product by handle with dynamic metafield mapping
  async fetchProductByHandleWithGraphQL(handle: string): Promise<ShopifyProduct | null> {
    try {
      console.log(`🔄 SERVER: Fetching single product by handle: ${handle}`);
      const query = `
        query getProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            ${PRODUCT_FIELDS_FRAGMENT}
          }
        }
      `;

      const response = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
          },
          body: JSON.stringify({ 
            query,
            variables: { handle }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const { data, errors } = await response.json();

      if (errors) {
        console.error('GraphQL errors:', errors);
        throw new Error('GraphQL query returned errors');
      }

      const product = data.productByHandle;
      if (!product) {
        console.log(`❌ SERVER: Product with handle "${handle}" not found`);
        return null;
      }

      const mappedProduct = mapShopifyProduct(product);
      console.log(`✅ SERVER: Successfully mapped single product: ${mappedProduct.title}`);
      return mappedProduct;
    } catch (error) {
      console.error('❌ SERVER: Error in fetchProductByHandleWithGraphQL:', error);
      return null;
    }
  },

  // Fetch a collection by handle with metafields
  async fetchCollectionByHandle(handle: string): Promise<any | null> {
    try {
      console.log(`🔄 SERVER: Fetching collection by handle: ${handle}`);
      const query = `
        query getCollectionByHandle($handle: String!) {
          collection(handle: $handle) {
            ${COLLECTION_FIELDS_FRAGMENT}
          }
        }
      `;

      const response = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
          },
          body: JSON.stringify({ 
            query,
            variables: { handle }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const { data, errors } = await response.json();

      if (errors) {
        console.error('GraphQL errors:', errors);
        throw new Error('GraphQL query returned errors');
      }

      const collection = data.collection;
      if (!collection) {
        console.log(`❌ SERVER: Collection with handle "${handle}" not found`);
        return null;
      }

      // Map the collection and its banner metafield
      const result = {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        banner: mapMetaobject(collection.collection_banner)
      };

      console.log(`✅ SERVER: Successfully fetched collection: ${result.title}`);
      return result;
    } catch (error) {
      console.error('❌ SERVER: Error in fetchCollectionByHandle:', error);
      return null;
    }
  },

  // Original SDK-based fetch

  async fetchProductsWithSDK(): Promise<ShopifyProduct[]> {
    try {
      let allProducts: any[] = await client.product.fetchAll(50);
      return allProducts.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        images: product.images.map((img: any) => ({
          id: img.id,
          src: img.src,
          url: img.src,
          altText: img.altText
        })),
        variants: product.variants.map((variant: any) => ({
          id: variant.id,
          title: variant.title,
          price: {
            amount: variant.price.amount,
            currencyCode: variant.price.currencyCode
          },
          available: variant.available,
          availableForSale: variant.available
        })),
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags
      })) as any[];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Main fetch products method - uses GraphQL by default
  async fetchProducts(): Promise<ShopifyProduct[]> {
    return this.fetchProductsWithGraphQL();
  },

  // Create cart
  async createCart(): Promise<ShopifyCart | null> {
    try {
      const cart = await client.checkout.create();
      return {
        id: cart.id,
        lineItems: cart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode
            },
            product: {
              title: item.variant.product.title,
              handle: item.variant.product.handle
            }
          },
          quantity: item.quantity
        })),
        subtotalPrice: {
          amount: cart.subtotalPrice.amount.toString(),
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount.toString(),
          currencyCode: cart.totalPrice.currencyCode
        },
        webUrl: cart.webUrl
      };
    } catch (error) {
      console.error('Error creating cart:', error);
      return null;
    }
  },

  // Add item to cart
  async addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<ShopifyCart | null> {
    try {
      const lineItemsToAdd = [{ variantId, quantity }];
      const cart = await client.checkout.addLineItems(cartId, lineItemsToAdd);
      return {
        id: cart.id,
        lineItems: cart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode
            },
            product: {
              title: item.variant.product.title,
              handle: item.variant.product.handle
            }
          },
          quantity: item.quantity
        })),
        subtotalPrice: {
          amount: cart.subtotalPrice.amount.toString(),
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount.toString(),
          currencyCode: cart.totalPrice.currencyCode
        },
        webUrl: cart.webUrl
      };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
  },

  // Update cart item quantity
  async updateCartItem(cartId: string, lineItemId: string, quantity: number): Promise<ShopifyCart | null> {
    try {
      const lineItemsToUpdate = [{ id: lineItemId, quantity }];
      const cart = await client.checkout.updateLineItems(cartId, lineItemsToUpdate);
      return {
        id: cart.id,
        lineItems: cart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode
            },
            product: {
              title: item.variant.product.title,
              handle: item.variant.product.handle
            }
          },
          quantity: item.quantity
        })),
        subtotalPrice: {
          amount: cart.subtotalPrice.amount.toString(),
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount.toString(),
          currencyCode: cart.totalPrice.currencyCode
        },
        webUrl: cart.webUrl
      };
    } catch (error) {
      console.error('Error updating cart:', error);
      return null;
    }
  },

  // Remove item from cart
  async removeFromCart(cartId: string, lineItemId: string): Promise<ShopifyCart | null> {
    try {
      const cart = await client.checkout.removeLineItems(cartId, [lineItemId]);
      return {
        id: cart.id,
        lineItems: cart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode
            },
            product: {
              title: item.variant.product.title,
              handle: item.variant.product.handle
            }
          },
          quantity: item.quantity
        })),
        subtotalPrice: {
          amount: cart.subtotalPrice.amount.toString(),
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount.toString(),
          currencyCode: cart.totalPrice.currencyCode
        },
        webUrl: cart.webUrl
      };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return null;
    }
  },

  // Fetch cart by ID
  async fetchCart(cartId: string): Promise<ShopifyCart | null> {
    try {
      const cart = await client.checkout.fetch(cartId);
      return {
        id: cart.id,
        lineItems: cart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode
            },
            product: {
              title: item.variant.product.title,
              handle: item.variant.product.handle
            }
          },
          quantity: item.quantity
        })),
        subtotalPrice: {
          amount: cart.subtotalPrice.amount.toString(),
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount.toString(),
          currencyCode: cart.totalPrice.currencyCode
        },
        webUrl: cart.webUrl
      };
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }
};