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
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

const header = ["Venue ", "User", "Location", "Type", "Date Created", ""];

const style = "px-6 py-4 whitespace-no-wrap border-b border-gray-300";
const PendingVenues = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const client = useQueryClient();

  const { data } = useTQuery({
    url: "/venue/for-admin?status=pending&page=1&limit=10",
    queryKey: ["venues", "pending-venues"],
  });

  // @ts-ignore
  const venue = data?.data?.data;

  const { isLoading, mutate } = useTMutation({
    url: "/venue/admin/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["venues"]);
      },
    },
  });

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
                <h3 className="w-[300px]">{_.address}</h3>
              </td>
              <td className={style}>
                <h3>{_?.type}</h3>
              </td>
              <td className={style}>
                <h3>{moment(_?.createdAt).format("MMM DD YYYY")}</h3>
              </td>
              <td className={style}>
                <div>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <div className="flex items-center justify-space-around">
                      <button
                        onClick={() => {
                          mutate({ eventId: _?.id, status: "approved" });
                        }}
                      >
                        <Image
                          src="/images/icons/dashboard/table/tick.svg"
                          width={80}
                          height={80}
                          alt=""
                        />
                      </button>

                      <button
                        onClick={() => {
                          mutate({ eventId: _?.id, status: "rejected" });
                        }}
                      >
                        <div className="w-10 h-10">
                          <img
                            src="/images/icons/dashboard/table/more.svg"
                            className="w-8 h-8"
                            alt=""
                            onClick={openModal}
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
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

export default PendingVenues;
