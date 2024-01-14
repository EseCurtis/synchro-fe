"use client";

import React, { Fragment, useEffect } from "react";
import UserStat from "../components/userStat";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import EventStat from "../components/userEventStat";
import { eventViewData } from "../contents";
import { useState } from "react";
import Modal from "@/app/_components/popups/modal";
import EventDetails from "../components/user/event_details";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useParams } from "next/navigation";
import TablePagination from "@/app/_components/table/tablePagination";

const header = [
  "Event title",
  "Category",
  "Location",
  "Event Date",
  "",
];

const ViewUserEvent = () => {
  const params = useParams();
  const id = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  }: any = usePaginatedQuery({
    url: `event/user/${id}`,
    queryKey: [],
    enabled: true,
  });

  const events = data?.pages
    ?.map((e: any) => e.data.data)
    .flat() as any[];

    useEffect(() => {
      console.log(events);
    }, []);

  return (
    <div>
      <div className="flex gap-5 my-[4em] flex-wrap">
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
          {events?.map((_, key: number) => {
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
                    onClick={openModal}
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>

        {events?.length > 0 ? (
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        ) : (
          <p className="pt-4 text-center">No data to display</p>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EventDetails />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserEvent;
