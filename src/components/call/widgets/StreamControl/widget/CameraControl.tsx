import { Track } from "livekit-client";
import { SourceToggle } from "@/components/call/livekitcustom/SourceToggle";
import { CustomMediaDeviceMenu } from "@/components/call/livekitcustom/CustomMediaMenu";
import { useLocalParticipant, usePersistentUserChoices } from "@livekit/components-react";

interface CameraControlProps {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
  saveUserChoices?: boolean;
}

const CameraControl = ({ onDeviceError, saveUserChoices }: CameraControlProps) => {
  const { localParticipant } = useLocalParticipant();

  const { saveVideoInputEnabled, saveVideoInputDeviceId } = usePersistentUserChoices({
    preventSave: !saveUserChoices,
  });

  const cameraOnChange = (enabled: boolean, isUserInitiated: boolean) => {
    if (isUserInitiated) {
      saveVideoInputEnabled?.(enabled);
    }
  };

  const handleDeviceChange = (_kind: string, deviceId: string | undefined) => {
    saveVideoInputDeviceId?.(deviceId ?? "");
  };

  return (
    <div className="bg-white dark:bg-[#202124] p-1 flex-shrink-0 rounded-full flex justify-center items-center text-slate-400 cursor-pointer relative">
      <div className="bg-slate-100 dark:bg-pody-dark_secondary w-8 h-8 flex items-center justify-center rounded-full">
        <label className="sr-only">Toggle Camera</label>
        <SourceToggle
          source={Track.Source.Camera}
          showIcon={false}
          onChange={cameraOnChange}
          onDeviceError={(error) =>
            onDeviceError?.({ source: Track.Source.Camera, error })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${!localParticipant.isCameraEnabled ? "text-red-500" : ""}`}
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path
              d={
                localParticipant.isCameraEnabled
                  ? "M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z"
                  : "M851.54-294.62 710.77-435.39v75.85l-60-60v-288.15q0-5.39-3.46-8.85t-8.85-3.46H350.31l-60-60h348.15q30.31 0 51.31 21 21 21 21 51.31v183.08l140.77-140.77v370.76ZM798.92-73.7 61.39-811.23l42.15-42.15 737.53 737.53-42.15 42.15ZM502.23-568.08Zm-102.15 96.39ZM177.69-779.23 236.92-720h-53.84q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46h455.38q5.39 0 8.85-3.46t3.46-8.85v-53.84L710-246.92q-1.92 28-22.35 47.46Q667.23-180 638.46-180H183.08q-30.31 0-51.31-21-21-21-21-51.31v-455.38q0-28.77 19.46-49.19 19.46-20.43 47.46-22.35Z"
              }
            />
          </svg>
        </SourceToggle>
      </div>
      <div className="relative">
        <CustomMediaDeviceMenu kind="videoinput" onActiveDeviceChange={handleDeviceChange} />
      </div>
    </div>
  );
};

export default CameraControl;
