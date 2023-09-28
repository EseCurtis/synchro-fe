"use client";
import React, { FC, ReactNode } from "react";
import Delete_Circle from "@/app/_components/icons/delete_circle";
import { pencil_edit } from "@/app/_components/icons/pencil_edit_icon";
import Modal from "@/app/_components/popups/modal";
import { useState } from "react";

interface ICatProps {
  icon: ReactNode;
  title: string;
}

const styles = {
  border: "1px solid #E2E8F0",
};

const CategoriesBox: FC<ICatProps> = ({ icon, title }) => {
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
        className=" w-[300px] px-5 rounded-md flex items-center justify-between"
        style={styles}
      >
        <div className="flex gap-3 items-center">
          <div>{icon}</div>

          <h4>{title}</h4>
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={openModal}>{pencil_edit}</div>
          <div onClick={openDeleteModal}>
            <Delete_Circle />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        Edit Content Modal
      </Modal>
      {/* Modal to delete item */}
      <Modal isOpen={isDeleteModal} onClose={closeDeleteModal}>
        Delete Modal
      </Modal>
    </>
  );
};

export default CategoriesBox;
