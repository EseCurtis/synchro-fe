import { UserData } from "@/v2/types/user.types";
import moment from "moment";

const PersonalDetails = ({ user }: { user: UserData }) => {
  const profile = user?.profiles?.[0];
  const fullName =`${profile?.firstName} ${profile?.lastName}`;
  const displayFullName = fullName && fullName.length > 1 ? fullName : "N/A";

  return (
    <>
      <div>
        <div className="flex gap-[8em] items-center my-[4em]">
          <div className="flex flex-col gap-[3em]">
            <h4 className="text-[#5D6D73]">Full names</h4>
            <h4 className="text-[#5D6D73]">Username</h4>
            <h4 className="text-[#5D6D73]">Phone number</h4>
            <h4 className="text-[#5D6D73]">Email address</h4>
            <h4 className="text-[#5D6D73]">Gender</h4>
            <h4 className="text-[#5D6D73]">Date of Birth</h4>
            <h4 className="text-[#5D6D73]">Last Active</h4>
            <h4 className="text-[#5D6D73]">Date Joined</h4>
          </div>

          <div className="flex flex-col gap-[3em]">
            <h4 className="text-black">
              {displayFullName}
            </h4>
            <h4 className="text-black">{profile?.username}</h4>
            <h4 className="text-black">{user?.phoneNumber ?? "N/A"}</h4>
            <h4 className="text-black">{user?.email}</h4>
            <h4 className="text-black">{user?.gender ?? "N/A"}</h4>
            <h4 className="text-black">
              {user?.dateOfBirth ? moment(user?.dateOfBirth).format("MMM DD YYYY") : "N/A"}
            </h4>
            <h4 className="text-black">
              {user?.lastLoginAt ? moment(user?.lastLoginAt).format("MMM DD YYYY") : "N/A"}
            </h4>
            <h4 className="text-black">
              {moment(user?.createdAt).format("MMM DD YYYY")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
