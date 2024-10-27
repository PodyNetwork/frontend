import React from "react";

const PodyFeatures = () => {
  return (
    <section className="w-full relative">
      <div className="px-3 md:px-10 flex flex-col max-w-7xl mx-auto pt-24 pb-16">
        <div className="flex flex-col items-center mb-6">
          <div className="max-w-xl text-center flex flex-col gap-y-2.5">
            <h2 className="text-4xl font-semibold text-pody-secondary">
              Pody&apos;s Unique Features
            </h2>
            <p className="text-base mt-1.5">
              Discover the powerful features that make our platform stand out
            </p>
          </div>
        </div>
        <div className="w-full mt-6">
          <div className="__feature_wrapper __pd_main_veil rounded-t-3xl relative text-slate-100 p-6">
            <div className="relative z-50 flex flex-col min-h-[340px]">
              <div className="relative">
                <div className="flex flex-col items-start relative max-w-md">
                  <div className="pt-1">
                    <h3 className="text-2xl font-medium">
                      Advanced Host Management
                    </h3>
                    <div className="text-base flex flex-col mt-1.5 text-slate-300">
                      <p>
                        You can remove students from the call or grant them
                        speaking privileges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center relative">
            <div className="w-full sm:w-1/2 __feature_wrapper_card_1 __pd_main_veil relative sm:rounded-bl-3xl text-slate-100 p-6">
              <div className="relative z-50 flex flex-col min-h-[340px]">
                <div className="relative mt-auto">
                  <div className="flex flex-col items-start relative max-w-md">
                    <div className="pt-1">
                      <h3 className="text-2xl font-medium">Earn Rewards</h3>
                      <div className="text-base flex flex-col mt-1.5 text-slate-300">
                        <p>
                          The longer you participate in a classroom, the more
                          the points you earn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 __feature_wrapper_card_2 __pd_main_veil relative rounded-b-3xl sm:rounded-b-none sm:rounded-br-3xl text-slate-100 p-6">
              <div className="relative z-50 flex flex-col min-h-[340px]">
                <div className="relative mt-auto">
                  <div className="flex flex-col items-start relative max-w-md">
                    <div className="pt-1">
                      <h3 className="text-2xl font-medium">
                        Earning Statistics
                      </h3>
                      <div className="text-base flex flex-col mt-1.5 text-slate-300">
                        <p>
                          Track your points in real-time, redeem them, and
                          seamlessly transfer them on-chain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodyFeatures;
