import rewardImageError from "/public/illustration/wormies nocall.svg";
import Image from "next/image";

interface props {
  message: string;
}

export const EmptyMessage = ({ message }: props) => {
  return (
    <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody cursor-pointer">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-between w-full">
        <div className="w-full md:w-4/12">
          <p className="break-words text-lg sm:text-xl">{message}</p>
        </div>
        <div className="w-full md:w-7/12">
          <Image
            src={rewardImageError}
            className="w-full h-64 object-contain"
            width={300}
            height={300}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};
