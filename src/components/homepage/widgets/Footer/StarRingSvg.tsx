import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const StarRingSvg = () => {
  const starRef = useRef(null);

  useEffect(() => {
    const star = starRef.current;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 15, ease: "power1.inOut" },
    });

    tl.to(star, {
      rotation: 360,
      transformOrigin: "center",
    });

    tl.to(
      "#orange-to-pink stop:nth-child(1)",
      { stopColor: "#F25F5C", duration: 2 },
      0
    )
      .to(
        "#orange-to-pink stop:nth-child(2)",
        { stopColor: "#0D1B2A", duration: 2 },
        0
      )
      .to(
        "#orange-to-pink stop:nth-child(3)",
        { stopColor: "#E4FDE1", duration: 2 },
        0
      );
  }, []);
  return (
    <div className="absolute bottom-0 right-0 xs:-bottom-4 xs:-right-4 md:-right-16 md:-bottom-16 z-10">
      <svg
        ref={starRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-32 h-32 xs:w-56 xs:h-56 md:w-80 md:h-80"
      >
        <defs>
          <linearGradient
            id="orange-to-pink"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="orange" />
            <stop offset="50%" stopColor="#3F3B60" />
            <stop offset="100%" stopColor="#dbd1fb" />
          </linearGradient>
        </defs>
        <path
          className="star-path"
          d="M23 11h-8.59l6.07-6.07-1.41-1.41L13 9.59V1h-2v8.59L4.93 3.52 3.52 4.93 9.59 11H1v2h8.59l-6.07 6.07 1.41 1.41L11 14.41V23h2v-8.59l6.07 6.07 1.41-1.41L14.41 13H23z"
          fill="url(#orange-to-pink)"
        ></path>
      </svg>
    </div>
  );
};

export default StarRingSvg;
