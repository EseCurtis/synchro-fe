"use client";

import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { Spinner } from "@/app/_components/spinner/Spinner";
import { useTMutation } from "@/hooks/api/useTMutation";
import { FeeConfiguration } from "@/v2/types/fee.types";
import { toast } from "react-toastify";

type Props = {
  fee: FeeConfiguration;
  onClose?: () => void;
};

export default function DeleteFee({ fee, onClose }: Props) {
  const { mutate, isLoading } = useTMutation({
    url: `/admin/settings/fees/${fee.id}`,
    method: "delete",
  });

  const handleDelete = () => {
    mutate(fee.id, {
      onSuccess: () => {
        toast(<AppToast>Fee removed</AppToast>, { type: "success" });
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Unable to delete fee configuration";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    });
  };

  return (
    <div className="space-y-4 min-w-[320px]">
      <h3 className="font-bold text-lg">Delete fee configuration</h3>
      <p>
        Are you sure you want to delete “<b>{fee.name}</b>”? This action cannot
        be undone.
      </p>
      <div className="flex gap-3">
        <Button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Delete"}
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
}
