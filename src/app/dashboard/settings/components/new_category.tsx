import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

type NewCategoryProps = {
  isEvent: boolean;
  onClose?: () => void;
};

const NewCategory = ({ isEvent, onClose }: NewCategoryProps) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    white_icon: "",
    black_icon: "Nill",
  });

  const client = useQueryClient();
  const resetForm = () =>
    setData({
      name: "",
      description: "",
      image: "",
      white_icon: "",
      black_icon: "Nill",
    });

  const { mutate, isLoading } = useTMutation({
    url: "/admin/categories/create/event_category",
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "event-category"]);
        toast(<AppToast>Event category created</AppToast>, { type: "success" });
        resetForm();
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Unable to create event category. Please try again.";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    },
  });

  const { mutate: mutateBusiness, isLoading: isLoadingEvent } = useTMutation({
    url: "/admin/categories/create/business_category",
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "business-category"]);
        toast(<AppToast>Business category created</AppToast>, {
          type: "success",
        });
        resetForm();
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Unable to create business category. Please try again.";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    },
  });

  const isSubmitting = isEvent ? isLoading : isLoadingEvent;
  const canSubmit = useMemo(() => data.name.trim().length > 0, [data.name]);

  const handleSubmit = () => {
    if (!canSubmit) {
      toast(<AppToast>Category name is required</AppToast>, { type: "error" });
      return;
    }
    const payload = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim() || data.name.trim(),
    };
    if (isEvent) {
      mutate(payload);
    } else {
      mutateBusiness(payload);
    }
  };

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

          <imgUpload
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

          <imgUpload
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
            handleSubmit();
          }}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Category"}
        </Button>

        <Button
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewCategory;
