import { AvatarParticipant } from "../../Avatar/AvatarParticipant";
const PlaceHolder = ({name} : {name: string}) => {
  return (
    <div
      className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[20%] md:w-[12%]">
        <AvatarParticipant name={name} />
      </div>
    </div>
  );
};

export default PlaceHolder;
