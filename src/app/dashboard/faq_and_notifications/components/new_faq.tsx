import { Button } from "@/app/_components/button";
import React from "react";

const NewFaq = () => {
  return (
    <div>
      <h3 className="font-bold">Add FAQ</h3>

      <div className="form items-left">
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            FAQ Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter name"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="body" className="block text-gray-700">
            FAQ Answer
          </label>
          <textarea
            id="body"
            placeholder="Enter FAQ Answer"
            rows={7}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-300 focus:border-indigo-300 resize-none"
          ></textarea>
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Add Faq</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default NewFaq;
