import { Button } from "@/app/_components/button";
import React from "react";

const NewRole = () => {
  return (
    <div>
      <h3 className="font-bold">Add role</h3>

      <div className="form items-left">
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Role Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="body" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="body"
            placeholder="Enter Description"
            rows={3}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-300 focus:border-indigo-300 resize-none"
          ></textarea>
        </div>

        <div className="max-w-md mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Select Options</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option1"
                value="option1"
              />
              <span className="text-gray-700">Option 1</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option2"
                value="option2"
              />
              <span className="text-gray-700">Option 2</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option3"
                value="option3"
              />
              <span className="text-gray-700">Option 3</span>
            </label>
          </div>
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Add Role</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default NewRole;
