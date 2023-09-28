"use client";
import NoNotifications from "@/app/_components/no_data/no_notification";
import React, { Fragment, useState } from "react";
import NotificationBox from "../components/notificationBox";
import Modal from "@/app/_components/popups/modal";
import { Button } from "@/app/_components/button";
import NewNotification from "../components/new_notification";

const Notifications = () => {
  const [view, setView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  setTimeout(() => {
    setView(false);
  }, 3500);
  return (
    <div>
      {view ? (
        <NoNotifications />
      ) : (
        <div>
          <div className="flex justify-between my-10 items-center">
            <h2 className="font-bold">All push notifications</h2>

            <div>
              <Button className="py-2 px-3 rounded-full font-semi-bold text-white" onClick={openModal}>
                Send Notification
              </Button>
            </div>
          </div>
          <div className="flex gap-[2em] flex-col">
            {[1, 2, 3, 4].map((_, key) => (
              <Fragment key={key}>
                <NotificationBox />
              </Fragment>
            ))}
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <NewNotification />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Notifications;
