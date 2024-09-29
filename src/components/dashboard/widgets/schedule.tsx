"use client"
import React from "react";
import Image from "next/image";
import userIcon from "/public/avatar/user5.jpeg";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Schedule = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody">
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4">
        <h4 className="text-lg text-slate-700 dark:text-white font-medium">
          My Schedule
        </h4>
        {pathname !== '/dashboard/schedule' && <Link href="/dashboard/schedule">
          <button className="text-xs bg-pody-primary/40 px-3.5 py-1.5 rounded-full">
            Show All
          </button>
        </Link>}
      </div>
      <div className="grid grid-cols-3 gap-x-4 px-6">
        <div className="p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-slate-700">Jan 4 2023, 10:45 PM</p>
            <h3 className="text-lg font-medium text-slate-800">
              The Pody ecosystem web3 podcast
            </h3>
            <div>
              <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">
                Private
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-x-3 mt-auto">
            <div className="w-9 h-9 rounded-full bg-black/20">
              <Image
                src={userIcon}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-full"
                alt="user"
              />
            </div>
            <div className="text-sm">
              <h3 className="font-medium">0x3ax</h3>
              <p>Host</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-pody-primary/30 rounded-2xl flex flex-col h-[270px]">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-slate-700">Jan 4 2023, 10:45 PM</p>
            <h3 className="text-lg font-medium text-slate-800">
              Taking it to a brand new space in web3
            </h3>
            <div>
              <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">
                Private
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-x-3 mt-auto">
            <div className="w-9 h-9 rounded-full bg-black/20">
              <Image
                src={userIcon}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-full"
                alt="user"
              />
            </div>
            <div className="text-sm">
              <h3 className="font-medium">0x3ax</h3>
              <p>Host</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-xs text-slate-700">Jan 4 2023, 10:45 PM</p>
            <h3 className="text-lg font-medium text-slate-800">
              Join the web3 space on innovation
            </h3>
            <div>
              <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">
                Private
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-x-3 mt-auto">
            <div className="w-9 h-9 rounded-full bg-black/20">
              <Image
                src={userIcon}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-full"
                alt="user"
              />
            </div>
            <div className="text-sm">
              <h3 className="font-medium">0x3ax</h3>
              <p>Host</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
