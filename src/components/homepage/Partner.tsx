import { AvatarParticipant } from "../Avatar/AvatarParticipant";
import Partner from "./widgets/partner";

const PartnerSection = () => {
  return (
    <section className="w-full relative" aria-labelledby="Partner">
      <div className="relative">
        <div className="z-30 relative flex flex-col">
          <Partner />
          <div className="w-16 h-16">
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
