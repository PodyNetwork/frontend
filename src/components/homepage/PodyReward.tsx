import Rewardcard from "./widgets/rewardCard";
import RewardHeader from "./widgets/rewardHeader";

const RewardSection = () => {
  return (
    <section
      id="reward"
      className="bg-pody-dark relative text-white py-40 px-8 md:px-16 flex flex-col justify-center"
      aria-label="Pody Reward"
    >
      <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
        <RewardHeader />
        <Rewardcard />
      </div>
    </section>
  );
};

export default RewardSection;
