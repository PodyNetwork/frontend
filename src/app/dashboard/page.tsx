"use client";
import Button from "@/components/global/button";
import ButtonBorder from "@/components/global/buttonborder";
import React from "react";
import Image from "next/image";
import userIcon from "/public/avatar/user5.jpeg";

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig



export default function Page() {
  return (
    <main className="w-full">
      <div className="w-full flex flex-row gap-y-6 bg-pody-primary/20 p-12">
        <div className="w-3/12">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-4xl text-slate-800">Create <span className="text-slate-500">Meeting</span> for Now or Later</h2>
            <div className="text-sm mt-2 flex flex-row gap-x-2">
              <Button>Create Meeting</Button>
              <ButtonBorder>Schedule for Later</ButtonBorder>
            </div>
            <div className="text-sm">Last meeting: 24th september 2021</div>
          </div>
        </div>
        <div className="w-6/12 flex justify-center">
          <div className="w-10/12">
            <div className="text-base mb-2">Average Earning</div>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <div className="w-3/12 my-auto">
          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-xl text-slate-800">
                Meeting Links
              </h2>
              <p className="text-sm">Here you can see total and active link</p>
            </div>
            <div className="flex flex-row items-center">
              <div className="aspect-square w-8 h-8 bg-pody-primary/20 rounded-full flex items-center justify-center text-slate-600 me-3 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-5 h-5'
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                    >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path><path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                </svg>
              </div>
              <div className="flex flex-row gap-x-1.5 items-center justify-between text-sm">
                <h3 className="text-slate-800">Total Link Created</h3>
                <span>-</span>
                <p>99</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="aspect-square w-8 h-8 bg-pody-primary/20 rounded-full flex items-center justify-center text-slate-600 me-3 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-5 h-5'
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                    >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path><path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                </svg>
              </div>
              <div className="flex flex-row gap-x-1.5 items-center justify-between text-sm">
                <h3 className="text-slate-800">Active Link</h3>
                <span>-</span>
                <p>4</p>
              </div>
            </div>
            <div>
              <button className="text-xs bg-pody-primary/40 px-3.5 py-1.5 rounded-full">Show All</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="w-5/12">
            <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4 shadow-2xl shadow-slate-100">
                <h4 className="text-lg font-medium text-slate-700 dark:text-white">
                  Meeting Link
                </h4>
                <button className="text-xs bg-pody-primary/40 px-3.5 py-1.5 rounded-full">Show All</button>
              </div>
              <div id="__meeting_tbl" className="w-full max-h-[330px] overflow-scroll px-6">
                <table role="table" className="w-full table-auto overflow-x-auto text-nowrap">
                  <thead>
                    <tr role="row">
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="s/n"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-slate-700 text-xs">
                          S/N
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="meeting id"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 px-4 pt-4 text-start uppercase tracking-wide text-slate-700 text-xs">
                          Meeting ID
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="status"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 px-4 pt-4 text-start uppercase tracking-wide text-slate-700 text-xs">
                          Status
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="date created"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 px-4 pt-4 text-start uppercase tracking-wide text-slate-700 text-xs">
                          Date Created
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup" className="px-4">
                    <tr role="row">
                      <td className="py-3 text-sm" role="cell">
                        <p className="text-md font-medium text-slate-600">
                          01
                        </p>
                      </td>
                      <td className="py-3 px-4 text-sm" role="cell">
                        <p className="text-md font-medium text-slate-600">
                          https://pody.network
                        </p>
                      </td>
                      <td className="py-3 px-4 text-sm" role="cell">
                        <p className="text-md font-medium text-slate-600">
                          Active
                        </p>
                      </td>
                      <td className="py-3 px-4 text-sm" role="cell">
                        <p className="text-md font-medium text-slate-600">
                          September 04 2024
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-7/12">
            <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4">
                <h4 className="text-lg text-slate-700 dark:text-white font-medium">
                  My Schedule
                </h4>
                <button className="text-xs bg-pody-primary/40 px-3.5 py-1.5 rounded-full">Show All</button>
              </div>
              <div className="grid grid-cols-3 gap-x-4 px-6">
                  <div className="p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]">
                    <div className="flex flex-col gap-y-1.5">
                      <p className="text-xs text-slate-700">Jan 4 2023, 10:45 PM</p>
                      <h3 className="text-lg font-medium text-slate-800">The Pody ecosystem web3 podcast</h3>
                      <div>
                        <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">Private</button>
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
                      <h3 className="text-lg font-medium text-slate-800">Taking it to a brand new space in web3</h3>
                      <div>
                        <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">Private</button>
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
                      <h3 className="text-lg font-medium text-slate-800">Join the web3 space on innovation</h3>
                      <div>
                        <button className="text-xs text-pody-danger bg-pody-danger/10 px-3 py-1 font-medium rounded-sm">Private</button>
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
