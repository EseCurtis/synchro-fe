"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState, Fragment } from "react";
import Image from "../../../../../node_modules/next/image";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import UserDetails from "../components/user_details";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Spinner } from "@/app/_components/spinner/Spinner";

const header = [
  // "Fullname Name ",
  "Title",
  "Reasons",
  "Image",
  "Date Reported",
  "",
];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const EventsReports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/report/for-admin?type=event",
      queryKey: ["reports", "event-report"],
      enabled: true,
    });

  const reports = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {reports?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              {/* <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td> */}
              <td className={style}>
                <h3>{_.title}</h3>
              </td>
              <td className={style}>
                <h3>{_.description}</h3>
              </td>
              <td className={style}>
                <h3 className="underline">
                  <a href={_?.imageUrl}>Open Image</a>
                </h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                <div className="w-10 h-10">
                  <img
                    src="/images/icons/dashboard/table/more.svg"
                    className="w-8 h-9"
                    alt=""
                    onClick={openModal}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </DefaultTable>

      <TablePagination
        loading={isFetchingNextPage}
        onFetchMore={fetchNextPage}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserDetails />
      </Modal>
    </div>
  );
};

export default EventsReports;
