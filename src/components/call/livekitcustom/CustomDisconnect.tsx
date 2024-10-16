import { setupDisconnectButton } from '@livekit/components-core';
import { ConnectionState } from 'livekit-client';
import * as React from 'react';
import type { DisconnectButtonProps } from '@livekit/components-react';
import { useRoomContext } from '@livekit/components-react';
import { useConnectionState } from '@livekit/components-react';

export function useCustomDisconnectButton(props: DisconnectButtonProps) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);

  const buttonProps = React.useMemo(() => {
    const { disconnect } = setupDisconnectButton(room);

    return {
      ...props,  // Spread incoming props
      onClick: () => disconnect(props.stopTracks ?? true),  
      disabled: connectionState === ConnectionState.Disconnected,  
    };
  }, [room, props, connectionState]);

  return { buttonProps };
}
