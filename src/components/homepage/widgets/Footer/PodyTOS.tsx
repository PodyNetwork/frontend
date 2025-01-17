import React from "react";

const PodyTOS = () => {
  return (
    <div className="text-xs text-slate-500 flex flex-col gap-y-3 w-full md:w-10/12 py-7">
      <p>
        Pody Network is a decentralized platform built for virtual classrooms,
        offering interactive environments for education. Users engage in
        real-time learning while earning rewards for active participation.
      </p>
      <p>
        Students on Pody Network earn rewards based on the time they spend in
        virtual classrooms. Points are calculated using a hash rate per second
        system — the longer you stay in a session, the more points you
        accumulate. Final points are computed once the session ends or when you
        leave the classroom.
      </p>
      <p>
        Teachers (hosts) earn an additional 10% of the total points accumulated
        by all participants in their classrooms. This bonus is awarded at the
        end of the session or upon participants&apos; exit, incentivizing active
        hosting and engagement.
      </p>
      <p>
        Users can further boost their point-earning potential by minting
        additional NFTs directly from them NFT section on their dashboard.
      </p>
    </div>
  );
};

export default PodyTOS;
