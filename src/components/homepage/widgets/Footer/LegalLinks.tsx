import Loader from "@/components/preloader/Loader";
import footlink from "../../data/footlink.json";
import { useNavigate } from "@/components/utils/PageRouter";

const LegalLinks = () => {
  const { handleClick, isPending } = useNavigate();

  return (
    <>
      {isPending && <Loader />}
      <div className="flex flex-col flex-wrap text-sm w-full">
        <p className="pb-5 font-bold">Legal</p>
        <ul className="flex flex-col" aria-label="Social Links">
          {footlink.legal.map((link, index) => (
            <button onClick={() => handleClick(link.url)} key={index}>
              <li className="hover:text-pody-primary flex gap-1 flex-row justify-between items-center hover:transition-all duration-100 font-medium py-3.5">
                <p>{link.title}</p>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LegalLinks;
