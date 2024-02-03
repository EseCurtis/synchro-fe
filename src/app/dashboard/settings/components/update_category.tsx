import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import ImageUpload from "@/app/_components/image_upload";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateCategory = ({ isEvent, category, categoryType, onClose }: any) => {
  const [data, setData] = useState({
    name: category.name,
    description: category.description,
    image: category.image,
    white_icon: category?.white_icon,
    black_icon: "Nill",
  });

  const client = useQueryClient();

  const { mutate, isLoading } = useTMutation({
    url: `/category/event_categories/update/${category.id}`,
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "event-category"]);
        onClose();
        toast(<AppToast>Category Updated</AppToast>, {
          type: "success",
          autoClose: 1000,
        });
      },
    },
  });

  const { mutate: mutateBusiness, isLoading: isLoadingEvent } = useTMutation({
    url: `/category/business_categories/update/${category.id}`,
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "business-category"]);
        onClose();
        toast(<AppToast>Category Updated</AppToast>, {
          type: "success",
          autoClose: 1000,
        });
      },
      
      onError() {
        //onClose();
      },
    },
  });

  return (
    <div>
      <h3 className="font-bold">
        Update {isEvent ? "event" : "business"} category
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
            defaultImage={data.image}
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
            defaultImage={data.white_icon}
            id="white_icon"
          />
        </div>
      </div>

      <div className=" mt-5 flex gap-4 items-center">
        <Button
          isLoading={isLoading || isLoadingEvent}
          onClick={() => {
            isEvent ? mutate({update: data}) : mutateBusiness({update: data});
          }}
        >
          Update Category
          
        </Button>

        <Button
          onClick={onClose}
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UpdateCategory;
