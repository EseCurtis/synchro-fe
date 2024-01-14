"use client";
import NoNotifications from "@/app/_components/no_data/no_notification";
import React, { Fragment, useState } from "react";
import NotificationBox from "../components/notificationBox";
import Modal from "@/app/_components/popups/modal";
import { Button } from "@/app/_components/button";
import NewNotification from "../components/new_notification";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import TablePagination from "@/app/_components/table/tablePagination";

const Notifications = () => {
  const [view, setView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    isLoading,
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePaginatedQuery({
    url: "/notification/for-admin",
    queryKey: ["notifications"],
    enabled: true,
  });

  const notifications = data?.pages
    ?.map((e: any) => e.data.data)
    .flat() as any[];

  return (
    <div>
      {notifications?.length < 1 ? (
        <NoNotifications onOpen={openModal} />
      ) : (
        <div>
          <div className="flex justify-between my-10 items-center">
            <h2 className="font-bold">All push notifications</h2>

            <div>
              <Button
                className="py-2 px-3 rounded-full font-semi-bold text-white"
                onClick={openModal}
              >
                Send Notification
              </Button>
            </div>
          </div>
          <div className="flex gap-[2em] flex-col">
            {notifications?.map((_, key) => (
              <Fragment key={key}>
                <NotificationBox item={_} />
              </Fragment>
            ))}

            <TablePagination
              loading={isFetchingNextPage}
              onFetchMore={fetchNextPage}
            />
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NewNotification
          refresh={() => {
            refetch();
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default Notifications;
