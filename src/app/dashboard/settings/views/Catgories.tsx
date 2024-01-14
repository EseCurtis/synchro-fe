"use client";
import Modal from "@/app/_components/popups/modal";
import { Button } from "@/app/_components/button";
import React, { Fragment } from "react";
import CategoriesBox from "../components/categoryBox";
import { categoryDetails } from "../content";
import { useState } from "react";
import NewCategory from "../components/new_category";
import { useTQuery } from "@/hooks/api/useTQuery";

const activeStyles = {
  background: "var(--primary-bg-gradient)",
  color: "white",
};

const styles = {
  border: "1px solid #E2E8F0",
};

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showingCate, setShowingCate] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data: event_categoriesData } = useTQuery({
    url: "/category/event_categories",
    queryKey: ["category", "event-category"],
  });

  // @ts-ignore
  const event_categories = event_categoriesData?.data?.data;

  const { data: business_categoriesData } = useTQuery({
    url: "/category/business_categories",
    queryKey: ["category", "business-category"],
  });

  // @ts-ignore
  const business_categories = business_categoriesData?.data;

  return (
    <>
      <div className="block mb-10">
        <button
          onClick={() => setShowingCate(0)}
          className="mr-auto px-5 py-2 rounded-full font-bold"
          style={
            showingCate === 0
              ? activeStyles
              : {
                  border: "1px solid #E2E8F0",
                  background: "white",
                  color: "black",
                }
          }
        >
          Event Category
        </button>
        <button
          onClick={() => setShowingCate(1)}
          className="mr-auto px-5 py-2 rounded-full font-bold ml-2"
          style={
            showingCate === 1
              ? activeStyles
              : {
                  border: "1px solid #E2E8F0",
                  background: "white",
                  color: "black",
                }
          }
        >
          Business Category
        </button>
      </div>

      <div className="flex mb-7">
        <h4 className="font-bold">
          List of categories (
          {showingCate === 0
            ? event_categories?.length
            : business_categories?.length}
          )
        </h4>
      </div>

      <div className="flex gap-5 flex-wrap">
        {showingCate === 0 ? (
          <>
            {event_categories?.map((_: any, key: number) => (
              <Fragment key={key}>
                <CategoriesBox title={_?.name} icon={_.image} />
              </Fragment>
            ))}
          </>
        ) : (
          <>
            {business_categories?.map((_: any, key: number) => (
              <Fragment key={key}>
                <CategoriesBox title={_?.name} icon={_.image} />
              </Fragment>
            ))}
          </>
        )}

        <div
          className=" cursor-pointer py-4 px-5 rounded-md flex justify-space-between"
          style={styles}
          onClick={openModal}
        >
          <div className="flex gap-3 items-center">
            <div className="flex align-center text-gray-400 bg-gray-200 px-[6px] py-[0px] rounded-full">
              +
            </div>
            <p className="text-[14px] text-gray-500">
              click here to add a new category
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NewCategory isEvent={showingCate === 0} />
      </Modal>
    </>
  );
};

export default Categories;
