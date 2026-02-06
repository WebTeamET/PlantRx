export const stripsProductData = 
    {
        "collection": {
            "tagline": "Plant-powered strips, just how you like it.",
            "title": "What’s your pick?",
            // "productImage": "/strips-collection-banner-images.png",
            "productImages": [
              "Sustained-energy-alertness.png",
              "Mushroom-focus-strip.png",
              "Digestive-support-gut-balance.png",
            ],
            floatingElements: [
              { 
                id: 1, 
                src: '/strips-collection-element-1.png', 
                alt: 'Cookie 1', 
                position: { 
                  top: 'clamp(2rem, 0vh, 8rem)', 
                  left: 'clamp(2rem, 5vw, 12rem)' 
                },
                delay: 0.1,
                rotate: -15,
              }, 
              { 
                id: 2, 
                src: '/strips-collection-element_6.png', 
                alt: 'Cookie 2', 
                position: { 
                  top: 'clamp(2rem, 0vh, 8rem)', 
                  right: 'clamp(2rem, 4vw, 12rem)' 
                },
                delay: 0.3,
                rotate: 20,
                blur: false
              },
              { 
                id: 3, 
                src: '/strips-collection-element-5.png', 
                alt: 'Strawberry 1', 
                position: { 
                  top: 'clamp(8rem, 40vh, 19rem)', 
                  right: 'clamp(8rem, 35vw, 30rem)' 
                },
                delay: 0.2,
                rotate: 10
              },
              { 
                id: 4, 
                src: '/strips-collection-element-2.png', 
                alt: 'Strawberry 2', 
                position: { 
                  top: 'clamp(15rem, 58vh, 43rem)', 
                  right: 'clamp(2rem, 4vw, 8rem)' 
                },
                delay: 0.4,
                rotate: -10,
                blur: false 
              },
              { 
                id: 5, 
                src: '/strips-collection-element-3.png', 
                alt: 'Strawberry 2', 
                position: { 
                  top: 'clamp(15rem, 80vh, 28rem)', 
                  left: 'clamp(2rem, 2vw, 12rem)' 
                },
                delay: 0.4,
                rotate: -10,
                blur: false 
              }
            ]
        },
        "products": [
          {
            "id": "product-1",
            "title": "Mushroom Focus Strips",
            "price": 99.99,
            "productLink": "/strips/mushroom-focus-strips",
            "cardBgColor": "#f2e2da",
            "productImage": "Mushroom-focus-strip.png",
            "ingredients": [
              "float-chocolate1.png",
              "float-mushroom-2.png",
              "float-chocolate2.png",
              "float-mushroom-new.png"
            ]
          },
          {
            "id": "product-2",
            "title": "Sustained Energy & Alertness",
            "price": 99.99,
            "productLink": "/strips/herbal-energy-capsules",
            "cardBgColor": "#fcefdf",
            "productImage": "Sustained-energy-alertness.png",
            "ingredients": [
              "energy-element-2.png", 
              "energy-element-1.png",
              "strips-collection-element-4.png",
              "strips-collection-element-3.png"
            ]
          },
          {
            "id": "product-3",
            "title": "Digestive support & gut balance",
            "price": 99.99,
            "productLink": "/strips/daily-gut-support",
            "cardBgColor": "#fef2f6",
            "productImage": "Digestive-support-gut-balance.png",
            "ingredients": [
              "strips-collection-element-1.png",
              "strips-collection-element-2.png",
              "strips-collection-element-1.png",
              "strips-collection-element-2.png"
            ]
          }
        ]
    }      
