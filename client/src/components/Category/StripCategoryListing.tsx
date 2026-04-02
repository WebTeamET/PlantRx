import React, { useEffect, useState } from 'react'
import CollectionBanner from './CollectionBanner';
import { stripsProductData } from './CategoryData';
import ProductGrid from './ProductGrid';
import { shopifyService } from '@/lib/shopify';

function StripCategoryListing() {
  const [collectionData, setCollectionData] = useState<any>(stripsProductData.collection);
  const [heading, setHeading] = useState<React.ReactNode>(<>Discover <span className='text-gold'>Strips</span></>);

  useEffect(() => {
    const fetchStripsCollection = async () => {
      try {
        const collection = await shopifyService.fetchCollectionByHandle('strips');
        if (collection && collection.banner) {
          const banner = collection.banner;
          
          // Map dynamic data while preserving the structure needed by CollectionBanner
          const mappedData = {
            ...stripsProductData.collection,
            tagline: banner.title,
            title: banner.subtitle,
            productImages: banner.card_image && banner.card_image.length > 0 
              ? banner.card_image 
              : stripsProductData.collection.productImages,
            // Map floating elements: Use dynamic images if available, otherwise fallback
            floatingElements: banner.elements && banner.elements.length > 0
              ? banner.elements.map((img: string, idx: number) => {
                  const staticElement = stripsProductData.collection.floatingElements[idx] || stripsProductData.collection.floatingElements[0];
                  return {
                    ...staticElement,
                    id: idx + 1,
                    src: img
                  };
                })
              : stripsProductData.collection.floatingElements
          };

          setCollectionData(mappedData);
          
          if (banner.heading) {
            // Check if heading has "Strips" to apply gold color
            if (banner.heading.toLowerCase().includes('strips')) {
              const parts = banner.heading.split(/strips/i);
              setHeading(
                <>
                  {parts[0]}
                  <span className='text-gold'>Strips</span>
                  {parts[1]}
                </>
              );
            } else {
              setHeading(banner.heading);
            }
          }
        }
      } catch (error) {
        console.error('Error loading strips collection:', error);
      }
    };

    fetchStripsCollection();
  }, []);

  return (
    <>
      <CollectionBanner data={collectionData} />
      <ProductGrid 
        collectionName="Strips" 
        title={heading}
      />
    </>
  )
}

export default StripCategoryListing