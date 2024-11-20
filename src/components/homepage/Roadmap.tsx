import React from "react";
import RoadmapHeader from "./widgets/roadmapHeader";
import RoadmapTrack from "./widgets/roadmapTrack";

const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="relative text-slate-600 py-32 px-5 md:px-6 flex flex-col justify-center"
      aria-label="roadmapo"
    >
      <div>
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
          <RoadmapHeader />
          <RoadmapTrack />
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
