import Image from "next/image";
import hostImg from "/public/illustration/host.png";
import participantImg from "/public/illustration/participant.png";

const Rewardcard = () => {
  return (
    <>
      <div className="gap-6 mt-6 z-50 relative grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 flex flex-col __reward_system_pd relative rounded-2xl shadow-md bg-pody-dark_secondary to-pody-dark_secondary overflow-hidden gap-6 w-full">
          <div className="z-50 w-full __pd_reward_img">
            <Image
              src={hostImg}
              alt="teacher"
              className="w-full min-h-72 h-full object-cover rounded-xl opacity-70 hover:opacity-100 transition-all duration-300"
            />
          </div>
          <div className="relative z-50 w-full __pd_reward_content py-4">
            <h3 className="text-xl font-medium text-slate-300">Hosts</h3>
            <p className="text-sm text-slate-500 flex items-center leading-loose max-w-sm mt-2.5">
              In addition to the points earned, hosts are rewarded 10% of the points accumulated points by their students.
            </p>
          </div>
        </div>
        <div className="p-6 flex flex-col __reward_system_pd relative rounded-2xl shadow-md bg-pody-dark_secondary overflow-hidden gap-6 w-full">
          <div className="z-50 w-full __pd_reward_img">
            <Image
              src={participantImg}
              alt="teacher"
              className="w-full min-h-72 h-full object-cover rounded-xl opacity-70 hover:opacity-100 transition-all duration-300"
            />
          </div>
          <div className="relative z-50 w-full __pd_reward_content py-4">
            <h3 className="text-xl font-medium text-slate-300">Participant</h3>
            <p className="text-sm text-slate-500 flex items-center leading-loose max-w-sm mt-2.5">
              Students earn points for the total time spent in a meeting. The longer you stay and engage, the more points you earn.          
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewardcard;
