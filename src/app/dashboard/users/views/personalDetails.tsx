import moment from "moment";
import React from "react";

const PersonalDetails = ({ user }: { user: any }) => {
  console.log(user)
  return (
    <>
      <div>
        <div className="flex gap-[8em] items-center my-[4em]">
          <div className="flex flex-col gap-[3em]">
            <h4 className="text-[#5D6D73]">Full name</h4>
            <h4 className="text-[#5D6D73]">Username</h4>
            <h4 className="text-[#5D6D73]">Phone number</h4>
            <h4 className="text-[#5D6D73]">Email address</h4>
            <h4 className="text-[#5D6D73]">Gender</h4>
            <h4 className="text-[#5D6D73]">Date of Birth</h4>
            <h4 className="text-[#5D6D73]">Last Active</h4>
            <h4 className="text-[#5D6D73]">Date Joined</h4>
          </div>

          <div className="flex flex-col gap-[3em]">
            <h4 className="text-black">{(user?.firstName + " " + user?.lastName).length > 1 ? (user?.firstName + " " + user?.lastName) : "N/A"}</h4>
            <h4 className="text-black">{user?.username}</h4>
            <h4 className="text-black">{user?.phone ?? "N/A"}</h4>
            <h4 className="text-black">{user?.email}</h4>
            <h4 className="text-black">{user?.gender ?? "N/A"}</h4>
            <h4 className="text-black">
              {moment(user?.dob).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black">
              {moment(user?.last_login).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black">
              {moment(user?.createdAt).format("MMM DD YYYY")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
