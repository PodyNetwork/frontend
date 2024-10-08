import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { ParticipantCustomTile } from './ParticipantCustomTile';
import type { ParticipantClickEvent } from '@livekit/components-core';

/** @public */
/**
 * The `FocusLayoutContainer` is a layout component that expects two children:
 * A small side component: In a video conference, this is usually a carousel of participants
 * who are not in focus. And a larger main component to display the focused participant.
 * For example, with the `FocusLayout` component.
 *  @public
 */


/** @public */
export interface FocusLayoutProps extends React.HTMLAttributes<HTMLElement> {
  /** The track to display in the focus layout. */
  trackRef?: TrackReferenceOrPlaceholder;

  onParticipantClick?: (evt: ParticipantClickEvent) => void;
}

/**
 * The `FocusLayout` component is just a light wrapper around the `ParticipantTile` to display a single participant.
 * @public
 */
export function CustomFocusLayout({ trackRef, ...htmlProps }: FocusLayoutProps) {
  return <ParticipantCustomTile trackRef={trackRef} {...htmlProps} />;
}
