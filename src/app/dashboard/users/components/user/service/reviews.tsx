import FilterComponent from "@/app/_components/forms/filterComponent";
import Input from "@/app/_components/input_fields";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Review } from "@/utils/types";
import moment from "moment";
import Image from "next/image";
import { BiSolidStar, BiStar } from "react-icons/bi";

const Item = ({ reviewee, rating, createdAt, content }: Review) => {
  return (
    <div className="flex gap-3 mt-4 pb-3 border-b border-gray-200">
      <div className="w-[15%] flex">
        <div className="w-[48px] h-[48px] bg-gray-400 rounded-full overflow-hidden">
          <Image src={reviewee.profileImage} width={50} height={50} alt={reviewee.username}/>
        </div>
      </div>
      <div className="w-[85%] grid gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm">{reviewee.username}</p>

          <div className="flex items-center gap-2">
            <div className="text-sm flex gap-1 items-center">
              <i className="text-yellow-400">
                <BiSolidStar />
              </i>
              <b>{rating}</b>
            </div>

            <span className="text-xs text-gray-400">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
        <div>
          <p className="text-sm pt-3">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ data: service }: { data: any }) => {
  const reviewsResponse: any = usePaginatedQuery({
    url: `review/?type=service&serviceId=${service.id}`,
    queryKey: ["review", "service", String(service.id)],
    enabled: true,
  });
  const reviews: Review[] =
    (reviewsResponse?.data?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[]) ||
    [];


    console.log(reviews)
  
  return (
    <div>
      <h1 className="flex text-left gap-2 mb-3">
        Reviews{" "}
        <span className="bg-green-200/50 text-green-400 p-1 py-1 rounded text-sm">
          {reviews.length}
        </span>
      </h1>

      {reviews.length > 0 ? (
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
            {reviews.map((_: any, index: any) => (
              <Item key={index} {..._} />
            ))}

            <div className="text-center mt-7">
              <h3 className="w-[auto] font-bold p-3 px-2 cursor-pointer rounded border border-gray-300">
                Load more
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

export default Reviews;
