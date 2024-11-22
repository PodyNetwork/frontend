import React from "react";
import Image from "next/image";
import user from "/public/avatar/user1.webp";
import user2 from "/public/avatar/user2.webp";
import user3 from "/public/avatar/user3.jpeg";

const RewardSystem = () => {
  return (
    <section className="w-full relative" id="reward">
      <div className="flex flex-col max-w-7xl mx-auto px-5 md:px-6 pt-16 pb-32">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-1/2 flex flex-col">
            <div className="relative max-w-xl">
              <h2 className="text-5xl md:text-6xl leading-[1.12] font-extrabold">
                <span className="text-pody-secondary">Reward</span> system for
                Student and Teacher
              </h2>
              <p className="text-base mt-10 text-slate-500 max-w-lg">
                Students earn points based on their total time spent in a
                meeting. The longer you stay and engage, the more points you
                accumulate. Additionally, hosts receive a 10% bonus of the
                points accumulated by their students.
              </p>
            </div>
            <div className="relative flex flex-row gap-x-4 items-center mt-auto">
              <div>
                <h2 className="text-3xl font-bold">4.5M</h2>
                <p className="text-sm font-medium mt-1">
                  Total Points <br /> accumulated
                </p>
              </div>
              <div className="flex flex-row items-center bg-slate-100 rounded-full p-1.5">
                <div className="flex flex-row items-center -space-x-4 __img_participant_rwd">
                  <Image
                    src={user}
                    width={483}
                    height={516}
                    className="z-30"
                    alt="pody users avatar"
                  />
                  <Image
                    src={user2}
                    width={483}
                    height={516}
                    className="z-20"
                    alt="pody users avatar"
                  />
                  <Image
                    src={user3}
                    width={483}
                    height={516}
                    alt="pody users avatar"
                  />
                </div>
                <button className="w-10 h-10 ms-3 bg-slate-300 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 m-auto"
                    fill="rgba(0, 0, 0, 1)"
                    viewBox="0 0 24 24"
                  >
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-full">
              <Image src="/abstract/rewardsystem.png" width={400} height={400} alt="reward system image" className="w-10/12 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardSystem;
