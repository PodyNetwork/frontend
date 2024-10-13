"use client"; // Enable client-side rendering

import MeetLayout from "@/components/call/meetLayout";

const Call = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Meeting"
      >
        <MeetLayout />
      </main>
    </>
  );
};

export default Call;
