import React, { useEffect, useState } from 'react'
import CollectionBanner from './CollectionBanner';
import { stripsProductData } from './CategoryData';
import ProductGrid from './ProductGrid';
import { shopifyService } from '@/lib/shopify';

function SupplementCategoryListing() {
  const [collectionData, setCollectionData] = useState<any>({
    ...stripsProductData.collection,
    tagline: "Plant-powered supplements, just how you like it.",
    title: "What’s your pick?",
    floatingElements: []
  });
  const [heading, setHeading] = useState<React.ReactNode>(<>Discover <span className='text-gold'>Supplements</span></>);

  useEffect(() => {
    const fetchSupplementCollection = async () => {
      try {
        const collection = await shopifyService.fetchCollectionByHandle('herbal-supplements');
        if (collection && collection.banner) {
          const banner = collection.banner;
          
          // Map dynamic data while preserving the structure needed by CollectionBanner
          const mappedData = {
            ...stripsProductData.collection,
            tagline: banner.title || "Plant-powered supplements, just how you like it.",
            title: banner.subtitle || "What’s your pick?",
            productImages: banner.card_image && banner.card_image.length > 0 
              ? banner.card_image.slice(0, 3) 
              : stripsProductData.collection.productImages,
            // Map floating elements: Use dynamic images if available, otherwise empty for supplements
            floatingElements: banner.elements && banner.elements.length > 0
              ? banner.elements.map((img: string, idx: number) => {
                  const staticElement = stripsProductData.collection.floatingElements[idx] || stripsProductData.collection.floatingElements[0];
                  return {
                    ...staticElement,
                    id: idx + 1,
                    src: img
                  };
                })
              : []
          };

          setCollectionData(mappedData);
          
          if (banner.heading) {
            // Check if heading has "Supplements" to apply gold color
            if (banner.heading.toLowerCase().includes('supplements')) {
              const parts = banner.heading.split(/supplements/i);
              setHeading(
                <>
                  {parts[0]}
                  <span className='text-gold'>Supplements</span>
                  {parts[1]}
                </>
              );
            } else {
              setHeading(banner.heading);
            }
          }
        }
      } catch (error) {
        console.error('Error loading supplement collection:', error);
      }
    };

    fetchSupplementCollection();
  }, []);

  return (
    <>
      <CollectionBanner data={collectionData} />
      <ProductGrid 
        collectionName="Herbal Capsules" 
        title={heading}
      />
    </>
  )
}

export default SupplementCategoryListing
