import Badge from "@/app/_components/forms/badge";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const MembersView = ({ user }: { user: any }) => {
  const params = useParams();
  const id = params.id;

  const userDetails: any = useTQuery({
    url: `/user/${id}`,
    queryKey: ["user", "business", String(id)],
  }).data;

  const userData = userDetails?.data;
  const business = userData?.business;

  return (
    business && (
      <>
        <div>
          <div className="flex">
            <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#FDF8F6] border border-[#E9A084] rounded-full overflow-hidden p-5">
              <Image
                src={userData?.profileImage}
                alt={userData?.firstname}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex gap-[8em] my-[4em]">
            <div className="flex flex-col gap-[3em]">
              <h4 className="text-[#5D6D73]">Business name</h4>
              <h4 className="text-[#5D6D73]">Business phone number</h4>
              <h4 className="text-[#5D6D73]">Business email</h4>
              <h4 className="text-[#5D6D73]">Website</h4>
              <h4 className="text-[#5D6D73]">Description</h4>
              <h4 className="text-[#5D6D73]">KYC status</h4>
              {/* <h4 className="text-[#5D6D73]">KYC</h4> */}
            </div>

            <div className="flex flex-col gap-[3em]">
              <h4 className="text-black">{business.name ?? "N/A"}</h4>
              <h4 className="text-black">{business.phone ?? "N/A"}</h4>
              <h4 className="text-black">{business.email ?? "N/A"}</h4>
              <h4 className="text-black">{business.website ?? "N/A"}</h4>
              <h4 className="text-black">{business.description ?? "N/A"}</h4>
              <h4 className="text-black">
                <Badge status={"Active"} label="Approved" />
              </h4>
              {/* 
            <h4 className="text-black">
              {moment(userDetails?.last_login).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black">
              {moment(userDetails?.createdAt).format("MMM DD YYYY")}
            </h4> */}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MembersView;
