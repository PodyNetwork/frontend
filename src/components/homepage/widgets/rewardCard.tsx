import Image from "next/image";
import studentImg from "/public/illustration/friends_together.png";
import teacherImg from "/public/illustration/teacher_standing.png";

const Rewardcard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="p-6 flex flex-row __reward_system_pd relative rounded-2xl shadow-md shadow-pody-secondary/50 bg-gradient-to-r from-pody-secondary/30 to-pody-dark_secondary overflow-hidden gap-6 w-full md:w-1/2">
          <div className="relative z-50 w-7/12 __pd_reward_content">
            <p className="text-sm text-slate-400 flex items-center leading-loose max-w-lg">
              Hosts are rewarded 10% of every participant points in the
              classroom based on their level of engagement during the classroom.
              Hosting interactive and educational sessions results in more
              points.
            </p>
          </div>
          <div className="z-50 w-5/12 __pd_reward_img">
            <Image
              src={teacherImg}
              alt="teacher"
              className="w-full min-h-72 h-full object-cover rounded-xl"
            />
          </div>
          <div className="background-text">PODY</div>
        </div>
        <div className="p-6 flex flex-row __reward_system_pd relative rounded-2xl shadow-md shadow-pody-secondary/50 bg-gradient-to-r from-pody-secondary/30 to-pody-dark_secondary overflow-hidden gap-6 w-full md:w-1/2">
          <div className="relative z-50 w-7/12 __pd_reward_content">
            <p className="text-sm text-slate-400 flex items-center leading-loose max-w-lg">
              Participants earn points for the total time spent in a meeting.
              The longer you stay and engage, the more points you earn.
              Participants can also increase the rate at which they earn.
            </p>
          </div>
          <div className="z-50 w-5/12 __pd_reward_img">
            <Image
              src={studentImg}
              alt="teacher"
              className="w-full min-h-72 h-full object-cover rounded-xl"
            />
          </div>
          <div className="background-text">NETWORK</div>
        </div>
      </div>
    </>
  );
};

export default Rewardcard;
