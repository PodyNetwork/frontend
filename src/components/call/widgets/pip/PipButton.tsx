"use client"
import { usePipContext } from "./MscAnyPipContext";

const PipControls = () => {
  const { isPipActive, activatePip, deactivatePip } = usePipContext();

  return (
    <div>
      {isPipActive ? (
        <button onClick={deactivatePip}>Deactivate PiP</button>
      ) : (
        <button onClick={activatePip}>Activate PiP</button>
      )}
    </div>
  );
};

export default PipControls;

