import { Button } from "@/app/_components/button";
import React from "react";

const NewRole = () => {
  return (
    <div>
      <h3 className="font-bold text-left">Add role</h3>

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

        <div className="mt-5 max-w-md mx-auto">
          <h4 className="font-bold text-left">Select Options</h4>
          <div className="space-y-2 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                name="option1"
                value="option1"
              />
              <span className="text-gray-700">View & manage users</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option2"
                value="option2"
              />
              <span className="text-gray-700">Approve KYC</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option3"
                value="option3"
              />
              <span className="text-gray-700">Create Users & Roles</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                name="option3"
                value="option3"
              />
              <span className="text-gray-700">View Audit Trails</span>
            </label>
          </div>
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Add Role</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewRole;
