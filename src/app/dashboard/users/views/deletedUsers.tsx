import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React from "react";

const header = [
  "Fullname ",
  "Username",
  "Gender",
  "Phone number",
  "Date Deleted",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";

const restart_icon = (
  <svg
    cursor="pointer"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="rotate-left">
      <path
        id="rotate-left_2"
        d="M14.5 8.00016C14.5 11.5842 11.584 14.5002 7.99996 14.5002C5.51529 14.5002 3.28532 13.1162 2.17932 10.8888C2.05599 10.6415 2.15791 10.3414 2.40458 10.2188C2.65391 10.0948 2.95265 10.1982 3.07532 10.4442C4.01065 12.3288 5.89794 13.4995 8.00061 13.4995C11.0333 13.4995 13.5006 11.0322 13.5006 7.99951C13.5006 4.96685 11.0333 2.49951 8.00061 2.49951C5.91794 2.49951 4.04056 3.68218 3.11389 5.49951H5.33394C5.60994 5.49951 5.83394 5.72351 5.83394 5.99951C5.83394 6.27551 5.60994 6.49951 5.33394 6.49951H2.00061C1.72461 6.49951 1.50061 6.27551 1.50061 5.99951V2.66618C1.50061 2.39018 1.72461 2.16618 2.00061 2.16618C2.27661 2.16618 2.50061 2.39018 2.50061 2.66618V4.54216C3.66994 2.68016 5.73594 1.49951 8.00061 1.49951C11.5839 1.50018 14.5 4.41616 14.5 8.00016Z"
        fill="#15A336"
      />
    </g>
  </svg>
);

const DeletedUsers = () => {
  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {table?.map((_, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>{_.name}</h3>
              </td>
              <td className={style}>
                <h3>{_.gender}</h3>
              </td>
              <td className={style}>
                <h3>{_.number}</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>

              <td className={style}>
                <h3>{restart_icon}</h3>
              </td>
            </tr>
          );
        })}
      </DefaultTable>
      <TablePagination />
    </div>
  );
};

export default DeletedUsers;
