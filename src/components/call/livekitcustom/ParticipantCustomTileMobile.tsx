// Import statements remain unchanged
import * as React from "react";
import { Participant } from "livekit-client";
import { Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import type {
  ParticipantClickEvent,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-core";
import {
  isTrackReference,
  isTrackReferencePinned,
} from "@livekit/components-core";

import {
  ParticipantContext,
  TrackRefContext,
  useEnsureParticipant,
  useEnsureTrackRef,
  useFeatureContext,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeTrackRefContext,
} from "@livekit/components-react";
import { LockLockedIcon } from "@livekit/components-react";
import { VideoTrack, AudioTrack } from "@livekit/components-react";
import { useParticipantTile, useIsEncrypted } from "@livekit/components-react";
import { CustomParticipantName } from "./CustomParticipantName";
import PlaceHolder from "../widgets/Participants/PlaceHolder";
import { AvatarParticipant } from "../../Avatar/AvatarParticipant";

export function ParticipantContextIfNeeded(
  props: React.PropsWithChildren<{
    participant?: Participant;
  }>
) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? (
    <ParticipantContext.Provider value={props.participant}>
      {props.children}
    </ParticipantContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

export function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>
      {props.children}
    </TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

export interface ParticipantTileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  trackRef?: TrackReferenceOrPlaceholder;
  disableSpeakingIndicator?: boolean;
  onParticipantClick?: (event: ParticipantClickEvent) => void;
  onFocusToggle: () => void;
  isFocused: boolean;
}

export const ParticipantCustomTileMobile: React.FC<ParticipantTileProps> =
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, ParticipantTileProps>(
    function ParticipantTile(
      {
        trackRef,
        children,
        onParticipantClick,
        disableSpeakingIndicator,
        onFocusToggle,
        isFocused,
        ...htmlProps
      }: ParticipantTileProps,
      ref
    ) {
      const trackReference = useEnsureTrackRef(trackRef);
      const { elementProps } = useParticipantTile<HTMLDivElement>({
        htmlProps,
        disableSpeakingIndicator,
        onParticipantClick,
        trackRef: trackReference,
      });

      const [isPortrait, setIsPortrait] = useState(false);
      const videoRef = useRef<HTMLVideoElement>(null);
      const isEncrypted = useIsEncrypted(trackReference.participant);
      const layoutContext = useMaybeLayoutContext();
      const autoManageSubscription = useFeatureContext()?.autoSubscription;

      const handleSubscribe = React.useCallback(
        (subscribed: boolean) => {
          if (
            trackReference.source &&
            !subscribed &&
            layoutContext &&
            layoutContext.pin.dispatch &&
            isTrackReferencePinned(trackReference, layoutContext.pin.state)
          ) {
            layoutContext.pin.dispatch({ msg: "clear_pin" });
          }
        },
        [trackReference, layoutContext]
      );

      const participant = useEnsureParticipant(trackReference.participant);

      const isCameraOff =
        trackReference?.source === Track.Source.Camera &&
        (!trackReference?.publication?.isSubscribed ||
          trackReference.publication?.isMuted);

      // Effect to determine video orientation and size
      useEffect(() => {
        const updateOrientation = () => {
          if (videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            setIsPortrait(videoHeight > videoWidth);
          }
        };

        const observeChanges = () => {
          if (videoRef.current) {
            const mutationObserver = new MutationObserver(() => {
              updateOrientation();
            });

            mutationObserver.observe(videoRef.current, {
              attributes: true,
              childList: true,
              subtree: true,
            });

            const resizeObserver = new ResizeObserver(() => {
              updateOrientation(); // Update orientation on size change
            });

            resizeObserver.observe(videoRef.current); // Track size changes

            return () => {
              mutationObserver.disconnect();
              resizeObserver.disconnect();
            };
          }
        };

        const currentVideoRef = videoRef.current;

        if (currentVideoRef) {
          currentVideoRef.addEventListener("playing", updateOrientation);
          currentVideoRef.addEventListener("loadeddata", updateOrientation);
          updateOrientation(); // Initial check

          observeChanges();

          const handleResize = () => {
            updateOrientation();
          };

          window.addEventListener("resize", handleResize);

          return () => {
            currentVideoRef.removeEventListener("playing", updateOrientation);
            currentVideoRef.removeEventListener(
              "loadeddata",
              updateOrientation
            );
            window.removeEventListener("resize", handleResize);
          };
        }
      }, [videoRef, trackReference]);

      return (
        <div ref={ref} style={{ position: "relative" }} {...elementProps}>
          <TrackRefContextIfNeeded trackRef={trackReference}>
            <ParticipantContextIfNeeded participant={participant}>
              {children ?? (
                <>
                  {isCameraOff ? (
                    <div className="camera-off-placeholder relative">
                      <PlaceHolder
                        participant={participant}
                        name={participant.identity}
                      />
                      <div className="lk-participant-metadata">
                        <div className="glass-effect flex flex-row items-center gap-x-1 text-xs truncate">
                          <div className="w-2.5 h-2.5 md:w-4 md:h-4">
                            <AvatarParticipant name={participant.identity} />
                          </div>
                          <CustomParticipantName />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isTrackReference(trackReference) &&
                      (trackReference.publication?.kind === "video" ||
                        trackReference.source === Track.Source.Camera ||
                        trackReference.source === Track.Source.ScreenShare) ? (
                        <VideoTrack
                          ref={videoRef} // Assign the ref to the VideoTrack
                          trackRef={trackReference}
                          onSubscriptionStatusChanged={handleSubscribe}
                          manageSubscription={autoManageSubscription}
                          style={{ width: "100%", height: "100%" }}
                          className={
                            isPortrait ? "pd_portrait_vid" : "pd_landscape_vid"
                          }
                        />
                      ) : (
                        isTrackReference(trackReference) && (
                          <AudioTrack
                            trackRef={trackReference}
                            onSubscriptionStatusChanged={handleSubscribe}
                          />
                        )
                      )}
                      <div className="lk-participant-metadata">
                        <div>
                          {trackReference.source === Track.Source.Camera ? (
                            <>
                              {isEncrypted && (
                                <LockLockedIcon
                                  style={{ marginRight: "0.25rem" }}
                                />
                              )}
                              <div className="glass-effect flex flex-row items-center gap-x-1 text-xs">
                                <div className="w-3 h-3 md:w-4 md:h-4">
                                  <AvatarParticipant
                                    name={participant.identity}
                                  />
                                </div>
                                <CustomParticipantName />
                              </div>
                            </>
                          ) : (
                            <div className="glass-effect flex flex-row items-center gap-x-1 text-xs">
                              <div className="w-3 h-3 md:w-4 md:h-4">
                                <AvatarParticipant
                                  name={participant.identity}
                                />
                              </div>
                              <CustomParticipantName>
                                &apos;s screen
                              </CustomParticipantName>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {/* Focus Toggle Button */}
              <button
                className="absolute top-[10px] cursor-pointer z-50 right-[10px] text-slate-500"
                onClick={onFocusToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  {isFocused ? (<path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/>) : (<path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>)}
                </svg>
              </button>
            </ParticipantContextIfNeeded>
          </TrackRefContextIfNeeded>
        </div>
      );
    }
  );
