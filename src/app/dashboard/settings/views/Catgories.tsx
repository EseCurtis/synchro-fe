"use client";
import Modal from "@/app/_components/popups/modal";
import { Button } from "@/app/_components/button";
import React, { Fragment } from "react";
import CategoriesBox from "../components/categoryBox";
import { categoryDetails } from "../content";
import { useState } from "react";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const styles = {
    border: "1px solid #E2E8F0",
  };
  return (
    <>
      <div className="block px-5 mb-10">
        <Button className="mr-auto px-5 py-2 text-white rounded-full font-bold">
          Event Category
        </Button>
        <button className="mr-auto px-5 py-2 text-black border border-gray-300 rounded-full font-bold ml-2">
          Business Category
        </button>
      </div>
      <div className="flex px-5 mb-7">
        <h4 className="font-bold">List of categories (12)</h4>
      </div>
      <div className="flex gap-5 flex-wrap">
        {categoryDetails.map((_, key) => (
          <Fragment key={key}>
            <CategoriesBox title={_.title} icon={_.icon} />
          </Fragment>
        ))}

        <div
          className=" cursor-pointer w-[300px] px-5 rounded-md flex justify-space-between"
          style={styles}
          onClick={openModal}
        >
          <div className="flex gap-3 items-center">
            <div className="flex align-center text-gray-400 bg-gray-200 px-[6px] py-[0px] rounded-full">
              {" "}
              +{" "}
            </div>
            <p className="text-[14px] text-gray-500">
              click here to add a new category
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        Add New Categories modal
        <p>Let your styling go here bro</p>
      </Modal>
    </>
  );
};

export default Categories;
