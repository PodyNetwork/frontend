import FaqCard from "./widgets/faqCard";

const RewardSection = () => {
  return (
    <section
      id="faq"
      className="bg-pody-dark relative text-white py-40 px-8 md:px-16 flex flex-col justify-center"
      aria-label="FAQ"
    >
      <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
        <FaqCard />
      </div>
    </section>
  );
};

export default RewardSection;