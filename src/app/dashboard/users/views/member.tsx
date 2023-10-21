import { useTQuery } from "@/hooks/api/useTQuery";
import { useParams } from "next/navigation";
import React from "react";

const MembersView = () => {
  const params = useParams();
  const id = params.id;

  const { data: userDetails } = useTQuery({
    url: `/user/admin/users/${id}`,
    queryKey: ["users", String(id)],
  });

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
            <h4 className="text-black">Ese Curtis</h4>
            <h4 className="text-black">Louisa Walachi</h4>
            <h4 className="text-black">08012345678</h4>
            <h4 className="text-black">Jessica.hanson@example.com</h4>
            <h4 className="text-black">Male</h4>
            <h4 className="text-black">25rd December 2007</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersView;
