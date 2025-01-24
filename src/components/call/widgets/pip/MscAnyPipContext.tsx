import { createContext, useContext, useRef, useEffect, useState, ReactNode } from "react";

import "../../../../../public/js/wsc-msc-any-pip";

interface MscAnyPipElement extends HTMLElement {
  requestPictureInPicture: () => void;
  exitPictureInPicture: () => void;
}

interface PipContextProps {
  isPipActive: boolean;
  activatePip: () => void;
  deactivatePip: () => void;
}

const PipContext = createContext<PipContextProps | undefined>(undefined);

export const MscAnyPipProvider = ({ children }: { children: ReactNode }) => {
  const pipRef = useRef<MscAnyPipElement | null>(null);
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    // Ensure the code only runs in the client-side
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const pipElement = pipRef.current;
      if (!pipElement) return;

      const handlePipingStart = () => setIsPipActive(true);
      const handlePipingEnd = () => setIsPipActive(false);

      pipElement.addEventListener("msc-any-pip-piping", handlePipingStart);
      pipElement.addEventListener("msc-any-pip-pip-end", handlePipingEnd);

      return () => {
        pipElement.removeEventListener("msc-any-pip-piping", handlePipingStart);
        pipElement.removeEventListener("msc-any-pip-pip-end", handlePipingEnd);
      };
    }
  }, []);  // Empty dependency array means it runs once after initial render

  const activatePip = () => {
    const pipElement = pipRef.current;
    if (pipElement) {
      pipElement.requestPictureInPicture();
    }
  };

  const deactivatePip = () => {
    const pipElement = pipRef.current;
    if (pipElement && document.pictureInPictureElement) {
      document.exitPictureInPicture().catch((error) => {
        console.error("Failed to exit Picture-in-Picture mode:", error);
      });
    }
  };

  const handly = () => {
    alert("hello§")
  }

  return (
    <PipContext.Provider value={{ isPipActive, activatePip, deactivatePip }}>
      <msc-any-pip winwidth="300" winheight="300" ref={pipRef}>
        <div className="element-i-like-to-have-pip">
          <p>Content for Picture-in-Picture mode. lore</p> 
          <button onClick={handly}>click me</button>
        </div>
      </msc-any-pip>
      {children}
    </PipContext.Provider>
  );
};

export const usePipContext = () => {
  const context = useContext(PipContext);
  if (!context) {
    throw new Error("usePipContext must be used within a MscAnyPipProvider");
  }
  return context;
};
