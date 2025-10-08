import { Button } from "@/app/_components/button";
import Badge from "@/app/_components/forms/badge";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTMutation } from "@/hooks/api/useTMutation";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import { BusinessTypeV2 } from "@/v2/types/user.types";
import moment from "moment";
import { LegalDocItem } from "./legal_doc";

const ViewInformation = ({
  business,
  onClose,
}: {
  business: BusinessTypeV2;
  onClose: any;
}) => {
  const userWithProfile = {
    ...business.user,
    profiles: [
      {
        ...business,
        user: undefined,
      },
    ],
  };

  const { isLoading, mutate } = useTMutation({
    url: "/admin/users/businesses/update-status",
    method: "put",
    options: {
      onSuccess() {},
    },
  });

  return (
    <div className="h-full overflow-y-auto p-5 mt-4 pt-0">
      <div className="text-center my-5">
        <div className="my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full">
          <UserAvatarV2 user={userWithProfile} />
        </div>

        <div>
          <h3>{business?.businessName}</h3>
          <p className="text-[#777E90]">@{business?.username}</p>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex flex-col gap-3">
          <h4 className="text-[#5D6D73]">Phone number</h4>
          <h4 className="text-[#5D6D73]">Full Name</h4>
          <h4 className="text-[#5D6D73]">DOB</h4>
          <h4 className="text-[#5D6D73]">Email</h4>
          <h4 className="text-[#5D6D73]">Category</h4>
          <h4 className="text-[#5D6D73]">Submitted KYC Document</h4>
        </div>

        <div className="flex flex-col gap-3 text-right">
          <h4 className="text-black">{business?.user.phoneNumber}</h4>
          <h4 className="text-black">
            {business?.firstName} {business?.lastName}
          </h4>
          <h4 className="text-black">
            {moment(business?.user?.dateOfBirth).format("MMM DD YYYY")}
          </h4>
          <h4 className="text-black">{business?.user?.email}</h4>
          <h4 className="text-black">{business?.businessCategory?.name}</h4>
          <h4 className="text-blac flex justify-end">
            <Badge status={business?.status as any} />
          </h4>
          {/* <div>
            <Badge status="Active" />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-3">
        <h4 className="font-bold">Business Legal Document</h4>
        <LegalDocItem doc={business?.kycDocument} />
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        {business?.status !== "approved" && (
          <Button
            onClick={() => {
              !isLoading &&
                mutate({
                  userId: userWithProfile?.id,
                  status: "approved",
                });
            }}
          >
            {isLoading ? <Spinner /> : "Activate User"}
          </Button>
        )}
        <Button
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewInformation;
