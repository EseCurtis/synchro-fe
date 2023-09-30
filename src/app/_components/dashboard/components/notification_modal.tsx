//@ts-nocheck
import React, { Fragment, useState, useEffect, useRef } from "react";
import NoNotifications from "./no_notifications";
import NotificationItem from "./notification_item";
import { BiBell } from "react-icons/bi";

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(true);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    const timeoutId = setTimeout(() => {
      setView(false);
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const closeModal_Effect = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        setView(true);
      }
    };

    document.addEventListener("click", closeModal_Effect);

    return () => {
      document.removeEventListener("click", closeModal_Effect);
    };
  }, [modalRef]);

  return (
    <>
      <div
        ref={modalRef}
        onClick={openModal}
        className="relative bg-gray-100 w-[3em] h-[3em] flex items-center justify-center rounded-full"
      >
        <BiBell size={"24px"} />

        {isModalOpen && (
          <div
            className={`z-50 absolute bg-white w-[400px] h-[300px] top-[100%] right-[-20px] rounded-[15px] drop-shadow-lg border`}
          >
            <div className="w-[100%] h-[100%] p-[15px] relative">
              <span className="absolute bg-white rounded rotate-45 w-5 h-5 top-[-10px] right-[35px] border-t border-l"></span>

              <div className="flex items-center justify-center h-[100%] ">
                {!view ? (
                  <div className="flex flex-col gap-4 w-[100%] h-[100%]">
                    {[1, 2, 3, 1].map((i, j) => (
                      <Fragment key={j}>
                        <NotificationItem />
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <NoNotifications />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationModal;
