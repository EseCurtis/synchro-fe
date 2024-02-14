import { Button } from "@/app/_components/button";
import React, { useState } from "react";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import Link from "next/link";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import { Spinner } from "@/app/_components/spinner/Spinner";
import SuspendUser from "../../users/components/suspendUser";

const UserDetails = ({ data, onClose }: any) => {
  const [suspendIsOpen, setSuspendIsOpen] = useState<boolean>(false);
  const { data: userDetails, isLoading } = useTQuery({
    url: `/user/admin/users/${data.userId}`,
    queryKey: ["users", String(data.userId)],
  });

  const { data: reporterDetails, isLoading: reporterIsLoading }: any =
    useTQuery({
      url: `/user/admin/users/${data.reportableId}`,
      queryKey: ["users", String(data.reportableId)],
    });

  // @ts-ignore
  const user = userDetails?.data;
  const reporter = reporterDetails?.data;

  return (
    <>
      {suspendIsOpen ? (
        <SuspendUser user={user} onClose={() => setSuspendIsOpen(false)} />
      ) : isLoading && reporterIsLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-center">
            <h3 className="font-bold">Details of report</h3>
          </div>
          <div className="text-center my-5">
            <div className="  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full"></div>

            <div>
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-[#777E90] text-[13px]">{user?.username}</p>
            </div>
            {/* Replace the id with the user id from databse here */}
            <Link href={"/dashboard/users/" + user?.id}>
              <div className="bg-gray-300 text-[13px] cursor-pointer w-[fit-content] py-[.6em] my-[1em] rounded-full px-5 mx-auto ">
                View full profile
              </div>
            </Link>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <h4 className="text-[#5D6D73] text-sm">Phone number</h4>
              <h4 className="text-[#5D6D73] text-sm">Email Address</h4>
              <h4 className="text-[#5D6D73] text-sm">Total followers</h4>
              <h4 className="text-[#5D6D73] text-sm">Reasons for Report</h4>
              <h4 className="text-[#5D6D73] text-sm">Reported by</h4>
              <h4 className="text-[#5D6D73] text-sm">Date Reported</h4>
            </div>

            <div className="flex flex-col gap-5 text-right">
              <h4 className="text-black text-sm font-bold">
                {user?.phone ?? "N/A"}
              </h4>
              <h4 className="text-black text-sm font-bold">
                {user?.email ?? "N/A"}
              </h4>
              <h4 className="text-black text-sm font-bold">
                {user?.followerCount ?? "0"} users
              </h4>
              <h4 className="text-black text-sm font-bold">
                {user?.suspendReason ?? "N/A"}
              </h4>
              <h4 className="text-black text-sm font-bold">
                {reporter?.username ?? "N/A"}
              </h4>
              <h4 className="text-black text-sm font-bold">
                {moment(data?.createdAt).format("h:mma, MMMM Do, YYYY")}
              </h4>
            </div>
          </div>
          <div className="mt-7 flex gap-4 items-center">
            <Button onClick={() => setSuspendIsOpen(true)}>Suspend</Button>
            <SecondaryButton onClick={onClose}>Resolve</SecondaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
