import React from "react";

const RewardContent = () => {
  return (
    <div className="relative max-w-xl">
      <h2 className="text-5xl md:text-6xl leading-[1.12] font-extrabold">
        <span className="text-pody-secondary">Reward</span> system for Student
        and Teacher
      </h2>
      <p className="text-base mt-10 text-slate-500 max-w-lg">
        Students earn points based on their total time spent in a meeting. The
        longer you stay and engage, the more points you accumulate.
        Additionally, hosts receive a 10% bonus of the points accumulated by
        their students.
      </p>
    </div>
  );
};

export default RewardContent;
