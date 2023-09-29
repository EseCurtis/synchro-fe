import { Button } from "@/app/_components/button";
import React from "react";

const NewMember = () => {
  return (
    <div>
      <h3 className="font-bold">Add member</h3>

      <div className="form items-left">
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Name"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Email Address"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Select role
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Add Member</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewMember;
