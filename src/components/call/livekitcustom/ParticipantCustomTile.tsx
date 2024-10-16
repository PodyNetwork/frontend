import * as React from "react";
import { Participant } from "livekit-client";
import { Track } from "livekit-client";
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
}

export const ParticipantCustomTile: (
  props: ParticipantTileProps & React.RefAttributes<HTMLDivElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<
  HTMLDivElement,
  ParticipantTileProps
>(function ParticipantTile(
  {
    trackRef,
    children,
    onParticipantClick,
    disableSpeakingIndicator,
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

  return (
    <div ref={ref} style={{ position: "relative" }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          {children ?? (
            <>
              {/* Render placeholder if the camera is off */}
              {isCameraOff ? (
                <div className="camera-off-placeholder relative">
                  <PlaceHolder participant={participant} name={participant.identity} />
                  <div className="lk-participant-metadata">
                    <div className="glass-effect flex flex-row items-center gap-x-1 text-xs truncate">
                      <div className="w-2.5 h-2.5 md:w-6 md:h-6"><AvatarParticipant name={participant.identity} /></div>
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
                      trackRef={trackReference}
                      onSubscriptionStatusChanged={handleSubscribe}
                      manageSubscription={autoManageSubscription}
                      style={{ width: "100%", height: "100%" }}
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
                            <div className="w-3 h-3 md:w-6 md:h-6"><AvatarParticipant name={participant.identity} /></div>
                            <CustomParticipantName />
                          </div>
                        </>
                      ) : (
                        <div className="glass-effect flex flex-row items-center gap-x-1 text-xs">
                          <div className="w-3 h-3 md:w-6 md:h-6"><AvatarParticipant name={participant.identity} /></div>
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
        </ParticipantContextIfNeeded>
      </TrackRefContextIfNeeded>
    </div>
  );
});
