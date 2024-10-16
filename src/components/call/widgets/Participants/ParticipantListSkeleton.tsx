export const ParticipantListSkeleton = ({
  expanded,
}: {
  expanded: boolean;
}) => (
  <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5 md:mb-[20px] md:gap-0 md:flex flex-row flex-wrap md:flex-col relative __participant_list">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        className={`md:flex flex-row justify-between md:gap-x-2 py-0 md:py-2 text-sm text-slate-500 animate-pulse ${
          !expanded ? "md:justify-center" : ""
        }`}
        key={index}
      >
        <div className="flex md:flex-row flex-col items-center truncate relative">
          <div
            className={`w-[60px] h-[60px] md:w-7 md:h-7 bg-gray-300 rounded-full ${
              !expanded ? "md:w-[2.7rem] md:h-[2.7rem]" : ""
            }`}
          ></div>
          <div
            className={`md:ms-2.5 flex-col items-center justify-center text-sm ${
                !expanded ? "hidden" : "block"
              }`}
          >
            <div className="hidden md:block h-4 w-24 bg-gray-300 rounded mb-1"></div>
            <div className="flex flex-row items-center md:hidden text-xs leading-none">
              <div className="h-4 w-16 bg-gray-300 rounded mr-2"></div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className={`hidden flex-row items-center gap-x-2.5 ${
              expanded ? "md:flex" : "md:hidden"
            }`}>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
