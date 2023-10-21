import { Button } from "@/app/_components/button";
import ImageUpload from "@/app/_components/image_upload";
import { useTMutation } from "@/hooks/api/useTMutation";
import React, { useState } from "react";

const NewCategory = ({ isEvent }: { isEvent: boolean }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    white_icon: "",
    black_icon: "Nill",
  });

  const { mutate, isLoading } = useTMutation({
    url: "/category/create/event_category",
    method: "post",
    options: {
      onSuccess: () => {
        window.location.reload();
      },
    },
  });

  const { mutate: mutateBusiness, isLoading: isLoadingEvent } = useTMutation({
    url: "/category/create/business_category",
    method: "post",
    options: {
      onSuccess: () => {
        window.location.reload();
      },
    },
  });

  return (
    <div>
      <h3 className="font-bold">
        Add {isEvent ? "event" : "business"} category
      </h3>

      <div className="form items-left">
        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="title" className="block text-gray-700">
            Category name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter name"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="category-name" className="block text-gray-700 mb-1">
            Upload category image
          </label>

          <ImageUpload
            onDone={(image: string) => {
              setData({ ...data, image });
            }}
            id="normalImage"
          />
        </div>

        <div className="form-group mt-5 flex flex-col items-start">
          <label htmlFor="category-name" className="block text-gray-700 mb-1">
            Upload white image
          </label>

          <ImageUpload
            onDone={(image: string) => {
              setData({ ...data, white_icon: image });
            }}
            id="white_icon"
          />
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button
          isLoading={isLoading || isLoadingEvent}
          onClick={() => {
            isEvent ? mutate(data) : mutateBusiness(data);
          }}
        >
          Add Category
        </Button>

        <Button
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewCategory;
