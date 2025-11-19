"use client";
import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import DefaultTable from "@/app/_components/table/defaultTable";
import NoData from "@/app/_components/table/NoData";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import moment from "moment";
import { useState } from "react";
import Image from "../../../../../node_modules/next/image";
import VenueDetails from "../../users/components/user/venue_details";

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
      url: "/admin/venues/for-admin?status=rejected&page=1&limit=10",
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
                    <div className="flex gap-2">
                      <div className="flex overflow-hidden w-[3em] h-[3em] bg-gray-500 rounded-lg">
                        <Image
                          src={_?.avatar}
                          className="w-[100%] h-[100%] object-fit"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm whitespace-nowrap">{_.name}</h3>
                        <u className="text-xs text-gray-400">
                          @{_.user.username}
                        </u>
                      </div>
                    </div>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_.address}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="whitespace-nowrap text-sm">
                      {_?.packages?.length} Packages
                    </h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">{_?.totalRatings}</h3>
                  </td>
                  <td className={style}>
                    <h3 className="text-sm">
                      {moment(_?.createdAt).format("MMM DD YYYY")}
                    </h3>
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
