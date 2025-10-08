"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserAvatarV2 } from "@/v2/components/common/avatar.component";
import moment from "moment";

const ProfileInfo = () => {
  const { user } = useAuthContext();

  const profile = user?.profiles?.[0];

  return (
    <div>
      <div className="rounded-full w-[80px] h-[80px] bg-gray-500 object-cover">
        <UserAvatarV2 user={user!} />
      </div>
      <div className="my-3">
        <h3 className=" font-bold">
          {profile?.firstName ?? profile?.username} {profile?.lastName}
        </h3>
        <p className=" text-text_primary">{user?.email}</p>
      </div>

      <div className="my-10">
        <h4>Basic Information</h4>

        <div className="my-5 mt-10 flex gap-[8em]">
          <div className="flex flex-col gap-8">
            <h4 className="text-[#5D6D73]">Full name</h4>
            <h4 className="text-[#5D6D73]">Email address</h4>
            <h4 className="text-[#5D6D73]">Role</h4>
            <h4 className="text-[#5D6D73]">Date added</h4>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-black font-bold">
              {profile?.firstName ?? profile?.username} {profile?.lastName}
            </h4>
            <h4 className="text-black font-bold">{user?.email}</h4>
            <h4 className="text-black font-bold capitalize">{user?.role}</h4>
            <h4 className="text-black font-bold">
              {moment(user?.createdAt).format("MMM DD YYYY")}
            </h4>
            <h4 className="text-black font-bold"> </h4>
          </div>
        </div>

        <div className="my-10 font">
          <h3 className="font-bold">Last updated: {user?.updatedAt}</h3>
          <p className="text-[#1B72E7]">Change password</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
