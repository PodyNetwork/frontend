import Partner from "./widgets/partner/partner";

const PartnerSection = () => {
  return (
    <section className="w-full relative" aria-labelledby="Partner">
      <div className="relative">
        <div className="z-30 relative flex flex-col">
          <Partner />
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
