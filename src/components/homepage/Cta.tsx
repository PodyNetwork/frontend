import ButtonPody from "../global/button";
import Link from "next/link";
import JoinDrawer from "./widgets/JoinDrawer";

const Cta = () => {
  return (
    <section
      className="bg-pody-dark relative text-white py-32 px-4 md:px-16 flex flex-col justify-center overflow-hidden"
      aria-label="cta"
    >
      <div>
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
          <div className="w-full px-7 py-20 rounded-xl bg-pody-dark_secondary z-50 relative">
            <h2 className="text-center font-bold text-3xl sm:text-4xl">
              Experience a new way of having <br /> virtual classrooms.
            </h2>
            <div className="flex flex-row flex-wrap justify-center items-center gap-3 mt-6 text-sm">
              <Link href="/dashboard">
                <ButtonPody>
                  <span className="text-sm">Create Classroom</span>
                </ButtonPody>
              </Link>
              <JoinDrawer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
