import React from "react";
import Image from "next/image";
import logo from "/public/logo/pody logo 1.png";
import Link from "next/link";
import ScrollContent from "../homepage/widgets/ScrollContent";

const AuthIntro = () => {
  return (
    <div className="flex-1 md:w-1/2 flex justify-center items-center relative p-6 md:p-10">
      <div className="_grad_card_main_login hidden md:block"></div>
      <div className="w-full max-w-lg bg--200 flex-1">
        <Link href="/">
          {" "}
          <Image
            src={logo}
            alt="Pody Logo"
            className="w-16 sm:w-16 md:w-20 object-contain mb-6 sm:mb-8 md:mb-14"
          />
        </Link>
        <div className="relative z-50">
          <h3 className="text-base sm:text-lg md:text-xl font-medium text-slate-200">
            Rewards for Participation
          </h3>
          <p className="text-sm mt-1.5 text-slate-400 leading-relaxed">
            Get rewarded for your time. The longer you participate, the more
            points you earn. These points can be converted to tokens, creating
            real value for your time in Classroom.
          </p>
          <ScrollContent />
        </div>
      </div>
    </div>
  );
};

export default AuthIntro;
