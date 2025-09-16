import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { SecondaryButton } from "@/app/_components/button/secondaryButton";
import { useTMutation } from "@/hooks/api/useTMutation";
import moment from "moment";
import Link from "next/link";
import { toast } from "react-toastify";

const ViewSuspended = ({ user, onClose }: { user: any; onClose?: any }) => {


  const { mutate, isLoading } = useTMutation({
    url: `/admin/users/unsuspend`,
    method: "post",
    options: {
      onSuccess() {
        toast(<AppToast>User account activated successfully</AppToast>);
      },
    },
  });



  return (
    <div>
      <div className="flex justify-center">
        <h3 className="font-bold">User Details</h3>
      </div>
      <div className="text-center my-5">
        <div className="  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full"></div>

        <div>
          <h3>{user?.name}</h3>
          <p className="text-[#777E90] text-[13px]">@{user?.username}</p>
        </div>
        {/* Replace the id with the user id from databse here */}
        <Link href={`/dashboard/users/${user?.id}`}>
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
          <h4 className="text-[#5D6D73] text-sm">Reasons for suspension</h4>
          {/* <h4 className="text-[#5D6D73] text-sm">Suspended by</h4> */}
          <h4 className="text-[#5D6D73] text-sm">Date Suspended</h4>
        </div>

        <div className="flex flex-col gap-5 text-right">
          <h4 className="text-black text-sm font-bold">
            {user?.phoneNumber ?? "N/A"}
          </h4>
          <h4 className="text-black text-sm font-bold">
            {user?.email ?? "N/A"}
          </h4>
          <h4 className="text-black text-sm font-bold">
            {user?.followerCount ?? 0} users
          </h4>
          <h4 className="text-black text-sm font-bold">
            {user?.suspensionReason ?? "N/A"}
          </h4>
          {/* <h4 className="text-black text-sm font-bold">Ese Curtis</h4> */}
          <h4 className="text-black text-sm font-bold">
            {moment(user?.updatedAt).format("MMM DD YYYY")}
          </h4>
        </div>
      </div>

      <div className="mt-7 flex gap-4 items-center">
        <Button
          isLoading={isLoading}
          onClick={() => mutate({ userId: user.id })}
        >
          Reactivate User
        </Button>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      </div>
    </div>
  );
};

export default ViewSuspended;
