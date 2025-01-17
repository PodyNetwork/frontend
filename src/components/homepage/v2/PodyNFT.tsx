import Header from "./widgets/NFTPody/Header";
import NFTCard from "./widgets/NFTPody/NFTCard";

const PodyNFT = () => {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col justify-between gap-x-6 pt-8 pb-24">
        <Header />
        <NFTCard />
      </div>
    </section>
  );
};

export default PodyNFT;
