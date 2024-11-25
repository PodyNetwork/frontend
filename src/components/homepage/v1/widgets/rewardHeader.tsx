import React from 'react'
import Heading2 from '../../../global/heading2'
import Paragraph from '../../../global/paragraph'

const RewardHeader = () => {
  return (
    <div className='text-center flex flex-col gap-y-4 mb-12'>
        <Heading2 className="font-bold">Earn Reward with Pody</Heading2>
        <Paragraph className="text-slate-400">Overview of the Reward System</Paragraph>
    </div>
  )
}

export default RewardHeader