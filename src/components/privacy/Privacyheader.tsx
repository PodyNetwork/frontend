import React from "react";
import Nav from "../homepage/widgets/nav";

const Privacyheader = () => {
  return (
    <section className="w-full relative" aria-labelledby="hero">
      <div className="bg-pody-dark relative">
        <div className="z-50 relative flex flex-col">
          <Nav />
          <div className="relative w-full px-5 md:px-16 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-2xl flex flex-col gap-y-3 my-20">
                <div className="text-2xl xs:text-3xl md:text-4xl font-bold text-slate-200">
                  <h1>Privacy Policy for Pody Network</h1>
                </div>
                <div className="text-base text-slate-400">
                  <p>Effective Date: October 1, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacyheader;
