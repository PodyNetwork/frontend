import React from "react";

const MeetingLinkTableFull = () => {
  return (
    <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody">
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-6 pb-[20px] pt-4 shadow-2xl shadow-slate-100">
        <h4 className="text-lg font-medium text-slate-700 dark:text-white">
          Meeting Link
        </h4>
      </div>
      <div
        id="__meeting_tbl"
        className="w-full max-h-[330px] overflow-scroll px-6"
      >
        <table
          role="table"
          className="w-full table-auto overflow-x-auto text-nowrap"
        >
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
                  Participant Access
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
                <p className="text-md font-medium text-slate-600">01</p>
              </td>
              <td className="py-3 px-4 text-sm" role="cell">
                <p className="text-md font-medium text-slate-600">
                  https://pody.network
                </p>
              </td>
              <td className="py-3 px-4 text-sm" role="cell">
                <p className="text-md font-medium text-slate-600">Yes</p>
              </td>
              <td className="py-3 px-4 text-sm" role="cell">
                <p className="text-md font-medium text-slate-600">Active</p>
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
  );
};

export default MeetingLinkTableFull;
