import React, { Fragment } from "react";
import UserStat from "../components/userStat";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import EventStat from "../components/userEventStat";
import { eventViewData } from "../contents";

const header = [
  "Full Name",
  "Username",
  "Gender",
  "Phone Number",
  "Last Active",
];

const ViewUserEvent = () => {
  return (
    <div>
      <div className="flex gap-5 my-[4em]">
        {eventViewData.map((_, index) => (
          <Fragment key={index}>
            <EventStat icon={_.icon} title={_.title} amount={_.amount} />
          </Fragment>
        ))}
      </div>

      <div className="my-[3em]">
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {table?.map((_, key: number) => {
            return (
              <tr key={key}>
                <td className={TABLE_STYLE}>
                  <div className="flex gap-5 items-center">
                    <div className="w-[3em] h-[3em] bg-gray-500 rounded-md"></div>
                    <div>
                      <h3>{_.name}</h3>
                      <p className="text-second_primary_text">{_.email}</p>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.name}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.gender}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.number}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.date}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <Image
                    src="/images/icons/dashboard/table/more.svg"
                    width={32}
                    height={11}
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>
      </div>
    </div>
  );
};

export default ViewUserEvent;
