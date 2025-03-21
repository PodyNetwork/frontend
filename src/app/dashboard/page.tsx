"use client";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import CreateMeeting from "@/components/dashboard/widgets/createMeeting";
import useGetCalls from "@/hooks/call/useGetCalls";
import Image from "next/image";
import videoConfrenceImg from "/public/illustration/video-conference.png";

export default function Page() {
  const { calls, isLoading, isError } = useGetCalls({
    limit: 3,
  });
  return (
    <main className="w-full">
      <div className="bg-pody-mintgreen p-8 px-5 md:p-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-5/12">
            <CreateMeeting />
          </div>
          <div className="w-full md:w-6/12 flex justify-center">
            <Image
              src={videoConfrenceImg}
              width={300}
              height={300}
              className="object-contain w-full"
              alt="video conferencing"
              priority
              quality={75}
            />
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-8 px-5 md:p-12">
        <div className="max-w-4xl mx-auto">
          <CallHistory calls={calls} isLoading={isLoading} isError={isError} />
        </div>
      </div>
    </main>
  );
}
