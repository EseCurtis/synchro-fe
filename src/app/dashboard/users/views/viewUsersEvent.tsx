"use client";

import ModalTabButton from "@/app/_components/button/modalTabButton";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import {
  eventTotalTicketIcon,
  titcketValueIcon,
} from "@/app/_components/icons/preview/eventsStatIcons";
import { userFollowersIcon } from "@/app/_components/icons/preview/usersStatIcon";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import EventDetails from "../components/user/event_details";
import TicketDetails from "../components/user/ticket_details";
import EventStat from "../components/userEventStat";
import EventsCreated from "./EventTables/EventsCreated";
import Tickets from "./EventTables/Tickets";

const header = ["Event title", "Category", "Location", "Event Date", ""];

const ViewUserEvent = () => {
  const params = useParams();
  const id = params.id;

  const eventsCreated: any = usePaginatedQuery({
    url: `/admin/users/${id}/events`,
    queryKey: ["user-events", String(id)],
    enabled: true,
  });

  const otherEvents: any = usePaginatedQuery({
    url: `/admin/users/${id}/events`,
    queryKey: ["user-events-other", String(id)],
    enabled: true,
  });

  const tickets: any = usePaginatedQuery({
    url: `/admin/users/${id}/tickets`,
    queryKey: ["ticket", String(id)],
    enabled: true,
  });

  interface NoData {
    title: string;
    description: string;
  }

  interface TabData {
    response: any;
    data: any[];
    noData: NoData;
    total?: number;
    totalBought?: number;
    header?: string[];
    tableRow?: any;
    modalDetails?: any;
  }

  const getFlatData = (response: any): any[] =>
    (response?.data?.pages?.map((e: any) => e.data.data).flat() || []).filter(Boolean);

  const calculateTotalBought = (tickets: any[]): number =>
    tickets
      .map((ticket: any) => parseFloat(ticket?.eventTicket.price) || 0)
      .reduce(
        (accumulator: number, currentPrice: number) =>
          accumulator + currentPrice,
        0
      );

  const tabDatas: Record<string, TabData> = {
    "Events Created": {
      response: eventsCreated,
      data: getFlatData(eventsCreated),
      noData: {
        title: "No events created",
        description:
          "This user hasn't created any events yet. Once they create events, the information will be displayed here...",
      },
    },
    "Other Events": {
      response: otherEvents,
      data: getFlatData(otherEvents),
      noData: {
        title: "No other events",
        description:
          "There are no other events available for this user at the moment.",
      },
    },
    Tickets: {
      response: tickets,
      data: getFlatData(tickets),
      total: getFlatData(tickets).length,
      totalBought: calculateTotalBought(getFlatData(tickets)),
      header: ["Event Title", "Ticket Bought", "Ticket Value", "Event Date"],
      tableRow: Tickets,
      modalDetails: TicketDetails,
      noData: {
        title: "No tickets bought",
        description:
          "This user hasn't bought any tickets yet. If they do, it will show here...",
      },
    },
  };


  console.log(tabDatas["Events Created"].data)

  const eventViewData = [
    {
      title: "Invited Events",
      icon: userFollowersIcon,
      amount: tabDatas["Events Created"].data.length,
    },
    {
      title: "Events Attended",
      icon: userFollowersIcon,
      amount: 0,
    },
    {
      title: "Tickets Bought",
      icon: eventTotalTicketIcon,
      amount: tabDatas["Tickets"].data.length,
    },
    {
      title: "Total Tickets Values",
      icon: titcketValueIcon,
      amount: `$${tabDatas["Tickets"].totalBought}`,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("");
  const [activeTabData, setActiveTabData] = useState<any>();

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActiveTabData(tabDatas[activeTab]);
    //console.log("Tickets:",tickets?.data?.pages?.map((e: any) => e.data).flat());
    //console.log(tabDatas[activeTab],activeTabData);
  }, [activeTab]);

  useEffect(() => {
    //setActiveTab("Events Created");
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
            <DefaultTable header={(activeTabData.header || header) as []}>
              {activeTabData?.data?.map((_: any, key: number) => {
                const tableRowProps = { openModal, _ };
                console.log(activeTabData);
                return (
                  <Fragment key={key}>
                    {(activeTabData?.tableRow &&
                      activeTabData?.tableRow(tableRowProps)) ||
                      EventsCreated(tableRowProps)}
                  </Fragment>
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
          {activeTabData?.modalDetails ? (
            activeTabData.modalDetails({
              data: selectedData,
              openEvent: () => {
                setSelectedData(selectedData?.eventTicket?.event);
                setActiveTab("Events Created");
              },
            })
          ) : (
            <EventDetails event={selectedData} />
          )}
        </Modal>

        <div className="hidden">
          <TicketDetails data={tabDatas["Tickets"].data[0]} />
        </div>
      </div>
    </div>
  );
};

export default ViewUserEvent;
