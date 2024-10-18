import Image from "next/image";

const Rewardcard = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <div className="px-7 pt-7 relative rounded-md shadow-md shadow-pody-secondary/50 bg-gradient-to-r from-pody-secondary/30 to-pody-dark_secondary overflow-hidden w-full sm:w-1/2 lg:w-8/12">
          <div className="relative z-50">
            <h3 className="text-xl font-normal text-slate-200">Teacher</h3>
            <p className="text-xs mt-1.5 text-slate-400 flex items-center leading-loose max-w-lg">
              Hosts are rewarded based on the number of participants and their
              level of engagement during the meeting. Hosting interactive and
              educational sessions results in more points. You can also increase
              the rate at which you earn as a host. Enjoy 10% of every
              participant points in your meeting/classroom.
            </p>
          </div>
          <div className="mt-auto relative -bottom-[2.75rem] flex justify-center lg:justify-start pt-12 z-50">
            <Image src="/illustration/HostAvatar.png" alt="host" width={300} height={300} className="w-56 h-56 object-cover" />
          </div>
          <div className="background-text">PODY</div>
        </div>
        <div className="px-7 pt-7 relative rounded-md shadow-md shadow-pody-secondary/50 bg-gradient-to-l from-pody-secondary/30 to-pody-dark_secondary flex flex-col items-center overflow-hidden w-full sm:w-1/2 lg:w-4/12">
          <div className="relative z-50">
            <h3 className="text-xl font-normal text-slate-200">Student</h3>
            <p className="text-xs mt-1.5 text-slate-400 flex items-center leading-loose">
              Participants earn points for the total time spent in a meeting.
              The longer you stay and engage, the more points you earn.
              Participants can also increase the rate at which they earn.
            </p>
          </div>
          <div className="mt-auto relative -bottom-[1.75rem] flex justify-center pt-12 z-50">
            <Image src="/illustration/ParticipantAvatar.png" alt="Participant" width={300} height={300} className="w-56 h-56 object-cover" />
          </div>
          <div className="background-text">NETWORK</div>
        </div>
      </div>
    </>
  );
};

export default Rewardcard;
