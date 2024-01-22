"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { table } from "@/utils/contents/dummy/table";
import React, { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Modal from "@/app/_components/popups/modal";
import VenueDetails from "../../users/components/user/venue_details";
import { useTQuery } from "@/hooks/api/useTQuery";
import Link from "next/link";
import moment from "moment";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import NoData from "@/app/_components/table/NoData";

const header = [
  "Venue ",
  "Location",
  "Price",
  "Total Earned",
  "Date Created",
  "Actions",
];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const DeclinedVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const openModal = (data: any) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/venue/for-admin?status=rejected&page=1&limit=10",
      queryKey: ["venues", "rejected-venues"],
      enabled: true,
    });

  const venues = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  return (
    <div>
      {venues?.length > 0 ? (
        <>
          <DashboardAction />
          {/* @ts-ignore */}
          <DefaultTable header={header}>
            {venues?.map((_: any, key: number) => {
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
                    <div className="w-10 h-10">
                      <img
                        src="/images/icons/dashboard/table/more.svg"
                        className="w-8 h-8"
                        alt=""
                        onClick={openModal}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </DefaultTable>
          <TablePagination
            loading={isFetchingNextPage}
            onFetchMore={fetchNextPage}
          />
        </>
      ) : (
        <NoData/>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VenueDetails data={selectedData} />
      </Modal>
    </div>
  );
};

export default DeclinedVenues;
