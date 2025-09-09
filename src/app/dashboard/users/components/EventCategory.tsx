import { useTQuery } from "@/hooks/api/useTQuery";
import Image from "next/image";
import { useEffect } from "react";

const EventCategory = ({ eventCategoryId }: { eventCategoryId: string }) => {
  const { data }: { data: any } = useTQuery({
    url: "/admin/categories/event_categories",
    queryKey: ["category", "event_categories"],
  });

  const category =
    data?.data?.data?.filter((item: any) => item.id !== eventCategoryId)[0] ||
    [];

  useEffect(() => {
   // console.log(category);
  }, [category]);

  return (
    <div className="flex gap-3 items-center">
      <span className="bg-slate-300 w-[32px] h-[32px] rounded-full overflow-clip">
        <Image
          src={category.image}
          width={32}
          height={32}
          alt={category.name}
        />
      </span>
      <span>{category.name}</span>
    </div>
  );
};

export default EventCategory;
