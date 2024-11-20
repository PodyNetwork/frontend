import Avatar from "boring-avatars";

export const AvatarParticipant = ({name} : {name: string}) => (
  <>
    <Avatar name={name} className="w-full h-full" variant="beam" colors={["#30C5C8", "#6C63FF", "#FF9500", "#FFC400", "#FF758F"]}/>
  </>
);
