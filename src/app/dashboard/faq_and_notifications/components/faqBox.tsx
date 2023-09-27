"use client";
import Delete_Circle from "@/app/_components/icons/delete_circle";
import { pencil_edit } from "@/app/_components/icons/pencil_edit_icon";
import React from "react";
import Modal from "@/app/_components/popups/modal";
import { useState } from "react";

const FaqBox = () => {
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
      <div
        className="  py-5 px-3 rounded-md lg: w-[535px]"
        style={{
          border: "1.5px solid #EDEFF5",
        }}
      >
        <div className="flex gap-5 items-center justify-between">
          <h2 className=" font-bold">Use the mobile USB pixel...</h2>
          <div className="flex gap-3 items-center">
            <div onClick={openModal}>{pencil_edit}</div>
            <div onClick={openDeleteModal} className="cursor-pointer">
              <Delete_Circle />
            </div>
          </div>
        </div>
        <p className="my-3 text-second_primary text-other_text">
          Lorem ipsum dolor sit amet consectetur. In placerat scelerisque vitae
          nibh pellentesque. Ultricies sagittis lobortis quam eros sit proin
          neque potenti nisi. Faucibus suspendisse imperdiet sagittis sem ut id
          neque dolor cras. Vitae accumsan cras leo in.
        </p>
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

export default FaqBox;
