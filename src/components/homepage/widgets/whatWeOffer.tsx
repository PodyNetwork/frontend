import Paragraph from "../../global/paragraph";
import herocard from "../data/herocard.json";

const WhatWeOffer = () => {
  return (
    <>
      <div className="relative w-full px-8 md:px-16">
        <div className="max-w-5xl mx-auto _hero_wrapper flex flex-col">
          <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 flex-1 justify-between py-28">
            {herocard.map((data, index) => (
              <div className="w-11/12" key={index}>
                <div className="flex flex-row gap-x-3 items-center">
                  <div className="w-9 h-9 rounded-md _grad_bg text-pody-secondary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 -960 960 960"
                      style={{ msFilter: "" }}
                      fill="currentColor"
                    >
                      <path d={data.svg}></path>
                    </svg>
                  </div>
                  <Paragraph>{data.title}</Paragraph>
                </div>
                <p className="text-sm mt-3 text-slate-400">{data.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;
