import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const MembersView = ({ user }: {user: any}) => {
  const params = useParams();
  const id = params.id;

  const { data: userDetails }: any =  useTQuery({
    url: `/user/admin/users/${id}`,
    queryKey: ["users", String(id)],
  }).data;

  // useEffect(() => {
  //   console.log(userDetails);
  // }, [userDetails]);

  return (
    <>
      <div>
        <div className="flex gap-[8em] my-[4em]">
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
            <h4 className="text-black">{userDetails?.name ?? "N/A"}</h4>
            <h4 className="text-black">{userDetails?.username}</h4>
            <h4 className="text-black">{userDetails?.phone ?? "N/A"}</h4>
            <h4 className="text-black">{userDetails?.email}</h4>
            <h4 className="text-black">{userDetails?.gender ?? "N/A"}</h4>
            <h4 className="text-black">
              {moment(userDetails?.dob).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black">
              {moment(userDetails?.last_login).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black">
              {moment(userDetails?.createdAt).format("MMM DD YYYY")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersView;
