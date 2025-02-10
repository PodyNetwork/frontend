"use client"
import NotificationHeader from "@/components/dashboard/widgets/notification/NotificationHeader";
import NotificationList from "@/components/dashboard/widgets/notification/NotificationList";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="bg-pody-mintgreen p-5 md:p-12">
        <NotificationHeader />
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-6 p-5 md:p-6">
        <div className="w-full">
          <NotificationList />
        </div>
      </div>
    </main>
  );
};

export default page;
