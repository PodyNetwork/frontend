import * as React from 'react';
import { useMaybeRoomContext } from '@livekit/components-react';
import { RoomEvent, type LocalAudioTrack, type LocalVideoTrack } from 'livekit-client';
import { useMediaDeviceSelect } from '@livekit/components-react';

/* eslint-disable @typescript-eslint/no-unused-vars */

/** @public */
export interface MediaDeviceSelectProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onError'> {
  kind: MediaDeviceKind;
  onActiveDeviceChange?: (deviceId: string) => void;
  onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
  onDeviceSelectError?: (e: Error) => void;
  initialSelection?: string;
  /** will force the browser to only return the specified device
   * will call `onDeviceSelectError` with the error in case this fails
   */
  exactMatch?: boolean;
  track?: LocalAudioTrack | LocalVideoTrack;
  /**
   * this will call getUserMedia if the permissions are not yet given to enumerate the devices with device labels.
   * in some browsers multiple calls to getUserMedia result in multiple permission prompts.
   * It's generally advised only flip this to true, once a (preview) track has been acquired successfully with the
   * appropriate permissions.
   *
   * @see {@link MediaDeviceMenu}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices | MDN enumerateDevices}
   */
  requestPermissions?: boolean;
  onError?: (e: Error) => void;
}

/**
 * The `MediaDeviceSelect` list all media devices of one kind.
 * Clicking on one of the listed devices make it the active media device.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <MediaDeviceSelect kind='audioinput' />
 * </LiveKitRoom>
 * ```
 * @public
 */
export const CustomMediaDeviceSelect: (
  props: MediaDeviceSelectProps & React.RefAttributes<HTMLUListElement>,
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLUListElement, MediaDeviceSelectProps>(
  function MediaDeviceSelect(
    {
      kind,
      initialSelection,
      onActiveDeviceChange,
      onDeviceListChange,
      onDeviceSelectError,
      exactMatch,
      track,
      requestPermissions,
      onError,
      ...props
    }: MediaDeviceSelectProps,
    ref,
  ) {
    const room = useMaybeRoomContext();
    const handleError = React.useCallback(
      (e: Error) => {
        if (room) {
          // awkwardly emit the event from outside of the room, as we don't have other means to raise a MediaDeviceError
          room.emit(RoomEvent.MediaDevicesError, e);
        }
        onError?.(e);
      },
      [room, onError],
    );
    const { devices, activeDeviceId, setActiveMediaDevice, className } = useMediaDeviceSelect({
      kind,
      room,
      track,
      requestPermissions,
      onError: handleError,
    });
    React.useEffect(() => {
      if (initialSelection !== undefined) {
        setActiveMediaDevice(initialSelection);
      }
    }, [setActiveMediaDevice]);

    React.useEffect(() => {
      if (typeof onDeviceListChange === 'function') {
        onDeviceListChange(devices);
      }
    }, [onDeviceListChange, devices]);

    React.useEffect(() => {
      if (activeDeviceId && activeDeviceId !== '') {
        onActiveDeviceChange?.(activeDeviceId);
      }
    }, [activeDeviceId]);

    const handleActiveDeviceChange = async (deviceId: string) => {
      try {
        await setActiveMediaDevice(deviceId, { exact: exactMatch });
      } catch (e) {
        if (e instanceof Error) {
          onDeviceSelectError?.(e);
        } else {
          throw e;
        }
      }
    };

    function isActive(deviceId: string, activeDeviceId: string, index: number) {
      return deviceId === activeDeviceId || (index === 0 && activeDeviceId === 'default');
    }

    return (
      <ul ref={ref} className='bg-white __shadow_pody py-1 text-[0.8rem] rounded-sm'>
        {devices.map((device, index) => (
          <li
            key={device.deviceId}
            id={device.deviceId}
            data-lk-active={isActive(device.deviceId, activeDeviceId, index)}
            aria-selected={isActive(device.deviceId, activeDeviceId, index)}
            role="option"
            className={`hover:bg-slate-200 hover:text-slate-500 transition-all ${isActive(device.deviceId, activeDeviceId, index) ? 'text-blue-500' : ''}`} 
          >
            <button className="lk-button" onClick={() => handleActiveDeviceChange(device.deviceId)}>
              {device.label}
            </button>
          </li>
        ))}
      </ul>
    );
  },
);
