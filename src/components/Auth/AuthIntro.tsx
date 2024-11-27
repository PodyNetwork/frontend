import Image from "next/image";
import logo from "/public/logo/pody logo 1.png";
import Link from "next/link";

const AuthIntro = () => {
  return (
    <div className="md:w-1/2 justify-center items-center hidden md:flex bg-pody-mintgreen rounded-2xl relative p-6 md:p-10">
      <div className="_grad_card_main_login hidden md:block"></div>
      <div className="w-full max-w-80 flex-1">
        <div className="relative z-30 flex flex-col gap-y-3">
          <Image
            src="/images/Pody 1123 02.jpg"
            alt="Pody Logo"
            width={300}
            height={300}
            className="w-full rounded-xl object-contain"
          />
          <Image
            src="/images/1103.jpg"
            alt="Pody Logo"
            width={300}
            height={300}
            className="w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthIntro;
