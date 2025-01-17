import HelpHeader from '@/components/Help/HelpHeader'
import ReferralTerms from '@/components/Help/ReferralTerms'
import Footer from '@/components/homepage/Global/Footer'
import React from 'react'

const ReferralRewardTerm = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <HelpHeader title='Referral Reward Terms and Conditions' publishedData='Learn and Earn Rewards in real-time' />
        <ReferralTerms />
        <Footer />
      </main>
    </>
  )
}

export default ReferralRewardTerm