import React from 'react'
import CollectionBanner from './CollectionBanner';
import { stripsProductData } from './CategoryData';
import ProductGrid from './ProductGrid';

function SupplementCategoryListing() {
  const supplementCollectionData = {
    ...stripsProductData.collection,
    tagline: "Plant-powered supplements, just how you like it.",
    title: "What’s your pick?",
    floatingElements: []
  };

  return (
    <>
      <CollectionBanner data={supplementCollectionData} />
      <ProductGrid 
        collectionName="Herbal Capsules" 
        title={<>Discover <span className='text-gold'>Supplements</span></>}
      />
    </>
  )
}

export default SupplementCategoryListing