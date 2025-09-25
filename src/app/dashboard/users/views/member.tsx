import Badge from "@/app/_components/forms/badge";
import { useTQuery } from "@/hooks/api/useTQuery";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { UserData } from "@/v2/types/user.types";
import { useParams } from "next/navigation";

const MembersView = ({ user }: { user: UserData }) => {
  const params = useParams();
  const id = params.id;

  const userDetails: any = useTQuery({
    url: `/user/${id}`,
    queryKey: ["user", "business", String(id)],
    enabled: !user && !!id,
  }).data;

  const userData = (userDetails?.data || user) as UserData;
  const business = userData?.profiles?.[0];

  return (
    business && (
      <>
        <div>
          <div className="flex">
            <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#FDF8F6] border border-[#E9A084] rounded-full overflow-hidden p-5">
              <UserAvatarV2 user={user} />
            </div>
          </div>
          <div className="flex gap-[8em] my-[4em]">
            <div className="flex flex-col gap-[3em]">
              <h4 className="text-[#5D6D73]">Business name</h4>
              <h4 className="text-[#5D6D73]">Business phone number</h4>
              <h4 className="text-[#5D6D73]">Business email</h4>
              <h4 className="text-[#5D6D73]">Business category</h4>
              <h4 className="text-[#5D6D73]">Description</h4>
              <h4 className="text-[#5D6D73]">KYC status</h4>
              {/* <h4 className="text-[#5D6D73]">KYC</h4> */}
            </div>

            <div className="flex flex-col gap-[3em]">
              <h4 className="text-black">{business.businessName ?? "N/A"}</h4>
              <h4 className="text-black">{user.phoneNumber ?? "N/A"}</h4>
              <h4 className="text-black">{user.email ?? "N/A"}</h4>
              <h4 className="text-black">
                {business.businessCategory?.name ?? "N/A"}
              </h4>
              <h4 className="text-black">
                {business.businessDescription ?? "N/A"}
              </h4>
              <h4 className="text-black">
                <Badge status={business.status} label={business.status} />
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
