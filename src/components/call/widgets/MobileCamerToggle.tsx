import React from 'react';
import useFacingMode from '../livekitcustom/hook/UseFacingMode';

const CameraToggle = () => {
  const [facingMode, setFacingMode] = useFacingMode(); // hook to manage camera facing mode
  const isFront = facingMode === 'user'; // 'user' is typically the front camera, 'environment' is the back camera

  const toggleCamera = async () => {
    const newFacingMode = isFront ? 'environment' : 'user'; // toggle between front and back
    await setFacingMode(newFacingMode); // set the new facing mode
    console.log(`Switched to ${newFacingMode} camera`);
  };

  return (
    <div>
      <button onClick={toggleCamera}>
        Switch to {isFront ? 'Back' : 'Front'} Camera
      </button>
    </div>
  );
};

export default CameraToggle;
