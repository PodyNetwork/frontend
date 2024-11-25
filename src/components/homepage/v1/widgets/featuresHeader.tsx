import React from 'react'
import Heading2 from '../../../global/heading2'
import Paragraph from '../../../global/paragraph'

const FeaturesHeader = () => {
  return (
    <div className='text-center flex flex-col gap-y-4 mb-12'>
        <Heading2 className="font-bold">Pody&apos;s Unique Features</Heading2>
        <Paragraph className="text-slate-400">Discover the powerful features that make our platform stand out</Paragraph>
    </div>
  )
}

export default FeaturesHeader