"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import { useState } from "react";
import UserDetails from "../components/venue_details";

const header = [
  "Event Title  ",
  "Location",
  "Reasons",
  "Reported",
  "Event Time",
];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const VenuesReport = () => {
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
                <img
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

export default VenuesReport;
