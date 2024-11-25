import Heading1 from "../../../global/heading1";
import Paragraph from "../../../global/paragraph";
import Link from "next/link";
import JoinDrawer from "./JoinDrawer";
import Image from "next/image";
import heroimage from "/public/illustration/video-conference_screen.png";

const Hero = () => {
  return (
    <>
      <div className="relative w-full px-5 md:px-16 flex-1">
        <div className="max-w-5xl mx-auto _hero_wrapper flex flex-col gap-y-16">
          <div className="max-w-3xl mx-auto flex flex-col gap-y-6 justify-center items-center mt-16">
            <Heading1 className="text-center font-extrabold">
              Learn on Open Campus and Earn Rewards
            </Heading1>
            <div className="max-w-md">
              <Paragraph className="text-center text-slate-400 text-lg">
                Your number one Web3 Alternative to Google Meet and Twitter
                Space
              </Paragraph>
              <div className="flex flex-row flex-wrap justify-center items-center gap-3 mt-8 text-sm">
                <Link href="/dashboard">
                  <button
                    className={`px-4 py-2 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all}`}
                  >
                    <span className="text-sm">Create Classroom</span>
                  </button>
                </Link>
                <JoinDrawer />
              </div>
            </div>
          </div>
          <div className="relative flex justify-center w-full">
            <Image
              src={heroimage}
              className="w-full max-w-[800px] object-contain h-auto"
              alt="pody video conferencing"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
