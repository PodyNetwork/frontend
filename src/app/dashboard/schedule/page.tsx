import Schedule from '@/components/dashboard/widgets/schedule'
import ScheduleStatistics from '@/components/dashboard/widgets/scheduleStatistics'
import React from 'react'

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-12">
        <ScheduleStatistics />
      </div>
      <div className="p-12">
        <div className="relative max-w-3xl mx-auto">
            <Schedule />
        </div>
      </div>
    </main>
  )
}

export default page