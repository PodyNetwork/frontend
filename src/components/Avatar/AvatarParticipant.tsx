import Avatar from "boring-avatars";

export const AvatarParticipant = ({name} : {name: string}) => (
  <>
    <Avatar name={name} className="w-full h-full" variant="beam" colors={["#07070A", "#f63700", "#004853", "#007e80", "#00b9bd"]}/>
  </>
);
