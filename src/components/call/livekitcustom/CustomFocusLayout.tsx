import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { ParticipantCustomTile } from './ParticipantCustomTile';
import type { ParticipantClickEvent } from '@livekit/components-core';


export interface FocusLayoutProps extends React.HTMLAttributes<HTMLElement> {
  trackRef?: TrackReferenceOrPlaceholder;
  onParticipantClick?: (evt: ParticipantClickEvent) => void;
}

export function CustomFocusLayout({ trackRef, ...htmlProps }: FocusLayoutProps) {
  return <ParticipantCustomTile trackRef={trackRef} {...htmlProps} />;
}