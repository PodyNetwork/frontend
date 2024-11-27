import RewardImage from "./widgets/Reward/RewardImage";
import RewardContent from "./widgets/Reward/RewardContent";
import RewardStatCTA from "./widgets/Reward/RewardStatCTA";

const RewardSystem = () => {


  return (
    <section className="w-full relative" id="reward">
      <div className="flex flex-col max-w-7xl mx-auto px-5 md:px-6 pt-16 pb-32">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-1/2 flex flex-col">
            <RewardContent />
            <RewardStatCTA />
          </div>
          <RewardImage />
        </div>
      </div>
    </section>
  );
};

export default RewardSystem;


