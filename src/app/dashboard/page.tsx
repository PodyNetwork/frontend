"use client";
import React from "react";

export default function Page() {
  return (
    <main className="w-[calc(100%-15rem)] ml-60 bg-white">
      <div className="w-full px-7 flex flex-col gap-y-6">
        <div className="flex flex-col mt-4">
          <header className="flex flex-row justify-between gap-x-4 items-center">
            <div>
              <h3 className="text-xl font-medium text-slate-700">
                Hello, 0x3ax.
              </h3>
            </div>
            <ul className="flex flex-row items-s items-stretch text-sm text-slate-500 __dashheader_icon_info">
              <li>100H/s</li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                >
                  <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                >
                  <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path>
                  <circle cx="9.5" cy="11.5" r="1.5"></circle>
                  <circle cx="14.5" cy="11.5" r="1.5"></circle>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                >
                  <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
                </svg>
              </li>
            </ul>
          </header>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 gap-x-6">
            <div className="relative z-50 flex justify-center col-span-2">
              <div className="bg-[#F3F4F6] p-6 rounded-xl w-full z-50">
                <div className="w-6 h-6 bg-slate-400/20 rounded-full flex justify-center items-center mb-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400"
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xs text-slate-400">NEW MEETING</h2>
                <p className="text-sm text-slate-700">Generate a quick meeting link for immediate or future scheduling</p>
              </div>
            </div>
            <div className="relative z-50 flex justify-center">
              <div className="__card_small_dashboard z-10"></div>
              <div className="bg-[#F3F4F6] p-6 rounded-xl w-full z-50">
                <div className="w-6 h-6 bg-slate-400/20 rounded-full flex justify-center items-center mb-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400"
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xs text-slate-400">TOTAL MEETING</h2>
                <p className="text-3xl font-semibold text-slate-700">99</p>
              </div>
            </div>
            <div className="relative z-50 flex justify-center">
              <div className="__card_small_dashboard z-10"></div>
              <div className="bg-[#F3F4F6] p-6 rounded-xl w-full z-50">
                <div className="w-6 h-6 bg-slate-400/20 rounded-full flex justify-center items-center mb-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400"
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xs text-slate-400">ACTIVE MEETING</h2>
                <p className="text-3xl font-semibold text-slate-700">33</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 gap-x-6">
            <div className="col-span-3">
              <div className="bg-[#F3F4F6] p-6 rounded-xl w-full z-50">
                <div className="pb-5">
                  <h3 className="text-lg text-slate-700">Meeting Links</h3>
                  <p className="text-sm text-slate-600">Monitor and handle recent classroom link activities.</p>
                </div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-xs text-left rtl:text-right border bg-re-200 rounded-md text-gray-500 overflow-hidden __tbl_links">
                    <thead className="text-xs text-gray-700 uppercase">
                      <tr className="border-b text-[0.7rem]">
                        <th scope="col" className="px-6 py-3 font-medium">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Color
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">$2999</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">$2999</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                  >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                      Showing{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          1
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          2
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          aria-current="page"
                          className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                          3
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          4
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          5
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="bg-[#F3F4F6] p-6 rounded-xl w-full z-50 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repellat deserunt atque neque accusamus, temporibus cum cupiditate tenetur veritatis voluptas quae, iste soluta, blanditiis optio! Aliquid quas sapiente eaque officiis?
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
