
import QuickFeaturesCard from "./widgets/Features/QuickFeaturesCard";
import FeaturesCard from "./widgets/Features/FeaturesCard";
import FeaturesMainImage from "./widgets/Features/FeaturesMainImage";
import DiscoveFeature from "./widgets/Features/DiscoveFeature";
import FeaturesMain from "./widgets/Features/FeaturesMain";

const PodyFeatures = () => {
  return (
    <section className="w-full relative" id="features">
      <div className="flex flex-col py-24 w-full text-slate-900 max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid __discover_lyout gap-6 justify-between">
          <DiscoveFeature />
          <FeaturesMainImage />
          <div className="flex flex-col __flex_row_fts gap-y-4 __span-2">
            <QuickFeaturesCard />
            <FeaturesMain />
          </div>
        </div>
        <FeaturesCard />
      </div>
    </section>
  );
};

export default PodyFeatures;
