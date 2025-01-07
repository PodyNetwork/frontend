import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePiP } from './usePictureInPicture';
import { ParticipantCustomTile } from '../../livekitcustom/ParticipantCustomTile';
import { TrackReferenceOrPlaceholder } from '@livekit/components-react';

interface EnhancedPipGridProps {
  tracks: TrackReferenceOrPlaceholder[];
}

const EnhancedPiP = ({ tracks }: EnhancedPipGridProps) => {
  const { isPipActive, setIsPipActive } = usePiP();
  const containerRef = useRef<HTMLDivElement>(null);

  const keepInBounds = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Ensure PiP container stays in viewport
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    const newX = Math.max(0, Math.min(rect.left, maxX));
    const newY = Math.max(0, Math.min(rect.top, maxY));

    containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
  };

  useEffect(() => {
    if (!isPipActive) return;

    const handleResize = () => {
      keepInBounds();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isPipActive]);

  if (!isPipActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        drag
        dragMomentum={false}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        dragConstraints={{
          left: 0,
          top: 0,
          right: window.innerWidth - 200,
          bottom: window.innerHeight - 150,
        }}
        className="fixed z-50 cursor-move shadow-lg rounded-lg overflow-hidden bg-white"
        style={{ width: '300px' }}
      >
        <div className="relative">
          {tracks.map((track, index) => (
            <div key={index} className="aspect-[16/9]">
              <ParticipantCustomTile trackRef={track} />
            </div>
          ))}

          <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-70 p-2 flex justify-between items-center">
            <button
              onClick={() => setIsPipActive(false)}
              className="text-white hover:text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedPiP;
