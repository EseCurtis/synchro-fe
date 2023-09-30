"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Modal from "@/app/_components/popups/modal";
import VenueDetails from "../components/venue_details";

const header = [
  "Venue ",
  "Location",
  "Price",
  "Total Earned",
  "Date Created",
  "",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const DeclinedVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {table?.map((_, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3 className="underline">{_.location}</h3>
              </td>
              <td className={style}>
                <h3>$120</h3>
              </td>
              <td className={style}>
                <h3>$12,452</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={style}>
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
      <TablePagination />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VenueDetails />
      </Modal>
    </div>
  );
};

export default DeclinedVenues;
