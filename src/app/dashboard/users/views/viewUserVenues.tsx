"use client";

import React, { Fragment } from "react";
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

const header = [
  "Full Name",
  "Username",
  "Gender",
  "Phone Number",
  "Last Active",
];

const ViewUserVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedData, setSelectedData] = useState({});

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                    onClick={openModal}
                  />
                </td>
              </tr>
            );
          })}
        </DefaultTable>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <VenueDetails data={selectedData} />
        </Modal>
      </div>
    </div>
  );
};

export default ViewUserVenues;
