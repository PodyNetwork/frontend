"use client"; // Ensure this component works in client-side rendering
import Image from "next/image";
import schedulecall from "/public/illustration/schedule_call.png";

const ReadyToGo = () => {
  return (
    <>
      <div className="_grad_card_main"></div>
      <div className="relative z-50 h-full flex flex-col">
        <h3 className="text-xl font-medium text-slate-200">Schedule Call</h3>
        <p className="text-sm mt-2.5 text-slate-400 flex items-center flex-wrap gap-x-2 leading-relaxed">
          Not ready to start the class right away? You can schedule it for
          later.
        </p>
        <div className="relative mt-auto pt-16">
          <div className="h-60 md:h-36 bg-pody-dark ">
            <Image
              src={schedulecall}
              className="object-cover h-full rounded-xl"
              alt="Rewards for Participation"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadyToGo;
