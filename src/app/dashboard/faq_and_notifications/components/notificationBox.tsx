"use client";
import Delete_Circle from "@/app/_components/icons/delete_circle";
import React from "react";
import { useState } from "react";
import { pencil_edit } from "@/app/_components/icons/pencil_edit_icon";
import Modal from "@/app/_components/popups/modal";

const notificationIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0302 1.66797H9.97074C7.16312 1.66797 4.58887 3.7051 4.33912 6.4021C4.32247 6.59503 4.31111 6.79218 4.30378 7.00456L4.29352 7.50109L4.29149 7.94626L4.30402 7.89552C4.18816 8.46051 3.92112 8.98458 3.53053 9.41279L3.47455 9.4848C3.14011 9.99284 2.94795 10.5809 2.91821 11.1881L2.9175 11.3867C2.90043 12.1853 3.1741 12.9756 3.68894 13.6032C4.38711 14.3404 5.29088 14.7801 6.26088 14.8734C8.74174 15.1429 11.2517 15.1429 13.7395 14.8727C14.7029 14.7841 15.6094 14.343 16.2783 13.6331C16.7833 13.0289 17.059 12.3038 17.0826 11.553L17.0834 11.2169C17.0558 10.583 16.8624 9.99437 16.5239 9.48853L16.4725 9.42252L16.3469 9.27481C16.0647 8.92234 15.8587 8.51632 15.7414 8.08204L15.7043 7.92611L15.6966 7.76258C15.6943 7.68903 15.6931 7.60747 15.6928 7.5056L15.6927 6.94469C15.6907 6.73012 15.6844 6.57754 15.6696 6.40577C15.4113 3.70368 12.8363 1.66797 10.0302 1.66797ZM9.97069 2.83008H10.0301C12.2781 2.83008 14.3287 4.45125 14.5257 6.51167C14.5373 6.64694 14.5425 6.77599 14.544 6.9677L14.5463 7.72157C14.5488 7.84214 14.5535 7.94239 14.5616 8.05521L14.5724 8.13244L14.6265 8.36226C14.7867 8.97021 15.0745 9.53736 15.4706 10.0263L15.5855 10.1611L15.5728 10.1399C15.7926 10.4683 15.9178 10.8494 15.9352 11.2424L15.9347 11.3786C15.9479 11.9253 15.7667 12.4448 15.4237 12.8562C14.9705 13.3356 14.3226 13.6508 13.6262 13.715C11.2106 13.9772 8.78277 13.9772 6.37644 13.7159C5.67239 13.6481 5.02405 13.3327 4.54478 12.8282C4.23409 12.447 4.05477 11.9292 4.06603 11.3985L4.06616 11.2162L4.08072 11.0575C4.11578 10.7919 4.20453 10.5227 4.34208 10.2749L4.41183 10.1594C4.9232 9.58426 5.27414 8.8849 5.42871 8.13118L5.4407 8.01301L5.44614 7.24695L5.45952 6.85828C5.46559 6.73568 5.47336 6.61919 5.4831 6.50627C5.6734 4.45134 7.72213 2.83008 9.97069 2.83008ZM4.41183 10.1594C4.39947 10.1733 4.387 10.1872 4.37445 10.2009L4.4155 10.1533L4.41183 10.1594ZM12.1734 16.41C11.9262 16.2087 11.5647 16.2484 11.3659 16.4986C11.2797 16.607 11.1799 16.7043 11.0689 16.788C10.6924 17.0833 10.2225 17.2148 9.75542 17.1592C9.289 17.1036 8.86502 16.8662 8.57734 16.5007C8.37968 16.2496 8.01833 16.2082 7.77023 16.4083C7.52214 16.6084 7.48125 16.9741 7.67891 17.2253C8.15593 17.8313 8.8549 18.2227 9.62117 18.314C10.3868 18.4052 11.1577 18.1895 11.764 17.7137C11.944 17.578 12.1139 17.4124 12.2609 17.2274C12.4597 16.9772 12.4205 16.6113 12.1734 16.41Z"
      fill="url(#paint0_radial_3009_64354)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_3009_64354"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(2.91675 8.52861) rotate(30.6304) scale(19.2465 165.128)"
      >
        <stop stop-color="#E73C01" />
        <stop offset="0.697917" stop-color="#0512D2" />
      </radialGradient>
    </defs>
  </svg>
);

const NotificationBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //functions to handle dele modal
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="bg-[#E9A0848F] ring-2 ring-red-500  p-[.5em] rounded-full flex w-[fit-content] h-[fit-content]">
            {notificationIcon}
          </div>
          <div>
            <h3 className="">Notification</h3>
            <p className="text-other_text">
              Lorem ipsum dolor sit amet consectetur. Massa amet viverra ut at
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-[20px]">
          <p className="text-other_text">1 Aug</p>
          <div className="flex gap-5 items-center">
            <div onClick={openModal}>{pencil_edit}</div>
            <div onClick={openDeleteModal} className="cursor-pointer">
              <Delete_Circle />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        Edit Content Modal
      </Modal>
      {/* Modal to delet item */}
      <Modal isOpen={isDeleteModal} onClose={closeDeleteModal}>
        Delete Modal
      </Modal>
    </>
  );
};

export default NotificationBox;
