import React from 'react'
import CollectionBanner from './CollectionBanner';
import { stripsProductData } from './CategoryData';
import SvgLayout from '../strips/SvgLayout';
import ProductGrid from './ProductGrid';

function StripCategoryListing() {
  return (
    <>
      <SvgLayout />
      <CollectionBanner data={stripsProductData.collection} />
      {/* <ProductGrid /> */}
      <ProductGrid 
        collectionName="Strips" 
        title={<>Discover <span className='text-gold'>Strips</span></>}
      />
    </>
  )
}

export default StripCategoryListing 