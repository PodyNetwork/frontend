import React from 'react'
import Image from 'next/image'

const InactiveSchedule = () => {
  return (
    <div>
      <Image
        src="/illustration/calendarschedule.png"
        className="object-contain w-full"
        width={400}
        height={300}
        alt="scheduled call not available"
      />
      <div className="text-base mt-8 font-medium text-slate-700">
        Oops! There are no active scheduled classrooms right now. However, you
        can schedule a classroom for a global audience.
      </div>
    </div>
  )
}

export default InactiveSchedule