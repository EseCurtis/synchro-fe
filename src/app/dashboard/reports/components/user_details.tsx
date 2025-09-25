import { Button } from "@/app/_components/button";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTQuery } from "@/hooks/api/useTQuery";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
            <div className="overflow-clip  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full">
              <Image
                src={user?.profileImage}
                width={100}
                height={100}
                alt={user?.firstName}
              />
            </div>

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

          <table className="border-collapse [&_td]:text-xs [&_td]:text-left  [&_td:second-child]:text-xs ">
            <tbody>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Phone number
                </td>
                <td className="px-4 py-2 !text-right">
                  {user?.phone ?? "N/A"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Email Address
                </td>
                <td className="px-4 py-2 !text-right">
                  {user?.email ?? "N/A"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Total followers
                </td>
                <td className="px-4 py-2 !text-right">
                  {user?.followerCount ?? "0"} users
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Reasons for Report
                </td>
                <td className="px-4 py-2 !text-right">
                  {data?.description ?? "N/A"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Reported by
                </td>
                <td className="px-4 py-2 !text-right">
                  {reporter?.firstname ?? "Anonymous User"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Date Reported
                </td>
                <td className="px-4 py-2 !text-right">
                  {moment(data?.createdAt).format("h:mma, MMMM Do, YYYY")}
                </td>
              </tr>
            </tbody>
          </table>

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
