import Image from "next/image";
import logo from "/public/logo/pody logo 1.png";
import Link from "next/link";

const AuthIntro = () => {
  return (
    <div className="flex-1 md:w-1/2 flex justify-center items-center relative p-6 md:p-10">
      <div className="_grad_card_main_login hidden md:block"></div>
      <div className="w-full max-w-md bg--200 flex-1">
        <Link href="/">
          {" "}
          <Image
            src={logo}
            alt="Pody Logo"
            className="w-16 sm:w-16 md:w-20 object-contain mb-6 sm:mb-8 md:mb-12"
          />
        </Link>
        <div className="relative z-50">
          <h3 className="text-base md:text-xl font-medium text-slate-200">
            Get rewarded for your time. the longer you participate, the more
            points you earn.
          </h3>
          <p className="text-xs mt-2.5 text-slate-400 leading-relaxed">
           <span className="text-red-400">*</span>It took you 4 seconda to read that, you could have earned up to 12 points
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthIntro;
