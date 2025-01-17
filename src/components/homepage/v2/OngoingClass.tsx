
import OngoingCallHeader from "./widgets/OngoingClass/OngoingCallHeader";
import Publiccall from "./widgets/OngoingClass/PublicCall";

const OngoingClass = () => {
  return (
    <section className="w-full relative">
      <div
        className="flex flex-col max-w-7xl mx-auto pt-6 pb-24 px-5 md:px-6"
        id="publicClassroom"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full">
            <OngoingCallHeader />
            <Publiccall />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingClass;
