import Footer from "@/components/homepage/Global/Footer";
import TermsContent from "@/components/terms/TermsContent";
import Termsheader from "@/components/terms/Termsheader";

const page = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <Termsheader />
        <TermsContent />
        <Footer />
      </main>
    </>
  );
};

export default page;
