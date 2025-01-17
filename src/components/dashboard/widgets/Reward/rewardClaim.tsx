"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RewardTab from "./RewardTab";
import RewardHistory from "./RewardHistory";

const RewardClaim = () => {
  return (
    <>
      <Tabs defaultValue="reward">
        <TabsList>
          <TabsTrigger value="reward">Reward</TabsTrigger>
          <TabsTrigger value="history">Claim History</TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex pb-4 w-full flex-col rounded-3xl"
        >
          <TabsContent value="reward">
            <RewardTab />
          </TabsContent>
          <TabsContent value="history">
            <RewardHistory />
          </TabsContent>
        </motion.div>
      </Tabs>
    </>
  );
};

export default RewardClaim;
