import Footer from "@/components/homepage/Footer";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import Privacyheader from "@/components/privacy/Privacyheader";

const page = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <Privacyheader />
        <PrivacyContent />
        <Footer />
      </main>
    </>
  );
};

export default page;
