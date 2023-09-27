import React from "react";

const ProfileInfo = () => {
  return (
    <div>
      <div className="rounded-full w-[80px] h-[80px] bg-gray-500"></div>
      <div className="my-3">
        <h3 className=" font-bold">Barbara Haley II</h3>
        <p className=" text-text_primary">Greyson_Crooks22@hotmail.com</p>
      </div>

      <div className="my-10">
        <h4>Basic Information</h4>

        <div className="my-5 flex gap-[6em]">
          <div className="flex flex-col gap-6">
            <h4 className="text-[#5D6D73]">Full name</h4>
            <h4 className="text-[#5D6D73]">Email address</h4>
            <h4 className="text-[#5D6D73]">Role</h4>
            <h4 className="text-[#5D6D73]">Date added</h4>
            <h4 className="text-[#5D6D73]">Password</h4>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-black font-bold">Full name</h4>
            <h4 className="text-black font-bold">Email address</h4>
            <h4 className="text-black font-bold">Role</h4>
            <h4 className="text-black font-bold">Date added</h4>
            <h4 className="text-black font-bold">**********</h4>
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
