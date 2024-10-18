import { motion } from "framer-motion";
import useGetClaimHistory from "@/hooks/point/useGetClaimHistory";
import { formatUnits } from "viem";
import dayjs from "dayjs";
import { claimPoints } from "@/utils/passport";
import useProfile from "@/hooks/user/useProfile";
import { Address } from "@/types/address";
import ConnectOrComponent from "@/components/global/ConnectOrComponent";

const HistorySkeleton = () => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 * 0.1, duration: 0.5 }}
      className="flex flex-row items-center justify-between bg-gray-200 rounded-xl px-3 sm:px-6 py-3 mb-2 animate-pulse"
    >
      <motion.div
        className="flex items-center gap-x-2 flex-grow min-w-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 * 0.1, duration: 0.3 }}
      >
        <div className="w-6 h-4 bg-gray-300 rounded"></div>
        <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 * 0.1, duration: 0.3 }}
      >
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </motion.div>
    </motion.li>
  );
};

const RewardHistory = () => {
  const {
    claimHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetClaimHistory();

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const { profile } = useProfile();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex h-fit w-full items-center justify-between rounded-t-2xl pb-[20px] pt-4"
      >
        <h4 className="text-base text-slate-700 dark:text-slate-800 font-medium">
          History
        </h4>
      </motion.div>
      <div className="gap-4">
        <ul className="space-y-3 sm:space-y-4">
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <HistorySkeleton key={index} />
              ))
            : claimHistory.length > 0 &&
              claimHistory.map((data, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex flex-row items-center justify-between bg-white rounded-xl px-3 sm:px-6 py-3 mb-2 __shadow_pody transition-shadow duration-300"
                >
                  <motion.div
                    className="flex items-center gap-x-2 flex-grow min-w-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="text-base text-slate-500 w-6 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                      <h3 className="text-xs sm:text-sm text-slate-800 truncate">
                        {data?.points !== undefined
                          ? `${formatUnits(BigInt(data?.points), 18)} points`
                          : "No points available"}
                      </h3>
                    </div>
                  </motion.div>
                  <div className="flex items-center gap-x-2">
                    <motion.h5
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        duration: 0.3,
                      }}
                      className="font-medium text-xs text-slate-500"
                    >
                      {data?.timeClaimed
                        ? dayjs(data?.timeClaimed).format("DD MMM YYYY h:mm A")
                        : "N/A"}
                    </motion.h5>
                    <ConnectOrComponent>
                      <button
                        className="text-xs px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto"
                        onClick={() => {
                          claimPoints({
                            userAddress: profile?.walletAddress as Address,
                            nonce: data?._id,
                            points: BigInt(data?.points) ?? BigInt(0),
                            signature: data?.signature,
                          });
                        }}
                      >
                        Mint Point
                      </button>
                    </ConnectOrComponent>
                  </div>
                </motion.li>
              ))}
          {isFetchingNextPage && <HistorySkeleton />}
        </ul>
        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="text-xs px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RewardHistory;
