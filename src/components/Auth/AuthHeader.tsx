import React from "react";

const AuthHeader = () => {
  return (
    <div className="pb-12">
      <h2 className="font-bold text-slate-800 text-4xl">
        Get rewarded for your time
      </h2>
      <p className="text-xs mt-2.5 text-slate-400 leading-relaxed">
        <span className="text-red-400">*</span>It took you 7 seconds to read all
        this, you could have earned up to 30 points.
      </p>
    </div>
  );
};

export default AuthHeader;
