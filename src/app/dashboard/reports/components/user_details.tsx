import { Button } from "@/app/_components/button";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import Badge from "@/app/_components/forms/badge";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTQuery } from "@/hooks/api/useTQuery";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { useResolveReport } from "@/v2/hooks/api/use-report";
import { ReportV2 } from "@/v2/types/reports.type";
import { BusinessProfile } from "@/v2/types/service.types";
import { ProfileStats, UserData } from "@/v2/types/user.types";
import moment from "moment";
import { useState } from "react";
import LinkWithProgress from "../../../_components/ui/LinkWithProgress";
import SuspendUser from "../../users/components/suspendUser";

const UserDetails = ({
  data,
  onClose,
}: {
  data: ReportV2;
  onClose: () => void;
}) => {
  const [suspendIsOpen, setSuspendIsOpen] = useState<boolean>(false);
  const user = data?.reportedEntity as UserData;
  const reporter = data?.reporter;
  const userProfile = user?.profiles?.[0];
  const reporterProfile = reporter?.profiles?.[0];

  const { data: prodileStatData } = useTQuery({
    queryKey: [],
    url: `profiles/${userProfile?.id}/stats`,
    enabled: !!userProfile?.id,
  });

  const { mutate, isPending } = useResolveReport(data?.id);

  const profileStats = (prodileStatData as any)?.data as ProfileStats;
  const isResolved = data.status == "resolved";

  return (
    <>
      {suspendIsOpen ? (
        <SuspendUser
          user={{
            ...user?.profiles?.[0],
            user: {
              ...user,
              profiles: [],
            },
          } as any as BusinessProfile}
          onClose={() => {
            setSuspendIsOpen(false);
            mutate(
              {},
              {
                onSuccess() {
                  onClose();
                },
              }
            );
          }}
        />
      ) : (
        <div>
          <div className="flex justify-center">
            <h3 className="font-bold">Details of report</h3>
          </div>
          <div className="text-center my-5">
            <div className="overflow-clip  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full">
              <UserAvatarV2 user={user} />
            </div>

            <div>
              <h3>
                {userProfile?.firstName} {userProfile?.lastName}
              </h3>
              <p className="text-[#777E90] text-[13px]">
                {userProfile?.username}
              </p>
            </div>
            {/* Replace the id with the user id from databse here */}
            <LinkWithProgress href={"/dashboard/users/" + user?.id}>
              <div className="bg-gray-300 text-[13px] cursor-pointer w-[fit-content] py-[.6em] my-[1em] rounded-full px-5 mx-auto ">
                View full profile
              </div>
            </LinkWithProgress>
          </div>

          <table className="border-collapse [&_td]:text-xs [&_td]:text-left w-full mx-auto  [&_td:second-child]:text-xs ">
            <tbody>
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Phone number
                </td>
                <td className="px-4 py-2 !text-right">
                  {user?.phoneNumber ?? "N/A"}
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
                  {profileStats?.followersCount ?? "0"} users
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
                  {reporterProfile?.firstName ?? "Anonymous User"}
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
              <tr>
                <td className="px-4 py-2 !whitespace-nowrap flex font-bold">
                  Status
                </td>
                <td className="px-4 py-2 !text-right">
                  <div className="flex justify-end">
                    <Badge status={data.status} label={data.status} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {!isResolved && (
            <div className="mt-7 flex gap-4 items-center">
              <Button onClick={() => setSuspendIsOpen(true)}>Suspend</Button>
              <SecondaryButton
                onClick={() => {
                  mutate(
                    {},
                    {
                      onSuccess() {
                        onClose();
                      },
                    }
                  );
                }}
              >
                {isPending ? <Spinner /> : "Resolve"}
              </SecondaryButton>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;
