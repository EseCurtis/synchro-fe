"use client";
import Modal from "@/app/_components/popups/modal";
import Input from "@/app/_components/input_fields";
import { Button } from "@/app/_components/button";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string, number, boolean } from "yup";
import { useTMutation } from "@/hooks/api/useTMutation";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";
import { ScrapedEvent } from "../types/scraped-event.types";
import { mapScrapedEventToPayload, findMatchingCategory } from "../utils/event-mapper";
import EventMetadataDisplay from "./event-metadata-display";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: ScrapedEvent | null;
}

const CreateEventModal: FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  eventData,
}) => {
  const queryClient = useQueryClient();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Fetch event categories
  const { data: categoriesData, isLoading: categoriesLoading } = useTQuery<any>({
    queryKey: ["event-categories"],
    url: "/events/categories",
    enabled: isOpen,
  });

  const categories = (categoriesData as any)?.data || [];

  // Create event mutation
  const { mutate, isLoading } = useTMutation({
    url: "/admin/events/create-event",
    method: "post",
    options: {
      onSuccess: (data) => {
        toast(<AppToast>Event created successfully!</AppToast>, {
          type: "success",
        });
        queryClient.invalidateQueries(["synchro-ai-events"]);
        onClose();
      },
      onError: (error: any) => {
        toast(
          <AppToast>
            {error?.response?.data?.message || "Failed to create event"}
          </AppToast>,
          {
            type: "error",
          }
        );
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "",
      banner: "",
      latitude: 0,
      longitude: 0,
      address: "",
      startDateTime: "",
      endDateTime: "",
      timezone: "America/New_York",
      ticketType: "free" as "free" | "paid",
      ticketPrice: 0,
      currency: "USD",
      maxAttendees: 0,
      isPublic: true,
      canViewMembers: true,
      metadata: {},
    },
    validationSchema: object({
      name: string().required("Event name is required"),
      description: string().required("Description is required"),
      categoryId: string().required("Category is required"),
      address: string().required("Address is required"),
      startDateTime: string().required("Start date is required"),
      endDateTime: string().required("End date is required"),
      latitude: number(),
      longitude: number(),
      ticketType: string().oneOf(["free", "paid"]),
      maxAttendees: number().min(0),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        latitude: parseFloat(values.latitude.toString()),
        longitude: parseFloat(values.longitude.toString()),
        maxAttendees: values.maxAttendees || undefined,
        ticketPrice: values.ticketType === "paid" ? values.ticketPrice : undefined,
      };

      mutate(payload);
    },
  });

  // Auto-fill form when eventData changes
  useEffect(() => {
    if (eventData && categories.length > 0) {
      // Map scraped event to payload format
      const categoryId = findMatchingCategory(eventData.category, categories);
      const mappedData = mapScrapedEventToPayload(eventData, categoryId || "");

      // Convert ISO dates to datetime-local format
      const startDateTime = mappedData.startDateTime
        ? new Date(mappedData.startDateTime).toISOString().slice(0, 16)
        : "";
      const endDateTime = mappedData.endDateTime
        ? new Date(mappedData.endDateTime).toISOString().slice(0, 16)
        : "";

      formik.setValues({
        name: mappedData.name || "",
        description: mappedData.description || "",
        categoryId: mappedData.categoryId || "",
        banner: mappedData.banner || "",
        latitude: mappedData.latitude || 0,
        longitude: mappedData.longitude || 0,
        address: mappedData.address || "",
        startDateTime,
        endDateTime,
        timezone: mappedData.timezone || "America/New_York",
        ticketType: mappedData.ticketType || "free",
        ticketPrice: mappedData.ticketPrice || 0,
        currency: mappedData.currency || "USD",
        maxAttendees: mappedData.maxAttendees || 0,
        isPublic: mappedData.isPublic ?? true,
        canViewMembers: mappedData.canViewMembers ?? true,
        metadata: mappedData.metadata || {},
      });

      if (categoryId) {
        setSelectedCategoryId(categoryId);
      }
    }
  }, [eventData, categories]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Event from Scraped Data</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Display source metadata if available */}
        {eventData && formik.values.metadata && (
          <div className="mb-4">
            <EventMetadataDisplay metadata={formik.values.metadata} />
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Event Name */}
          <Input
            label="Event Name"
            placeholder="Event name"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && formik.errors.name}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...formik.getFieldProps("description")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...formik.getFieldProps("categoryId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.categoryId}
              </p>
            )}
          </div>

          {/* Banner Image */}
          <Input
            label="Banner Image URL"
            placeholder="https://example.com/banner.jpg"
            {...formik.getFieldProps("banner")}
            error={formik.touched.banner && formik.errors.banner}
          />

          {/* Location */}
          <Input
            label="Address"
            placeholder="123 Main St, New York, NY"
            {...formik.getFieldProps("address")}
            error={formik.touched.address && formik.errors.address}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              placeholder="40.7128"
              {...formik.getFieldProps("latitude")}
              error={formik.touched.latitude && formik.errors.latitude}
            />
            <Input
              label="Longitude"
              type="number"
              step="any"
              placeholder="-74.0060"
              {...formik.getFieldProps("longitude")}
              error={formik.touched.longitude && formik.errors.longitude}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              type="datetime-local"
              {...formik.getFieldProps("startDateTime")}
              error={formik.touched.startDateTime && formik.errors.startDateTime}
            />
            <Input
              label="End Date & Time"
              type="datetime-local"
              {...formik.getFieldProps("endDateTime")}
              error={formik.touched.endDateTime && formik.errors.endDateTime}
            />
          </div>

          {/* Timezone */}
          <Input
            label="Timezone"
            placeholder="America/New_York"
            {...formik.getFieldProps("timezone")}
            error={formik.touched.timezone && formik.errors.timezone}
          />

          {/* Ticket Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Type
              </label>
              <select
                {...formik.getFieldProps("ticketType")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {formik.values.ticketType === "paid" && (
              <Input
                label="Ticket Price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...formik.getFieldProps("ticketPrice")}
                error={formik.touched.ticketPrice && formik.errors.ticketPrice}
              />
            )}
          </div>

          {/* Max Attendees */}
          <Input
            label="Max Attendees (optional)"
            type="number"
            placeholder="100"
            {...formik.getFieldProps("maxAttendees")}
            error={formik.touched.maxAttendees && formik.errors.maxAttendees}
          />

          {/* Visibility Options */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...formik.getFieldProps("isPublic")}
                checked={formik.values.isPublic}
                className="w-4 h-4"
              />
              <span className="text-sm">Public Event</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...formik.getFieldProps("canViewMembers")}
                checked={formik.values.canViewMembers}
                className="w-4 h-4"
              />
              <span className="text-sm">Members Can View Attendees</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Create Event
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;

