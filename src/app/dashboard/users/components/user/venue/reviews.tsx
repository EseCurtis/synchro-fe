import FilterComponent from "@/app/_components/forms/filterComponent";
import Input from "@/app/_components/input_fields";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Review } from "@/utils/types";
import { BiSolidStar } from "react-icons/bi";

const Item = ({}: Review) => {
  return (
    <div className="flex gap-3 mt-4 pb-3 border-b border-gray-200">
      <div className="w-[15%] flex">
        <div className="w-[48px] h-[48px] bg-gray-400 rounded-full"></div>
      </div>
      <div className="w-[85%] grid gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm">Francesca20</p>

          <div className="flex items-center gap-4">
            <div className="text-sm flex gap-2 items-center">
              <i className="text-yellow-400">
                <BiSolidStar />
              </i>
              <b>4.0</b>
            </div>

            <span className="text-sm text-gray-400">1 hour ago</span>
          </div>
        </div>
        <div>
          <p className="text-sm">
            Aut sunt tempore eligendi. Eum corrupti voluptatem et qui excepturi
            officia. Debitis quae voluptates dolorum tempora laborum blanditiis
            ut fugiat.
          </p>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ venue }: { venue: any }) => {
  const reviewsResponse: any = usePaginatedQuery({
    url: `/admin/users/${venue.userId}/reviews?type=venue&venueId=${venue.id}`,
    queryKey: ["review", "venue", String(venue.id)],
    enabled: true,
  });
  const reviews: Review[] =
    (reviewsResponse?.data?.pages
      ?.map((e: any) => e.data.data)
      .flat() as any[]) ||
    [];

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
