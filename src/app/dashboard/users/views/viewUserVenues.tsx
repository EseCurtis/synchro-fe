"use client";

import React, { Fragment, useEffect } from "react";
import UserStat from "../components/userStat";
import DefaultTable from "@/app/_components/table/defaultTable";
import { TABLE_STYLE } from "@/constant";
import { table } from "@/utils/contents/dummy/table";
import Image from "next/image";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import EventStat from "../components/userEventStat";
import { venueViewData } from "../contents";
import { useState } from "react";
import Modal from "@/app/_components/popups/modal";
import VenueDetails from "../components/user/venue_details";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useParams } from "next/navigation";
import Badge from "@/app/_components/forms/badge";
import moment from "moment";
import TablePagination from "@/app/_components/table/tablePagination";
import ModalTabButton from "@/app/_components/button/modalTabButton";
import { TStringIndexObject } from "@/utils/types";
import NoData from "@/app/_components/table/NoData";
import {
  bookedValueIcon,
  bookedVenueIcon,
  totalVenueIcon,
  venueCreatedIcon,
} from "@/app/_components/icons/preview/venuesStatIcon";
import BookedVenues from "./VenueTables/BookedVenues";
import CreatedVenues from "./VenueTables/CreatedVenues";

const header = ["Venue", "Location", "Price", "Status", "Date"];

const ViewUserVenues = () => {
  const params = useParams();
  const id = params.id;

  const bookedVenues: any = usePaginatedQuery({
    url: `booking/accepted/${id}?type=venue`,
    queryKey: ["booked-venues", String(id)],
    enabled: true,
  });

  const createdVenues: any = usePaginatedQuery({
    url: `venue/user?userId=${id}`,
    queryKey: ["venues", String(id)],
    enabled: true,
  });

  const tabDatas: TStringIndexObject = {
    "Booked venues": {
      response: bookedVenues,
      tableRow: BookedVenues,
      data: bookedVenues?.data?.pages
        ?.map((e: any) => e.data.data)
        .flat() as any[],
      noData: {
        title: "No venues booked",
        description:
          "This user hasn't booked any venues yet. Once they book venues, the information will be displayed here...",
      },
    },
    "Created venues": {
      response: createdVenues,
      data: [],
      noData: {
        title: "No venues created",
        description:
          "This user hasn't created any venues yet. Once they create venues, the information will be displayed here...",
      },
    },
  };

  const venueViewData = [
    {
      title: "Booked Venues",
      icon: bookedVenueIcon,
      amount: tabDatas["Booked venues"]?.data?.length,
    },
    {
      title: "Total Booked Value",
      icon: bookedValueIcon,
      amount: 240,
    },

    {
      title: "Venues Created",
      icon: venueCreatedIcon,
      amount: 1,
    },
    {
      title: "Total venue income",
      icon: totalVenueIcon,
      amount: 200,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [activeTab, setActiveTab] = useState("");
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
  }, [activeTab]);

  useEffect(() => {
    setActiveTab("");
  }, [])

  // useEffect(() => {
  //   console.log(activeTabData);
  // }, [activeTabData]);

  return (
    <div>
      <div className="flex gap-5 my-[4em] flex-wrap">
        {venueViewData.map((_, index) => (
          <Fragment key={index}>
            <EventStat icon={_.icon} title={_.title} amount={_.amount} />
          </Fragment>
        ))}
      </div>

      <div className="my-[3em]">
        <div className="flex gap-3">
          {["Booked venues", "Created venues"].map((_: any, i) => (
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

        {activeTabData?.data?.length > 0 ? (
          <>
            <DashboardAction />
            {/* @ts-ignore */}
            <DefaultTable header={header}>
              {activeTabData?.data?.map((venue: any, key: number) => {
                

                return <Fragment key={key}>
                  {activeTabData?.tableRow({
                    venue,
                    openModal,
                  }) || (
                    <CreatedVenues
                      venue={venue}
                      openModal={openModal}
                    />
                  )}
                </Fragment>;
              })}
            </DefaultTable>
            <TablePagination
              loading={activeTabData.response.isFetchingNextPage}
              onFetchMore={activeTabData.response.fetchNextPage}
            />
          </>
        ) : (
          <NoData {...activeTabData?.noData} />
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <VenueDetails data={selectedData} />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserVenues;
