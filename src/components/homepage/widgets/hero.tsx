import Heading1 from "../../global/heading1";
import Paragraph from "../../global/paragraph";
import ButtonPody from "../../global/button";
import herocard from "../data/herocard.json";
import Link from "next/link";
import JoinDrawer from "./JoinDrawer";

const Hero = () => {
  return (
    <>
      <div className="relative w-full px-8 md:px-16">
        <div className="max-w-5xl mx-auto _hero_wrapper flex flex-col">
          <div className="max-w-3xl mx-auto flex flex-col gap-y-6 justify-center items-center">
            <Heading1 className="text-center font-extrabold">
              Learn on Open Campus and Earn Rewards
            </Heading1>
            <div className="max-w-md">
              <Paragraph className="text-center text-slate-400">
                Your number one Web3 Alternative to Google Meet and Twitter Space
              </Paragraph>
              <div className="flex flex-row flex-wrap justify-center items-center gap-3 mt-4 text-sm">
                <Link href="/dashboard">
                  <ButtonPody>
                    <span className="text-sm">Create Classroom</span>
                  </ButtonPody>
                </Link>
                <JoinDrawer />
              </div>
            </div>
          </div>
          <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 flex-1 justify-between py-32">
            {herocard.map((data, index) => (
              <div className="w-11/12" key={index}>
                <div className="flex flex-row gap-x-3 items-center">
                  <div className="w-9 h-9 rounded-md _grad_bg text-pody-primary flex items-center justify-center">
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

export default Hero;
