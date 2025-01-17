import Image from "next/image";
import { useNavigate } from "@/components/utils/PageRouter";
import Loader from "@/components/preloader/Loader";

const CallWaiting = () => {
  const { handleClick, isPending } = useNavigate();

  return (
    <>
      {isPending && <Loader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
        <div className="w-full p-4">
          <div className="max-w-md mx-auto flex flex-col text-center items-center justify-center gap-y-3 my-12 bg-white p-9 rounded-xl text-slate-700">
            <Image
              src="/illustration/11395275.jpg"
              className="w-full md:w-[320px] object-contain mx-auto"
              width={1500}
              height={536}
              alt="pody call waiting"
              priority
              loading="eager"
              quality={75}
            />
            <h3 className="text-2xl font-medium">
              Host hasn&apos;t started the Classroom yet
            </h3>
            <p className="text-sm">
              The Classroom session is not live yet. Please wait for the host to
              start the session.
            </p>
            <button
              onClick={() => handleClick("/dashboard")}
              className="px-4 py-3 bg-pody-dark text-slate-300 text-sm rounded-full"
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallWaiting;
