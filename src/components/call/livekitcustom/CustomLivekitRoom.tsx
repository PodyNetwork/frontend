import { LiveKitRoomProps, LKFeatureContext, RoomContext, useLiveKitRoom } from '@livekit/components-react';
  import * as React from 'react';
import { useEffect, useState } from 'react';
import CallEndPage from '../widgets/Callend';

export const CustomLiveKitRoom: (
    props: React.PropsWithChildren<LiveKitRoomProps> & React.RefAttributes<HTMLDivElement>,
  ) => React.ReactNode = /* @__PURE__ */ React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<LiveKitRoomProps>
  >(function LiveKitRoom(props: React.PropsWithChildren<LiveKitRoomProps>, ref) {
    const { room, htmlProps } = useLiveKitRoom(props);
    const [isDisconnect, setIsDisconnected] = useState<boolean>(false)

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    useEffect(()=> {
        room?.on('disconnected', () => {
            console.log('room is now disconnected')
            setIsDisconnected(true)
        })
        
    }, [room])


    if(isDisconnect) {
        return <CallEndPage/>
    }

    return (
      <div ref={ref} {...htmlProps}>
        {room && (
          <RoomContext.Provider value={room}>
            <LKFeatureContext.Provider value={props.featureFlags}>
              {props.children}
            </LKFeatureContext.Provider>
          </RoomContext.Provider>
        )}
      </div>
    );
  });
  