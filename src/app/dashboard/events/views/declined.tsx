"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { useDeclinedEvents, useUpdateEventStatus } from "@/hooks/api/v2/events";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import ViewInformation from "../components/EventDetails";

const header = ["Business Name ", "User", "Category", "Date", ""];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const DeclinedEvents = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingEvents,
    isFetchingNextPage,
  } = useDeclinedEvents();
  const events = data?.pages?.map((e: any) => e.data.data).flat() as any[];
  const { isLoading, mutate } = useUpdateEventStatus();

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {isLoadingEvents && <Spinner />}
        {events?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em]">
                    <img
                      src={_?.image}
                      className="w-[3em] h-[3em] relative bg-gray-500 rounded-full object-cover"
                    ></img>
                  </div>
                  <div>
                    <h3>{_.name}</h3>
                  </div>
                </div>
              </td>
              <td className={style}>
                <Link href={`/dashboard/users/${_?.user?.id}`}>
                  <h3 className="underline">{_?.user?.username}</h3>
                </Link>
              </td>
              <td className={style}>
                <h3>{_?.eventCategory?.name}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.startTime).format("MMM DD YYYY")}</h3>
              </td>
              <td className={`whitespace-no-wrap border-b border-gray-300`}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex items-center justify-space-around">
                    <button
                      onClick={() => {
                        mutate({ eventId: _?.id, status: "approved" });
                      }}
                    >
                      <div className="w-20 h-20">
                        <img
                          src="/images/icons/dashboard/table/tick.svg"
                          className="w-ful h-full object-contain"
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </DefaultTable>

      {hasNextPage && (
        <TablePagination
          onFetchMore={fetchNextPage}
          loading={isFetchingNextPage}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ViewInformation />
      </Modal>
    </div>
  );
};

export default DeclinedEvents;
