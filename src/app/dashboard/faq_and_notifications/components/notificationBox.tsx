"use client";
import Delete_Circle from "@/app/_components/icons/delete_circle";
import React from "react";
import { useState } from "react";
import { pencil_edit } from "@/app/_components/icons/pencil_edit_icon";
import Modal from "@/app/_components/popups/modal";
import NotificationDetails from "./notification_details";
import moment from "moment";

const notificationIcon = (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="21"
      cy="21"
      r="20"
      fill="#E9A084"
      fill-opacity="0.06"
      stroke="#E9A084"
      stroke-opacity="0.56"
    />
    <path
      fillRule="evenodd"
      clip-rule="evenodd"
      d="M21.0302 12.668H20.9707C18.1631 12.668 15.5889 14.7051 15.3391 17.4021C15.3225 17.595 15.3111 17.7922 15.3038 18.0046L15.2935 18.5011L15.2915 18.9463L15.304 18.8955C15.1882 19.4605 14.9211 19.9846 14.5305 20.4128L14.4746 20.4848C14.1401 20.9928 13.948 21.5809 13.9182 22.1881L13.9175 22.3867C13.9004 23.1853 14.1741 23.9756 14.6889 24.6032C15.3871 25.3404 16.2909 25.7801 17.2609 25.8734C19.7417 26.1429 22.2517 26.1429 24.7395 25.8727C25.7029 25.7841 26.6094 25.343 27.2783 24.6331C27.7833 24.0289 28.059 23.3038 28.0826 22.553L28.0834 22.2169C28.0558 21.583 27.8624 20.9944 27.5239 20.4885L27.4725 20.4225L27.3469 20.2748C27.0647 19.9223 26.8587 19.5163 26.7414 19.082L26.7043 18.9261L26.6966 18.7626C26.6943 18.689 26.6931 18.6075 26.6928 18.5056L26.6927 17.9447C26.6907 17.7301 26.6844 17.5775 26.6696 17.4058C26.4113 14.7037 23.8363 12.668 21.0302 12.668ZM20.9707 13.8301H21.0301C23.2781 13.8301 25.3287 15.4512 25.5257 17.5117C25.5373 17.6469 25.5425 17.776 25.544 17.9677L25.5463 18.7216C25.5488 18.8421 25.5535 18.9424 25.5616 19.0552L25.5724 19.1324L25.6265 19.3623C25.7867 19.9702 26.0745 20.5374 26.4706 21.0263L26.5855 21.1611L26.5728 21.1399C26.7926 21.4683 26.9178 21.8494 26.9352 22.2424L26.9347 22.3786C26.9479 22.9253 26.7667 23.4448 26.4237 23.8562C25.9705 24.3356 25.3226 24.6508 24.6262 24.715C22.2106 24.9772 19.7828 24.9772 17.3764 24.7159C16.6724 24.6481 16.024 24.3327 15.5448 23.8282C15.2341 23.447 15.0548 22.9292 15.066 22.3985L15.0662 22.2162L15.0807 22.0575C15.1158 21.7919 15.2045 21.5227 15.3421 21.2749L15.4118 21.1594C15.9232 20.5843 16.2741 19.8849 16.4287 19.1312L16.4407 19.013L16.4461 18.2469L16.4595 17.8583C16.4656 17.7357 16.4734 17.6192 16.4831 17.5063C16.6734 15.4513 18.7221 13.8301 20.9707 13.8301ZM15.4118 21.1594C15.3995 21.1733 15.387 21.1872 15.3744 21.2009L15.4155 21.1533L15.4118 21.1594ZM23.1734 27.41C22.9262 27.2087 22.5647 27.2484 22.3659 27.4986C22.2797 27.607 22.1799 27.7043 22.0689 27.788C21.6924 28.0833 21.2225 28.2148 20.7554 28.1592C20.289 28.1036 19.865 27.8662 19.5773 27.5007C19.3797 27.2496 19.0183 27.2082 18.7702 27.4083C18.5221 27.6084 18.4813 27.9741 18.6789 28.2253C19.1559 28.8313 19.8549 29.2227 20.6212 29.314C21.3868 29.4052 22.1577 29.1895 22.764 28.7137C22.944 28.578 23.1139 28.4124 23.2609 28.2274C23.4597 27.9772 23.4205 27.6113 23.1734 27.41Z"
      fill="url(#paint0_radial_3009_64352)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_3009_64352"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.9167 19.5286) rotate(30.6304) scale(19.2465 165.128)"
      >
        <stop stop-color="#E73C01" />
        <stop offset="0.697917" stop-color="#0512D2" />
      </radialGradient>
    </defs>
  </svg>
);

const NotificationBox = ({ item }: { item: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [isInfoModal, setInfoModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //functions to handle dele modal
  const openInfoModal = () => {
    setInfoModal(true);
  };

  const closeInfoModal = () => {
    setInfoModal(false);
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
          <div
            className=" rounded-full flex w-[fit-content] h-[fit-content]"
            onClick={openInfoModal}
          >
            {notificationIcon}
          </div>
          <div>
            <h3 className="">{item?.title}</h3>
            <p className="text-other_text">{item?.message}</p>
          </div>
        </div>
        <div className="flex  items-center gap-[20px]">
          <p className="text-other_text">
            {moment(item?.createdAt).format("D MMM, YYYY")}
          </p>
          {/* <div className="flex gap-5 items-center">
            <div onClick={openModal} className="cursor-pointer">{pencil_edit}</div>
            <div onClick={openDeleteModal} className="cursor-pointer">
              <Delete_Circle />
            </div>
          </div> */}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        Edit Content Modal
      </Modal>

      <Modal isOpen={isInfoModal} onClose={closeInfoModal}>
        <NotificationDetails />
      </Modal>

      {/* Modal to delet item */}
      <Modal isOpen={isDeleteModal} onClose={closeDeleteModal}>
        Delete Modal
      </Modal>
    </>
  );
};

export default NotificationBox;
