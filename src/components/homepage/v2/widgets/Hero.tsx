import Link from "next/link";
import Nav from "../../widgets/nav";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full relative bg-pody-secondary/5 pb-10">
      <div className="flex flex-col max-w-7xl h-full mx-auto">
        <Nav />
        <div className="w-full py-16">
          <div className="flex items-center justify-center flex-col text-slate-700 max-w-4xl mx-auto text-center gap-y-2.5">
            <h1 className="font-bold text-7xl">
              Join Classroom and Earn Rewards
            </h1>
            <p className="font-medium text-lg">
              Your number one Web3 Alternative to Google Meet and X Space
            </p>
          </div>
        </div>
        <div className="bgred-500">
          <div className="grid gap-3 grid-cols-1 md:grid-cols-[18rem_1fr] lg:grid-cols-[18rem_1fr_18rem]">
            <div className="h-full flex flex-col">
              <div className="text-sm">
                Let's earn <br /> reward together
              </div>
              <div className="relative mt-auto pt-16">
                <div className="bg-slate-50 rounded-3xl mt-2">
                  <Image
                    src="/illustration/group_positivity.png"
                    className="w-full h-36 rounded-3xl object-cover"
                    width={300}
                    height={400}
                    alt="Pody Getting started"
                  />
                  <div className="p-5">
                    <h3 className="font-medium text-lg">Connect Wallet</h3>
                    <p className="text-sm mt-2 text-slate-600">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Possimus, sed iure! Provident sequi autem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col rounded-3xl h-full">
                <Image
                  src="/illustration/virtualmeeting.png"
                  className="w-[80%] mt-auto mx-auto rounded-3xl object-cover"
                  width={900}
                  height={700}
                  alt="Pody Getting started"
                />
              </div>
            </div>
            <div className="h-full flex flex-col">
              <div className="text-sm ml-auto">
                <p>
                  Pody Classroom <br /> New Features
                </p>
              </div>
              <div className="relative mt-auto pt-16">
                <div className="bg-slate-50 rounded-3xl mt-2">
                  <Image
                    src="/illustration/group_positivity.png"
                    className="w-full h-36 rounded-3xl object-cover"
                    width={300}
                    height={400}
                    alt="Pody Getting started"
                  />
                  <div className="p-5">
                    <h3 className="font-medium text-lg">Connect Wallet</h3>
                    <p className="text-sm mt-2 text-slate-600">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Possimus, sed iure! Provident sequi autem.
                    </p>
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

export default Hero;
