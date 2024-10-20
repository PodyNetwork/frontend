import Partner from "./widgets/partner";

const PartnerSection = () => {
  return (
    <section className="w-full relative" aria-labelledby="Partner">
      <div className="bg-pody-dark relative">
        <div className="z-50 relative flex flex-col">
          <Partner />
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
