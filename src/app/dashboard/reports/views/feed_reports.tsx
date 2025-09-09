"use client";

import DashboardAction from "@/app/_components/dashboard/dashboardAction";
import Modal from "@/app/_components/popups/modal";
import { Spinner } from "@/app/_components/spinner/Spinner";
import DefaultTable from "@/app/_components/table/defaultTable";
import TablePagination from "@/app/_components/table/tablePagination";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import moment from "moment";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import UserDetails from "../components/user_details";

const header = [
  // "Fullname Name ",
  "Title",
  "Reasons",
  "Image",
  "Date Reported",
  "Actions",
];
const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const FeedsReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();

  const openModal = (data: any) => {
    setSelected(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePaginatedQuery({
      url: "/admin/reports/for-admin?type=feed",
      queryKey: ["reports", "feed-report"],
      enabled: true,
    });

  const reports = data?.pages?.map((e: any) => e.data.data).flat() as any[];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {reports?.map((_: any, key: number) => {
          return (
            <tr key={key} className="text-sm">
              {/* <td className={style}>
                <div className="flex gap-5 items-center">
                  <div className="w-[3em] h-[3em] bg-gray-500 rounded-full"></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className="text-second_primary_text">{_.email}</p>
                  </div>
                </div>
              </td> */}
              <td className={style}>
                <h3>{_.title}</h3>
              </td>
              <td className={style}>
                <h3>{_.description}</h3>
              </td>
              <td className={style}>
                <h3 className="">
                  {_?.imageUrl ? (
                    <a href={_?.imageUrl}  target="_blank" className="hover:underline text-blue-500 cursor-pointer flex gap-2 items-center">Open Image <FaExternalLinkAlt/></a>
                  ) : (
                    <div className="bg-orange-300/20 border border-orange-400 text-orange-500 p-2 rounded-lg text-sm">
                      No Image Submitted
                    </div>
                  )}
                </h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                <div className="w-10 h-10">
                  <img
                    src="/images/icons/dashboard/table/more.svg"
                    className="w-8 h-9"
                    alt=""
                    onClick={() => openModal(_)}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserDetails  data={selected} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default FeedsReport;
