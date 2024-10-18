import Rewardcard from "./widgets/rewardCard";
import RewardHeader from "./widgets/rewardHeader";

const RewardSection = () => {
  return (
    <section
      className="bg-pody-dark relative text-white py-2 px-8 md:px-16 min-h-screen flex flex-col justify-center"
      aria-label="Pody Reward"
    >
      <div className="max-w-5xl mx-auto">
        <RewardHeader />
        <Rewardcard />
      </div>
    </section>
  );
};

export default RewardSection;
