"use client";
import React from "react";
import Schedule from "@/components/dashboard/widgets/schedule";
import MeetingLinkTable from "@/components/dashboard/widgets/meetingLinkTable";
import MeetingAnalysis from "@/components/dashboard/widgets/meetingAnalysis";
import EarningChart from "@/components/dashboard/widgets/earningChart";
import CreateMeeting from "@/components/dashboard/widgets/createMeeting";

export default function Page() {
  return (
    <main className="w-full">
      <div className="w-full flex flex-row gap-y-6 bg-pody-primary/20 p-12">
        <div className="w-3/12">
          <CreateMeeting />
        </div>
        <div className="w-6/12 flex justify-center">
          <EarningChart />
        </div>
        <div className="w-3/12 my-auto">
          <MeetingAnalysis />
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="w-5/12">
            <MeetingLinkTable />
          </div>
          <div className="w-7/12">
            <Schedule />
          </div>
          {/* <div className="w-4/12">
            <div className="relative flex pb-4 w-full flex-col rounded-[10px] __shadow_pody">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4 shadow-2xl shadow-slate-100">
                <h4 className="text-base text-slate-700 dark:text-white">
                  Scheduled Meeting
                </h4>
              </div>
              <div className="px-4">
                <div
                  className="w-full h-full overflow-auto max-h-[330px]"
                  id="__scheduled_meet">
                  <table className="w-full">
                    <tbody className="">
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Today</div>
                          <div>07:45</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Create pull request #1213
                            <a className="text-blue-500 hover:underline" href="#">
                              #231231
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>12</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Tea with Pody and ecosystem
                            <a className="text-blue-500 hover:underline" href="#">
                              #231231
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>10</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            The Pody Space
                            <a className="text-blue-500 hover:underline" href="#">
                              #615353
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>06</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Lets talk about Pody
                            <a className="text-blue-500 hover:underline" href="#">
                              #9272
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Today</div>
                          <div>07:45</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Create pull request #1213
                            <a className="text-blue-500 hover:underline" href="#">
                              #231231
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>12</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Tea with Pody and ecosystem
                            <a className="text-blue-500 hover:underline" href="#">
                              #231231
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>10</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            The Pody Space
                            <a className="text-blue-500 hover:underline" href="#">
                              #615353
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="relative transform scale-100 text-xs py-1 border-b border-slate-200 cursor-default">
                        <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-slate-400">Sep</div>
                          <div>06</div>
                        </td>
                        <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-slate-900">
                            Lets talk about Pody
                            <a className="text-blue-500 hover:underline" href="#">
                              #9272
                            </a>
                          </div>
                          <div className="leading-5 text-slate-800">
                            Meeting ID: wor-kn0-stop
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
