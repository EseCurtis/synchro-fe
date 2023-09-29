import { Button } from "@/app/_components/button";
import React from "react";

const NewNotification = () => {
  return (
    <div>
      <h3 className="font-bold">Send push notifications</h3>

      <div className="form">
        <div className="form-group mt-5">
          <label htmlFor="notificationType" className="block text-gray-700">
            Channel
          </label>
          <div className="mt-2 grid grid-cols-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="notificationType"
                value="push"
              />
              <span className="ml-2">Push notification</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="notificationType"
                value="email"
              />
              <span className="ml-2">Email notification</span>
            </label>
          </div>
        </div>
        <div className="form-group mt-5">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter name"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group mt-5">
          <label htmlFor="body" className="block text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            placeholder="Enter body text"
            rows={7}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-300 focus:border-indigo-300 resize-none"
          ></textarea>
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button>Send Notification</Button>
        <Button style={{ background: "white", color: "red" }} customClassName="text-red-500 border border-2 border-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewNotification;
