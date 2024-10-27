import Link from "next/link";
import Nav from "../../widgets/nav";

const Hero = () => {
  return (
    <section className="w-full relative">
      <div className="__class_wrapper_bg __pd_main_veil px-3 md:px-10 flex flex-col">
        <Nav />
        <div className="w-full my-auto relative flex flex-col items-center py-24">
          <div className="flex items-center justify-center flex-col text-slate-100 max-w-3xl text-center gap-y-3.5">
            <p className="font-medium text-xl">Pody Classroom</p>
            <h1 className="font-extrabold text-6xl leading-[1.15]">
              Join Ongoing Classroom and Earn Rewards
            </h1>
            <Link href="#publicClassroom">
              <button className="bg-pody-primary rounded-full px-5 py-1 text-slate-800 text-base font-medium">
                Explore
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full relative flex justify-center text-center">
          <p className="text-base text-slate-100 max-w-3xl py-5">
            Your number one Web3 Alternative to Google Meet and X Space, The
            longer you stay and engage, the more points you earn.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
