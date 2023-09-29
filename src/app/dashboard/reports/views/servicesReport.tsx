"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState, Fragment } from "react";
import Image from "../../../../../node_modules/next/image";
import Dropdown from "@/app/_components/popups/dropDown";
import Modal from "@/app/_components/popups/modal";
import UserDetails from "../components/service_details";

const header = [
  "Event Title  ",
  "Location",
  "Reasons",
  "Resolved By",
  "Date Resolved",
];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ServicesReports = () => {
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
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-md"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>{_.name}</h3>
              </td>
              <td className={style}>
                <h3>{_.gender}</h3>
              </td>
              <td className={style}>
                <h3>{_.number}</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={style}>
                <Image
                  src="/images/icons/dashboard/table/more.svg"
                  width={31}
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
        <UserDetails />
      </Modal>
    </div>
  );
};

export default ServicesReports;
