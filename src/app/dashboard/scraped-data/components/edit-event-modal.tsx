"use client";
import Input from "@/app/_components/input_fields";
import { Button } from "@/app/_components/button";
import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ScrapedEvent } from "../types/scraped-event.types";
import EventMetadataDisplay from "./event-metadata-display";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: ScrapedEvent;
  onSave: (updatedEvent: ScrapedEvent) => void;
}

const EditEventModal: FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  eventData,
  onSave,
}) => {
  const formik = useFormik({
    initialValues: {
      title: eventData.title || "",
      description: eventData.description || "",
      category: eventData.category || "other",
      venueName: eventData.location?.venueName || "",
      latitude: eventData.location?.latitude || 0,
      longitude: eventData.location?.longitude || 0,
      startDate: eventData.startDate || "",
      timezone: eventData.timezone || "America/New_York",
      organizerName: eventData.organizer?.name || "",
      organizerEmail: eventData.organizer?.email || "",
      organizerPhone: eventData.organizer?.phone || "",
      isFree: eventData.pricing?.isFree ?? true,
      ticketPrice: eventData.pricing?.ticketPrice || 0,
      banner: eventData.images?.banner || eventData.images?.thumbnail || "",
    },
    validationSchema: object({
      title: string().required("Event title is required"),
      description: string().required("Description is required"),
      startDate: string().required("Start date is required"),
    }),
    onSubmit: (values) => {
      // Calculate end date
      const endDate = eventData.endDate || 
        new Date(new Date(values.startDate).getTime() + 3 * 60 * 60 * 1000).toISOString();

      const updatedEvent: ScrapedEvent = {
        ...eventData,
        title: values.title,
        description: values.description,
        category: values.category,
        location: {
          ...eventData.location,
          venueName: values.venueName,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        startDate: values.startDate,
        endDate: endDate,
        timezone: values.timezone,
        organizer: {
          name: values.organizerName,
          email: values.organizerEmail,
          phone: values.organizerPhone,
        },
        pricing: {
          ...eventData.pricing,
          isFree: values.isFree,
          ticketPrice: values.isFree ? 0 : values.ticketPrice,
        },
        images: {
          ...eventData.images,
          banner: values.banner,
        },
      };

      onSave(updatedEvent);
    },
  });

  // Update form when eventData changes
  useEffect(() => {
    if (eventData) {
      formik.setValues({
        title: eventData.title || "",
        description: eventData.description || "",
        category: eventData.category || "other",
        venueName: eventData.location?.venueName || "",
        latitude: eventData.location?.latitude || 0,
        longitude: eventData.location?.longitude || 0,
        startDate: eventData.startDate ? new Date(eventData.startDate).toISOString().slice(0, 16) : "",
        timezone: eventData.timezone || "America/New_York",
        organizerName: eventData.organizer?.name || "",
        organizerEmail: eventData.organizer?.email || "",
        organizerPhone: eventData.organizer?.phone || "",
        isFree: eventData.pricing?.isFree ?? true,
        ticketPrice: eventData.pricing?.ticketPrice || 0,
        banner: eventData.images?.banner || eventData.images?.thumbnail || "",
      });
    }
  }, [eventData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Display source metadata */}
        <div className="mb-4">
          <EventMetadataDisplay
            metadata={{
              source: eventData.source,
              sourceId: eventData.sourceId,
              sourceUrl: eventData.sourceUrl,
              tags: eventData.tags,
              organizer: eventData.organizer,
              scrapedAt: eventData.scrapedAt,
            }}
          />
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Event Title */}
          <Input
            label="Event Title"
            placeholder="Event title"
            {...formik.getFieldProps("title")}
            error={formik.touched.title && formik.errors.title}
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
              {...formik.getFieldProps("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="business">Business</option>
              <option value="music">Music</option>
              <option value="arts">Arts</option>
              <option value="food">Food & Drink</option>
              <option value="nightlife">Nightlife</option>
              <option value="sports">Sports & Fitness</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Banner Image */}
          <Input
            label="Banner Image URL"
            placeholder="https://example.com/banner.jpg"
            {...formik.getFieldProps("banner")}
          />

          {/* Venue Name */}
          <Input
            label="Venue / Location Name"
            placeholder="Venue name or address"
            {...formik.getFieldProps("venueName")}
          />

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              placeholder="40.7128"
              {...formik.getFieldProps("latitude")}
            />
            <Input
              label="Longitude"
              type="number"
              step="any"
              placeholder="-74.0060"
              {...formik.getFieldProps("longitude")}
            />
          </div>

          {/* Date & Time */}
          <Input
            label="Start Date & Time"
            type="datetime-local"
            {...formik.getFieldProps("startDate")}
            error={formik.touched.startDate && formik.errors.startDate}
          />

          {/* Timezone */}
          <Input
            label="Timezone"
            placeholder="America/New_York"
            {...formik.getFieldProps("timezone")}
          />

          {/* Organizer Info */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-3">Organizer Information</h3>
            <div className="space-y-3">
              <Input
                label="Organizer Name"
                placeholder="Organizer name"
                {...formik.getFieldProps("organizerName")}
              />
              <Input
                label="Organizer Email"
                type="email"
                placeholder="contact@example.com"
                {...formik.getFieldProps("organizerEmail")}
              />
              <Input
                label="Organizer Phone"
                placeholder="1234567890"
                {...formik.getFieldProps("organizerPhone")}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-3">Pricing</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...formik.getFieldProps("isFree")}
                  checked={formik.values.isFree}
                  className="w-4 h-4"
                />
                <span className="text-sm">Free Event</span>
              </label>

              {!formik.values.isFree && (
                <Input
                  label="Ticket Price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...formik.getFieldProps("ticketPrice")}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;

