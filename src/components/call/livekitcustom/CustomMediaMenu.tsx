import { computeMenuPosition, wasClickOutside } from "@livekit/components-core";
import * as React from "react";
import { log } from "@livekit/components-core";
import type { LocalAudioTrack, LocalVideoTrack } from "livekit-client";
import { CustomMediaDeviceSelect } from "./CustomMediaDeviceSelect";

/** @public */
export interface MediaDeviceMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: MediaDeviceKind;
  initialSelection?: string;
  onActiveDeviceChange?: (kind: MediaDeviceKind, deviceId: string) => void;
  tracks?: Partial<
    Record<MediaDeviceKind, LocalAudioTrack | LocalVideoTrack | undefined>
  >;
  requestPermissions?: boolean;
}

export function CustomMediaDeviceMenu({
  kind,
  initialSelection,
  onActiveDeviceChange,
  tracks,
  requestPermissions = false,
  ...props
}: MediaDeviceMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [updateRequired, setUpdateRequired] = React.useState<boolean>(true);
  const [needPermissions, setNeedPermissions] =
    React.useState(requestPermissions);

  const handleActiveDeviceChange = (
    kind: MediaDeviceKind,
    deviceId: string
  ) => {
    log.debug("handle device change");
    setIsOpen(false);
    onActiveDeviceChange?.(kind, deviceId);
  };

  const button = React.useRef<HTMLButtonElement>(null);
  const tooltip = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (isOpen) {
      setNeedPermissions(true);
    }
  }, [isOpen]);

  React.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      computeMenuPosition(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && wasClickOutside(tooltip.current, event)) {
        setIsOpen(false);
      }
    },
    [isOpen, tooltip, button]
  );

  React.useEffect(() => {
    document.addEventListener<"click">("click", handleClickOutside);
    window.addEventListener<"resize">("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener<"click">("click", handleClickOutside);
      window.removeEventListener<"resize">("resize", () =>
        setUpdateRequired(true)
      );
    };
  }, [handleClickOutside, setUpdateRequired]);

  return (
    <>
      <button
        className="lk-utton-menu"
        aria-pressed={isOpen}
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        ref={button}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
        </svg>
      </button>
      {!props.disabled && (
        <div
          className="lk-device-menu"
          ref={tooltip}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
          {kind ? (
            <CustomMediaDeviceSelect
              initialSelection={initialSelection}
              onActiveDeviceChange={(deviceId) =>
                handleActiveDeviceChange(kind, deviceId)
              }
              onDeviceListChange={setDevices}
              kind={kind}
              track={tracks?.[kind]}
              requestPermissions={needPermissions}
            />
          ) : (
            <>
              <div>Audio inputs</div>
              <CustomMediaDeviceSelect
                kind="audioinput"
                onActiveDeviceChange={(deviceId) =>
                  handleActiveDeviceChange("audioinput", deviceId)
                }
                onDeviceListChange={setDevices}
                track={tracks?.audioinput}
                requestPermissions={needPermissions}
              />
              <div className="lk-device-menu-heading">Video inputs</div>
              <CustomMediaDeviceSelect
                kind="videoinput"
                onActiveDeviceChange={(deviceId) =>
                  handleActiveDeviceChange("videoinput", deviceId)
                }
                onDeviceListChange={setDevices}
                track={tracks?.videoinput}
                requestPermissions={needPermissions}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
