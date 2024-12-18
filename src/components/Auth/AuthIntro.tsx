import Image from "next/image";

const AuthIntro = () => {
  return (
    <div className="flex-1 justify-center items-center hidden md:flex relative p-2">
      <div className="_grad_card_main_login hidden md:block"></div>
      <div className="w-full flex-1 flex-col flex mt-auto relative h-full">
        <div className="relative z-30 gap-y-3 h-full">
          <Image
            src="/illustration/remote-study-groups-online-classroomsi.webp"
            alt="Pody Login Image"
            width={800}
            height={900}
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthIntro;
