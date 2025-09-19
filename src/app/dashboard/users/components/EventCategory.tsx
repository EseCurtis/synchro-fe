import { useTQuery } from "@/hooks/api/useTQuery";
import { generateRandomColor } from "@/v2/helpers/common.helpers";
import { Category } from "@/v2/types/event.types";
import Image from "next/image";

const EventCategory = ({
  eventCategoryId,
  categoryData,
}: {
  eventCategoryId?: string;
  categoryData?: Category;
}) => {
  const { data }: { data: any } = useTQuery({
    url: "/admin/categories/event_categories",
    queryKey: ["category", "event_categories"],
    enabled: !categoryData && !!eventCategoryId,
  });

  const category =
    categoryData ||
    ((data?.data?.data?.filter((item: any) => item.id !== eventCategoryId)[0] ||
      []) as Category);

  const categoryColor = generateRandomColor([category.id]);

  return (
    <div className="flex gap-3 items-center">
      <span
        style={{ backgroundColor: categoryColor }}
        className="bg-slate-300 w-[32px] h-[32px] rounded-full overflow-clip p-2"
      >
        <Image
          src={category.icon}
          width={32}
          height={32}
          className="w-full h-full object-cover opacity-50"
          alt={category.name}
        />
      </span>
      <span className="text-sm">{category.name}</span>
    </div>
  );
};

export default EventCategory;
