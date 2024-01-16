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
import moment from "moment";

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
  const [selectedData, setSelectedData] = useState({});

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
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

    // useEffect(() => {
    //   console.log(events);
    // }, []);

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
                  <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
                      <Image src={_.image} width={140} height={100} alt="lll"/>
                    </div>
                    <div>
                      <h3>{_.name}</h3>
                      <p className="text-second_primary_text">
                      
                      </p>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.name}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{_.location}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3>{moment(_.date).format("MMM DD YYYY h:m:s")}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <Image
                    src="/images/icons/dashboard/table/more.svg"
                    width={32}
                    height={11}
                    alt=""
                    onClick={() => openModal(_)}
                    className="cursor-pointer"
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
          <EventDetails event={selectedData}/>
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserEvent;
