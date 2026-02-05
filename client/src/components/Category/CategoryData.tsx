export const stripsProductData = 
    {
        "collection": {
            "tagline": "Plant-powered strips, just how you like it.",
            "title": "What’s your pick?",
            "productImage": "/strips-collection-banner-images.png",
            floatingElements: [
              { 
                  id: 1, 
                  src: '/strips-collection-element-1.png', 
                  alt: 'Cookie 1', 
                  position: { top: '8%', left: '20%' },
                  delay: 0.1,
                  rotate: -15,
              },
              { 
                  id: 2, 
                  src: '/strips-collection-element-2.png', 
                  alt: 'Cookie 2', 
                  position: { top: '10%', right: '2%' },
                  delay: 0.3,
                  rotate: 20,
                  blur: false
              },
              { 
                  id: 3, 
                  src: '/strips-collection-element-3.png', 
                  alt: 'Strawberry 1', 
                  position: { top: '34%', right: '27%' },
                  delay: 0.2,
                  rotate: 10
              },
              { 
                  id: 4, 
                  src: '/strips-collection-element-4.png', 
                  alt: 'Strawberry 2', 
                  position: { top: '60%', left: '4%' },
                  delay: 0.4,
                  rotate: -10,
                  blur: false 
              },
              { 
                  id: 5, 
                  src: '/strips-collection-element-5.png', 
                  alt: 'Strawberry 2', 
                  position: { top: '60%', right: '10%' },
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
              "ginseng.png",
              "ashwagandha.png",
              "maca.png",
              "rhodiola.png"
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
              "ginger.png",
              "peppermint.png",
              "fennel.png",
              "turmeric.png"
            ]
          }
        ]
    }      
