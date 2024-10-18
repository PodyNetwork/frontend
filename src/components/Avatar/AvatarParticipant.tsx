import Avatar from "boring-avatars";

export const AvatarParticipant = ({name} : {name: string}) => (
  <>
    <Avatar name={name} className="w-full h-full" variant="beam" colors={["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#4A4A4A"]}/>
  </>
);
