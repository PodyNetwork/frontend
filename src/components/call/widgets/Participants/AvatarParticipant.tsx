import Image from "next/image";

export const AvatarParticipant = ({ enabled } : { enabled: boolean }) => (
  <Image
    src="/avatar/user1.webp"
    alt="user icon"
    width={200}
    height={200}
    className={`w-[60px] h-[60px] md:w-7 md:h-7 object-cover rounded-full ${
      !enabled && "md:w-[2.7rem] md:h-[2.7rem]"
    }`}
  />
);
