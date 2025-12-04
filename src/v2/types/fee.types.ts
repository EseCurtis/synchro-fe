export type FeeConfiguration = {
  id: string;
  name: string;
  code: string;
  scope: string;
  chargeType: "percentage" | "flat" | "hybrid";
  percentage?: number;
  flatAmount?: number;
  currency: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

