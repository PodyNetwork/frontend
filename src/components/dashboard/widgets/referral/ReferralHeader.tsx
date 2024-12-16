import React from "react";

const ReferralHeader = () => {
  return (
    <section className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
      <div className="bg-pody-primary rounded-2xl w-full __img_reward_grab">
        <div className="__img_veil_grab p-10">
          <h2 className="text-[2.3rem] leading-tight font-semibold text-white">
            $10,000 Reward <br /> Up for Grab
          </h2>
          <p className="text-sm mt-6 max-w-lg text-slate-100">
            Pody is offering a one-of-a-kind Referral Reward! 10,000 USD will be
            distributed among the top three referrers in the equivalent of
            PodyToken at the time of Token launch. Don’t miss this opportunity
            to earn big while sharing Pody with others.
          </p>
          <div className="mt-6 flex flex-row items-center text-slate-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 me-1"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M450-290h60v-230h-60v230Zm30-298.46q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm.07 488.46q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <p className="text-xs">Terms and Conditions Apply</p>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ReferralHeader;
