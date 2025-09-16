import FilterComponent from "@/app/_components/forms/filterComponent";
import Input from "@/app/_components/input_fields";
import { useTQuery } from "@/hooks/api/useTQuery";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const Item = ({ userId }: { userId: string }) => {
  const { data: userDetails }: { data: any } = useTQuery({
    url: `/admin/users/${userId}`,
    queryKey: ["users", String(userId)],
  });

  const userInfo = userDetails?.data;

  return (userInfo &&
    <div className="flex gap-3 w-[100%]">
      <div className="w-[55px] h-[55px] bg-gray-300 rounded-full overflow-clip">
        <Image src={userInfo?.profileImage} width={55} height={55} alt={userInfo?.firstName} />
      </div>
      <div className="flex flex-col justify-center">
        <h4>{userInfo.firstName} {userInfo?.lastName}</h4>
        <p className="text-gray-400"> {userInfo?.lastName} </p>
      </div>
      <div className="h-[100%] ml-auto mr-[0] flex items-center">
        <FaArrowRight />
      </div>
    </div>
  );
};

const Guests = ({ data }: { data: any }) => {
  const guests = data?.guests || [];
  return (
    <div>
      <h1 className="flex text-left gap-2 mb-3 mt-7">
        Guests{" "}
        <span className="bg-green-200/50 text-green-400 p-1 py-1 rounded text-sm">
          {guests.length}
        </span>
      </h1>

      {guests.length > 0 ? (
        <>
          <div className="flex items-center">
            <Input
              name="search"
              type="search"
              placeholder="Search for anything..."
              style={{
                width: "100%",
                border: "1px solid #EEE",
              }}
            />
            <FilterComponent />
          </div>

          <div className="grid gap-4 px-3">
            {guests.map((_: any, index: any) => (
              <Item key={index} userId={_} />
            ))}

            <div className="text-center mt-7">
              <h3 className="w-[auto] font-bold p-3 px-2 cursor-pointer rounded border border-gray-300">
                All Caught Up
              </h3>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center flex items-center justify-center p-3">
          <span className="font-semibold text-gray-500/40">No Reviews Yet</span>
        </div>
      )}
    </div>
  );
};

export default Guests;
