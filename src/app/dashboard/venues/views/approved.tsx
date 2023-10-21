"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Modal from "@/app/_components/popups/modal";
import VenueDetails from "../components/venue_details";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import Link from "next/link";

const header = ["Venue ", "User", "Location", "Type", "Date Created", ""];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const ApprovedVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data } = useTQuery({
    url: "/venue/for-admin?status=approved&page=1&limit=10",
    queryKey: ["venues", "approved-venues"],
  });

  // @ts-ignore
  const venue = data?.data?.data;

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {venue?.map((_: any, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <h3>{_.name}</h3>
              </td>
              <td className={style}>
                <Link href={`/dashboard/users/${_?.user?.id}`}>
                  <h3 className="underline">{_?.user?.username}</h3>
                </Link>
              </td>
              <td className={style}>
                <h3>{_.address}</h3>
              </td>
              <td className={style}>
                <h3>{_?.type}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                <Image
                  src="/images/icons/dashboard/table/more.svg"
                  width={34}
                  height={30}
                  alt=""
                  onClick={openModal}
                />
              </td>
            </tr>
          );
        })}
      </DefaultTable>

      {venue?.length > 0 ? (
        <TablePagination />
      ) : (
        <p className="pt-4 text-center">No data to display</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VenueDetails />
      </Modal>
    </div>
  );
};

export default ApprovedVenues;
