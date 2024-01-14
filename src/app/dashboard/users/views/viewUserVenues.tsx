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

const header = ["Venue", "Location", "Price", "Status", "Date"];

const ViewUserVenues = () => {
  const params = useParams();
  const id = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const { data, fetchNextPage, isFetchingNextPage }: any = usePaginatedQuery({
    url: `venue/user?userId=${id}`,
    queryKey: ["venues", String(id)],
    enabled: true,
  });

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const venues = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  useEffect(() => {
    console.log(venues);
  }, [venues]);

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
        <DashboardAction />
        {/* @ts-ignore */}
        <DefaultTable header={header}>
          {venues?.map((venue, key: number) => {
            const formattedDateRanges = venue.hours.map((hour: any) => {
              const parsedHour = JSON.parse(hour);
              const startDate = moment(parsedHour.times[0].from);
              const endDate = moment(
                parsedHour.times[parsedHour.times.length - 1].to
              );
              return `${startDate.format("MMMM Do")} - ${endDate.format(
                "Do, YYYY"
              )}`;
            });

            return (
              <tr key={key}>
                <td className={TABLE_STYLE}>
                  <div className="flex gap-5 items-center">
                    <div className="w-[5em] h-[3em] flex items-center justify-center bg-gray-500 rounded-md overflow-clip">
                      <Image src={JSON.parse(venue.images[0])["url"]} width={140} height={100} alt="lll"/>
                    </div>
                    <div>
                      <h3>{venue.name}</h3>
                      <p className="text-second_primary_text ">{venue.user.username}</p>
                    </div>
                  </div>
                </td>
                <td className={TABLE_STYLE}>
                  <h3 className="text-[14px]">{venue.address}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3 className="text-[14px]">${venue.hourlyRate}/hr</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3 className="text-[14px]">
                    <Badge
                      label={venue.status}
                      status={
                        venue.status === "approved" ? "Active" : "Inactive"
                      }
                      
                    />
                  </h3>
                </td>
                <td className={TABLE_STYLE}>
                  <h3 className="text-[14px]">{formattedDateRanges[1]}</h3>
                </td>
                <td className={TABLE_STYLE}>
                  <Image
                    src="/images/icons/dashboard/table/more.svg"
                    width={32}
                    height={11}
                    alt=""
                    onClick={() => openModal(venue)}
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>
        {venues?.length > 0 ? (
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        ) : (
          <p className="pt-4 text-center">No data to display</p>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <VenueDetails data={selectedData} />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserVenues;
