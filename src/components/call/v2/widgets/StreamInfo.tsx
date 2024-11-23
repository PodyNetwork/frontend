import { AvatarParticipant } from '@/components/Avatar/AvatarParticipant'
import React from 'react'

const StreamInfo = () => {
  return (
    <>
        <div className="flex items-center gap-x-2">
          <h3 className="font-medium text-base text-slate-200">
            Navigating the Path to success V2
          </h3>
          <div className="flex flex-row -space-x-2">
            <div className="w-5 h-5 border border-orange-400 rounded-full">
              <AvatarParticipant name="eax" />
            </div>
            <div className="w-5 h-5 border border-orange-400 rounded-full">
              <AvatarParticipant name="john" />
            </div>
            <div className="w-5 h-5 border border-orange-400 rounded-full">
              <AvatarParticipant name="orx" />
            </div>
            <div className="w-5 h-5 border border-orange-400 rounded-full">
              <AvatarParticipant name="paul briany" />
            </div>
          </div>
        </div>
        <div className="w-7 h-7">
          <AvatarParticipant name="eax" />
        </div>
    </>
  )
}

export default StreamInfo