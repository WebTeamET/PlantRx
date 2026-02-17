import Client from 'shopify-buy';

// Initialize Shopify client with environment variables
const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''
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

      console.log(`✅ SERVER: GraphQL success - received ${data.products.edges.length} products`);
      
      // Check first product for metafields
      if (data.products.edges.length > 0) {
        const firstNode = data.products.edges[0].node;
        console.log('🔍 SERVER: First product from Shopify API:', firstNode.title);
        console.log('🔍 SERVER: heroBanner in API response?', firstNode.heroBanner ? 'YES ✅' : 'NO ❌');
        
        if (firstNode.productIngredients) {
             console.log('🔍 SERVER: productIngredients found');
             console.log('🔍 SERVER: productIngredients value:', firstNode.productIngredients.value);
             console.log('🔍 SERVER: productIngredients references count:', firstNode.productIngredients.references?.edges?.length || 0);
        } else {
             console.log('🔍 SERVER: productIngredients NOT found');
        }
      }

      const products = data.products.edges.map((edge: any) => {
        const product = edge.node;
        
        // Map ingredients from metafield references to clean array
        const ingredients = product.productIngredients?.references?.edges?.map((edge: any) => 
            edge.node.image?.url || edge.node.url
        ).filter(Boolean) || [];

        // Map side ingredients from metafield references to clean array
        const sideIngredients = product.sideIngredient?.references?.edges?.map((edge: any) => 
            edge.node.image?.url || edge.node.url
        ).filter(Boolean) || [];

        if (ingredients.length > 0) {
            console.log(`✅ SERVER: Processed ${ingredients.length} ingredients for product: ${product.title}`);
        }
        if (sideIngredients.length > 0) {
            console.log(`✅ SERVER: Processed ${sideIngredients.length} side ingredients for product: ${product.title}`);
        }

        // Map image_with_text metaobjects
        const imageWithText = product.imageWithText?.references?.edges?.map((edge: any) => {
          const fields = edge.node.fields;
          const getFieldValue = (key: string) => fields.find((f: any) => f.key === key)?.value;
          const getFieldReference = (key: string) => fields.find((f: any) => f.key === key)?.reference?.image?.url;

          return {
            title: getFieldValue('title') || '',
            description: getFieldValue('description') || '',
            icon: getFieldReference('icon') || '',
            image: getFieldReference('image') || '',
            isLeft: getFieldValue('isleft') === 'true'
          };
        }) || [];

        return {
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          images: product.images.edges.map((imgEdge: any) => ({
            id: imgEdge.node.id,
            src: imgEdge.node.url,
            url: imgEdge.node.url,
            altText: imgEdge.node.altText,
          })),
          variants: product.variants.edges.map((varEdge: any) => ({
            id: varEdge.node.id,
            title: varEdge.node.title,
            price: {
              amount: varEdge.node.price.amount,
              currencyCode: varEdge.node.price.currencyCode,
            },
            available: varEdge.node.availableForSale,
            availableForSale: varEdge.node.availableForSale,
          })),
          vendor: product.vendor,
          productType: product.productType,
          tags: product.tags,
          // Add metafields
          heroBanner: product.heroBanner,
          productIngredients: product.productIngredients,
          productCardIngredientsImage: product.productCardIngredientsImage,
          sideIngredient: product.sideIngredient,
          activeTitle: product.activeTitle?.value || undefined,
          activeDescription: product.activeDescription?.value || undefined,
          
          ingredients: ingredients,
          sideIngredients: sideIngredients,
          imageWithText: imageWithText
        };
      });

      console.log(`✅ SERVER: Mapped ${products.length} products`);
      console.log('🔍 SERVER: First mapped product has heroBanner?', products[0]?.heroBanner ? 'YES ✅' : 'NO ❌');
      
      return products;
    } catch (error) {
      console.error('❌ SERVER: Error in fetchProductsWithGraphQL:', error);
      console.log('⚠️ SERVER: Falling back to SDK method');
      // Fallback to SDK method
      return this.fetchProductsWithSDK();
    }
  },

  // Original SDK-based fetch (renamed for clarity)
  async fetchProductsWithSDK(): Promise<ShopifyProduct[]> {
    try {
      let allProducts: any[] = [];
      let hasMore = true;
      let currentPage: any[] = [];
      
      // Start with a reasonable page size
      currentPage = await client.product.fetchAll(50);
      allProducts = [...currentPage];
      
      // Continue fetching pages until no more products
      while (hasMore && currentPage.length > 0) {
        try {
          if (currentPage.length === 50) {
            // Try to fetch next page
            const nextPage = await client.product.fetchNextPage(currentPage);
            if (nextPage && nextPage.length > 0) {
              allProducts = [...allProducts, ...nextPage];
              currentPage = nextPage;
            } else {
              hasMore = false;
            }
          } else {
            // Less than 50 products means we've reached the end
            hasMore = false;
          }
        } catch (error) {
          console.log('No more pages available, total fetched:', allProducts.length);
          hasMore = false;
        }
      }
      
      console.log(`⚠️ Fetched ${allProducts.length} products via SDK (no metafields)`);
      
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
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Main fetch products method - uses GraphQL by default
  async fetchProducts(): Promise<ShopifyProduct[]> {
    console.log('🔄 SERVER: fetchProducts() called - will use GraphQL');
    const result = await this.fetchProductsWithGraphQL();
    
    if (result.length > 0) {
      console.log('🔍 SERVER: First product keys:', Object.keys(result[0]));
      console.log('🔍 SERVER: Has heroBanner?', 'heroBanner' in result[0]);
      if (result[0].heroBanner) {
        console.log('✅ SERVER: heroBanner exists!', result[0].heroBanner);
      }
    }
    
    return result;
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
          amount: cart.subtotalPrice.amount,
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount,
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
      const lineItemsToAdd = [{
        variantId,
        quantity
      }];
      
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
          amount: cart.subtotalPrice.amount,
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount,
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
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity
      }];
      
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
          amount: cart.subtotalPrice.amount,
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount,
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
          amount: cart.subtotalPrice.amount,
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount,
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
          amount: cart.subtotalPrice.amount,
          currencyCode: cart.subtotalPrice.currencyCode
        },
        totalPrice: {
          amount: cart.totalPrice.amount,
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