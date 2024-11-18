import * as React from "react";
import { useRoomContext } from "@livekit/components-react";
import { useStartAudio } from "@livekit/components-react";
import Image from "next/image";
import { useEffect } from "react";

/** @public */
export interface AllowAudioPlaybackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const CustomStartAudio: (
  props: AllowAudioPlaybackProps & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<
  HTMLButtonElement,
  AllowAudioPlaybackProps
>(function StartAudio(
  { label = "Allow Audio", ...props }: AllowAudioPlaybackProps,
  ref
) {
  const room = useRoomContext();
  const { mergedProps, canPlayAudio } = useStartAudio({ room, props });

  const [clicked, setClicked] = React.useState(false);

  useEffect(() => {
    if (!clicked && !canPlayAudio && mergedProps.onClick) {
      mergedProps.onClick();
    }
  }, [clicked, canPlayAudio, mergedProps]);

  if (canPlayAudio) {
    return null;
  }

  return (
    <div className="darK:bg-black/50 bg-black/40 fixed top-0 left-0 w-full h-screen max-h-screen flex flex-col z-50 items-center justify-center overflow-y-auto">
      <div className="w-full p-4">
        <div className="max-w-xl mx-auto flex flex-col text-center items-center justify-center gap-y-4 my-12 bg-white dark:bg-pody-oxfordblue p-9 rounded-xl text-slate-700 dark:text-slate-400">
          <Image
            src="/illustration/woman-listening-online.png"
            className="w-[320px] object-contain mx-auto"
            width={1500}
            height={536}
            alt="pody audio playback illustration"
          />
          <h3 className="text-2xl font-medium">
            Do you want to hear what is being discussed in the Classroom?
          </h3>
          <p className="text-sm">
            You can still turn off your Audio Playback anytime in the settings.
          </p>
          <div>
            <button className="px-4 py-3 bg-pody-dark dark:bg-slate-700 text-slate-300 text-sm rounded-full">
              Allow Audio Playback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
