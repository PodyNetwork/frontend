import rewardImageError from "/public/illustration/wormies nocall.svg";
import Image from "next/image";

interface props {
  message: string;
}

export const EmptyMessage = ({ message }: props) => {
  return (
    <div className="relative flex p-6 w-full flex-col rounded-3xl __shadow_pody cursor-pointer">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-between w-full">
        <div className="w-full md:w-5/12">
          <p className="break-words text-sm sm:text-base text-slate-500">{message}</p>
        </div>
        <div className="w-full md:w-6/12">
          <Image
            src={rewardImageError}
            className="w-full h-56 object-contain"
            width={300}
            height={300}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};
