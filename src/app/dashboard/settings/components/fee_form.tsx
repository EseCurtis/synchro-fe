"use client";

import { AppToast } from "@/app/_components/AppToast";
import Input, { Select } from "@/app/_components/input_fields";
import { Button } from "@/app/_components/button";
import { FeeConfiguration } from "@/v2/types/fee.types";

import { Spinner } from "@/app/_components/spinner/Spinner";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useTMutation } from "@/hooks/api/useTMutation";

type FeeFormProps = {
  fee?: FeeConfiguration | null;
  onClose?: () => void;
};

const chargeTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "flat", label: "Flat amount" },
  { value: "hybrid", label: "Percentage + Flat" },
];

export default function FeeForm({ fee, onClose }: FeeFormProps) {
  const [form, setForm] = useState({
    name: fee?.name ?? "",
    code: fee?.code ?? "",
    scope: fee?.scope ?? "global",
    chargeType: fee?.chargeType ?? "percentage",
    percentage:
      fee?.percentage !== undefined && fee?.percentage !== null
        ? Number(fee.percentage)
        : "",
    flatAmount:
      fee?.flatAmount !== undefined && fee?.flatAmount !== null
        ? Number(fee.flatAmount)
        : "",
    currency: fee?.currency ?? "USD",
    isActive: fee?.isActive ?? true,
    description: fee?.description ?? "",
  });

  const { mutate: createFee, isLoading: creating } = useTMutation({
    url: `/admin/settings/fees`,
    method: "post",
  });
  const { mutate: updateFee, isLoading: updating } = useTMutation({
    url: `/admin/settings/fees/${fee?.id}`,
    method: "put",
  });

  const isEditing = Boolean(fee);
  const isSubmitting = creating || updating;

  const canSubmit = useMemo(() => {
    if (!form.name.trim() || !form.code.trim()) {
      return false;
    }

    if (form.chargeType === "percentage" || form.chargeType === "hybrid") {
      if (form.percentage === "" || Number(form.percentage) <= 0) {
        return false;
      }
    }

    if (form.chargeType === "flat" || form.chargeType === "hybrid") {
      if (form.flatAmount === "" || Number(form.flatAmount) < 0) {
        return false;
      }
    }

    return true;
  }, [form]);

  const handleSubmit = () => {
    if (!canSubmit) {
      toast(<AppToast>Fill in all required fields</AppToast>, {
        type: "error",
      });
      return;
    }

    const payload = {
      name: form.name.trim(),
      code: form.code.trim(),
      scope: form.scope.trim() || "global",
      chargeType: form.chargeType as FeeConfiguration["chargeType"],
      percentage: form.percentage === "" ? undefined : Number(form.percentage),
      flatAmount: form.flatAmount === "" ? undefined : Number(form.flatAmount),
      currency: form.currency.trim() || "USD",
      isActive: form.isActive,
      description: form.description.trim() || undefined,
    };

    if (isEditing && fee) {
      updateFee(
        {
          feeId: fee.id,
          payload,
        },
        {
          onSuccess: () => {
            toast(<AppToast>Fee updated</AppToast>, { type: "success" });
            onClose?.();
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              "Failed to update fee configuration";
            toast(<AppToast>{message}</AppToast>, { type: "error" });
          },
        }
      );
      return;
    }

    createFee(payload, {
      onSuccess: () => {
        toast(<AppToast>Fee created</AppToast>, { type: "success" });
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Failed to create fee configuration";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    });
  };

  return (
    <div className="space-y-4 min-w-[320px]">
      <h3 className="font-bold text-lg">
        {isEditing ? "Edit fee configuration" : "Add fee configuration"}
      </h3>

      <Input
        label="Name"
        placeholder="e.g. Invoice commission"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Input
        label="Code"
        placeholder="invoice_commission"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value.replace(/\s+/g, "_") })
        }
      />

      <Input
        label="Scope"
        placeholder="invoice / withdrawal / booking"
        value={form.scope}
        onChange={(e) => setForm({ ...form, scope: e.target.value })}
      />

      <Select
        name="chargeType"
        label="Charge type"
        value={form.chargeType}
        options={chargeTypeOptions}
        onChange={(e) =>
          setForm({ ...form, chargeType: e.target.value as any })
        }
      />

      {(form.chargeType === "percentage" || form.chargeType === "hybrid") && (
        <Input
          label="Percentage (%)"
          type="number"
          min="0"
          max="100"
          value={form.percentage}
          onChange={(e) => setForm({ ...form, percentage: e.target.value })}
        />
      )}

      {(form.chargeType === "flat" || form.chargeType === "hybrid") && (
        <>
          <Input
            label="Flat amount"
            type="number"
            min="0"
            value={form.flatAmount}
            onChange={(e) => setForm({ ...form, flatAmount: e.target.value })}
          />
          <Input
            label="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          />
        </>
      )}

      <Input
        label="Description"
        placeholder="Optional helper text"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        Active
      </label>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? <Spinner /> : isEditing ? "Save changes" : "Add fee"}
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
