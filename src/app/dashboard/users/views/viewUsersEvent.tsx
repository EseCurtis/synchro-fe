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
import EventCategory from "../components/EventCategory";
import ModalTabButton from "@/app/_components/button/modalTabButton";
import { TStringIndexObject } from "@/utils/types";
import NoData from "@/app/_components/table/NoData";

const header = ["Event title", "Category", "Location", "Event Date", ""];

const ViewUserEvent = () => {
  const params = useParams();
  const id = params.id;

  const eventsCreated: any = usePaginatedQuery({
    url: `event/user/${id}`,
    queryKey: [],
    enabled: true,
  });

  const otherEvents: any = usePaginatedQuery({
    url: `event/user/${id}`,
    queryKey: [],
    enabled: true,
  });

  const tickets: any = usePaginatedQuery({
    url: `event/user/${id}`,
    queryKey: [],
    enabled: true,
  });

  const tabDatas: TStringIndexObject = {
    "Events Created": {
      response: eventsCreated,
      data: eventsCreated?.data?.pages
        ?.map((e: any) => e.data.data)
        .flat() as any[],
      noData: {
        title: "No events created",
        description:
          "This user hasn't created any events yet. Once they create events, the information will be displayed here...",
      },
    },
    "Other Events": {
      response: otherEvents,
      data: [],
      noData: {
        title: "No other events",
        description:
          "There are no other events available for this user at the moment.",
      },
    },
    Tickets: {
      response: tickets,
      data: [],
      noData: {
        title: "No tickets bought",
        description:
          "This user don’t haven’t gotten a ticket yet, if they do, it will show here...",
      },
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [activeTab, setActiveTab] = useState("Events Created");
  const [activeTabData, setActiveTabData] = useState<any>(tabDatas[activeTab]);

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveTabData(tabDatas[activeTab]);
    console.log(activeTabData);
  }, [activeTab]);

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
        <div className="flex gap-3">
          {["Events Created", "Other Events", "Tickets"].map((_: any, i) => (
            <Fragment key={i}>
              <ModalTabButton
                label={_}
                isActive={activeTab == _}
                customClass="px-[20px!important]"
                onClick={() => {
                  setActiveTab(_);
                }}
              />
            </Fragment>
          ))}
        </div>
        {activeTabData?.data?.length > 0 && (
          <>
            <DashboardAction />
            <DefaultTable header={header as []}>
              {activeTabData?.data?.map((_: any, key: number) => {
                return (
                  <tr key={key}>
                    <td className={TABLE_STYLE}>
                      <div className="flex gap-5 items-center">
                        <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
                          <Image
                            src={_.image}
                            width={140}
                            height={100}
                            alt="lll"
                          />
                        </div>
                        <div>
                          <h3>{_.name}</h3>
                          <p className="text-second_primary_text"></p>
                        </div>
                      </div>
                    </td>
                    <td className={TABLE_STYLE}>
                      <h3>
                        <EventCategory eventCategoryId={_.eventCategoryId} />
                      </h3>
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
          </>
        )}

        {activeTabData?.data?.length > 0 ? (
          <TablePagination
            loading={activeTabData.response.isFetchingNextPage}
            onFetchMore={activeTabData.response.fetchNextPage}
          />
        ) : (
          <NoData {...activeTabData?.noData} />
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EventDetails event={selectedData} />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserEvent;
