import Image from "next/image";

const AuthIntro = () => {
  return (
    <div className="md:w-1/2 justify-center items-center hidden md:flex bg-pody-mintgreen rounded-2xl relative p-5">
      <div className="_grad_card_main_login hidden md:block"></div>
      <div className="w-full flex-1">
        <div className="relative z-30 flex flex-col gap-y-3">
          <Image
            src="/images/Pody 1123 01.jpg"
            alt="Pody Login Image"
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
