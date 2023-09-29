import { Button } from "@/app/_components/button";
import ImageUpload from "@/app/_components/image_upload";
import React from "react";

const NewCategory = () => {
  return (
    <div>
      <h3 className="font-bold">Add business category</h3>

      <div className="form items-left">
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Category name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter name"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5 flex flex-col items-start">
        <label htmlFor="category-name" className="block text-gray-700 mb-1">
            Upload category image
          </label>
          <ImageUpload />
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Add Faq</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewCategory;
