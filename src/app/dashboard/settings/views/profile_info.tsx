"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import moment from "moment";
import React from "react";

const ProfileInfo = () => {
  const { user } = useAuthContext();

  console.log(user)

  return (
    <div>
      <img
        src={user?.profileImage}
        className="rounded-full w-[80px] h-[80px] bg-gray-500 object-cover"
      ></img>
      <div className="my-3">
        <h3 className=" font-bold">{user?.name ?? user?.username}</h3>
        <p className=" text-text_primary">{user?.email}</p>
      </div>

      <div className="my-10">
        <h4>Basic Information</h4>

        <div className="my-5 mt-10 flex gap-[8em]">
          <div className="flex flex-col gap-8">
            <h4 className="text-[#5D6D73]">Full name</h4>
            <h4 className="text-[#5D6D73]">Email address</h4>
            <h4 className="text-[#5D6D73]">Role</h4>
            <h4 className="text-[#5D6D73]">Date added</h4>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-black font-bold">
              {user?.name ?? user?.username}
            </h4>
            <h4 className="text-black font-bold">{user?.email}</h4>
            <h4 className="text-black font-bold capitalize">
              {user?.userRole}
            </h4>
            <h4 className="text-black font-bold">
              {moment(user?.createdAt).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black font-bold"> </h4>
          </div>
        </div>

        <div className="my-10 font">
          <h3 className="font-bold">Last updated: 11:32pm, May 3rd, 2021</h3>
          <p className="text-[#1B72E7]">Change password</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
