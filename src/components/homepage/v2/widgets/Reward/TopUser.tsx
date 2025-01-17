import { AvatarParticipant } from '@/components/Avatar/AvatarParticipant';
import React from 'react'

interface Profile {
  username: string
}

const TopUser = ({ data, index }: { data: Profile, index: number }) => {
    return (
      <div className="relative w-10 h-10" style={{ zIndex: 30 - index * 10 }}>
        <AvatarParticipant name={data.username} />
      </div>
    );
  };
  

export default TopUser