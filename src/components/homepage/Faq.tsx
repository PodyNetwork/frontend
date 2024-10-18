import FaqCard from "./widgets/faqCard";

const RewardSection = () => {
  return (
    <section
      className="bg-pody-dark relative text-white py-16 px-8 md:px-16 flex flex-col justify-center"
      aria-label="FAQ"
    >
      <div className="max-w-5xl mx-auto">
        <FaqCard />
      </div>
    </section>
  );
};

export default RewardSection;
