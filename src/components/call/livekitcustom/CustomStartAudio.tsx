import * as React from 'react';
import { useRoomContext } from '@livekit/components-react';
import { useStartAudio } from '@livekit/components-react';

/** @public */
export interface AllowAudioPlaybackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}


export const CustomStartAudio: (
  props: AllowAudioPlaybackProps & React.RefAttributes<HTMLButtonElement>,
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLButtonElement, AllowAudioPlaybackProps>(
  function StartAudio({ label = 'Allow Audio', ...props }: AllowAudioPlaybackProps, ref) {
    const room = useRoomContext();
    const { mergedProps } = useStartAudio({ room, props });

    return (
      <button ref={ref} {...mergedProps}>
        {label}
      </button>
    );
  },
);
