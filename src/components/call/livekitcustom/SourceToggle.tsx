import type { CaptureOptionsBySource, ToggleSource } from '@livekit/components-core';
import * as React from 'react';
import { useTrackToggle } from "@livekit/components-react";
import { TrackPublishOptions } from 'livekit-client';

/* eslint-disable @typescript-eslint/no-unused-vars */

/** @public */
export interface TrackToggleProps<T extends ToggleSource>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  source: T;
  showIcon?: boolean;
  initialState?: boolean;
  onChange?: (enabled: boolean, isUserInitiated: boolean) => void;
  captureOptions?: CaptureOptionsBySource<T>;
  publishOptions?: TrackPublishOptions;
  onDeviceError?: (error: Error) => void;
}


export const SourceToggle: <T extends ToggleSource>(
  props: TrackToggleProps<T> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactNode = /* @__PURE__ */ React.forwardRef(function TrackToggle<
  T extends ToggleSource,
>({ showIcon, ...props }: TrackToggleProps<T>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { buttonProps, enabled } = useTrackToggle(props);
  return (
    <button ref={ref} {...buttonProps} className='px-0'>
      {props.children}
    </button>
  );
});
