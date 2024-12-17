import ReferralRank from "./ReferralRank";
import TopWeeklyReferral from "./TopWeeklyReferral";
const RefereePosition = () => {
  return (
    <div className="w-full md:w-[21rem] flex flex-col gap-y-4">
      <ReferralRank />
      <TopWeeklyReferral />
    </div>
  );
};

export default RefereePosition;
