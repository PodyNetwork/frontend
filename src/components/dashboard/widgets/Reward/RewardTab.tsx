import { motion } from "framer-motion";
import { RewardClaimSkeleton } from "./RewardClaimSkeleton";
import { EmptyMessage } from "./RewardEmptyMessage";
import useGetPointsHistory from "@/hooks/point/useGetPointsHistory";
import { formatUnits } from "viem";
import dayjs from "dayjs";
import approx from "approximate-number";

const RewardTab = () => {
  const {
    pointsHistory,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useGetPointsHistory();

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const formatPointsToEther = (points: bigint | number | undefined): number => {
    return Number(formatUnits(BigInt(points ?? 0), 18));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex h-fit w-full items-center justify-between rounded-t-2xl pb-[20px] pt-4"
      >
        <h4 className="text-base text-slate-700 dark:text-slate-800 font-medium">
          Rewards
        </h4>
      </motion.div>
      <div className="gap-4">
        <ul className="space-y-3 sm:space-y-4">
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <RewardClaimSkeleton key={index} />
            ))
          ) : pointsHistory.length > 0 ? (
            pointsHistory.map((item, index) => (
              <motion.li
                key={item?._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 * 0.1, duration: 0.5 }}
                className="flex flex-row items-center justify-between bg-white rounded-xl px-3 sm:px-6 py-3 mb-2 __shadow_pody transition-shadow duration-300"
              >
                <motion.div
                  className="flex items-center gap-x-2 flex-grow min-w-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 * 0.1, duration: 0.3 }}
                >
                  <div className="text-base text-slate-500 w-6 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                    <h3 className="text-xs sm:text-sm text-slate-800 truncate">
                        {item?.points !== undefined
                        ? `${approx(formatPointsToEther(item.points))} ${
                          item?.source === "referral" ? "Referral Points" : "points"
                          }`
                        : "No points available"}
                    </h3>
                  </div>
                </motion.div>
                <div>
                  <motion.h5
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.7 * 0.1,
                      duration: 0.3,
                    }}
                    className="font-medium text-sm text-slate-500"
                  >
                    {item?.timeCreated
                      ? dayjs(item?.timeCreated).format("DD MMM YYYY h:mm A")
                      : "N/A"}
                  </motion.h5>
                </div>
              </motion.li>
            ))
          ) : (
            <EmptyMessage message="Unlock your potential rewards today! Create a Classroom or refer friends to start earning points." />
          )}
          {isFetchingNextPage && <RewardClaimSkeleton />}
        </ul>
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300 w-full xs:w-auto"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default RewardTab;
