import { FastAverageColor } from "fast-average-color";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const PlaceHolder = () => {
  const imgRef = useRef<HTMLImageElement | null>(null); // Explicit type for imgRef
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs on the client

    const fac = new FastAverageColor();
    const img = imgRef.current;

    const extractColor = () => {
      if (img) {
        fac
          .getColorAsync(img)
          .then((color) => setBgColor(color.rgba))
          .catch((e) => console.error(e));
      }
    };

    if (img) {
      if (img.complete) {
        extractColor();
      } else {
        img.addEventListener("load", extractColor);
      }

      return () => {
        img.removeEventListener("load", extractColor);
        fac.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center" style={{ backgroundColor: bgColor }}>
      <div className="w-[20%] md:w-[12%]">
        <Image
          src="/avatar/user6.png"
          ref={imgRef}
          alt="user icon"
          width={200}
          height={200}
          className="w-full h-full aspect-square object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default PlaceHolder;
