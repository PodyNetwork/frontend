import * as React from 'react';
import { useEnsureParticipant } from '@livekit/components-react';
import { UseParticipantInfoOptions } from '@livekit/components-react';

/** @public */
export interface ParticipantNameProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    UseParticipantInfoOptions {}
    
export const CustomParticipantName: (
  props: ParticipantNameProps & React.RefAttributes<HTMLSpanElement>,
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLSpanElement, ParticipantNameProps>(
  function ParticipantName({ participant, ...props }: ParticipantNameProps, ref) {
    const p = useEnsureParticipant(participant);

    return (
      <span ref={ref} className='truncate text-[10px]'>
        {p.name !== '' ? p.name : p.identity}
        {props.children}
      </span>
    );
  },
);
