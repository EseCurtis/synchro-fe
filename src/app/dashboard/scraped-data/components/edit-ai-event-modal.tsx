"use client";
import { FC, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Event } from "@/v2/types/event.types";
import { useTQuery } from "@/hooks/api/useTQuery";

interface EditAIEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onSave: (eventId: string, updates: any) => void;
  isSaving: boolean;
}

const EditAIEventModal: FC<EditAIEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
  isSaving,
}) => {
  // Fetch event categories
  const { data: categoriesData, isLoading: categoriesLoading } = useTQuery<any>(
    {
      queryKey: ["event-categories"],
      url: "/events/categories",
      enabled: isOpen,
    }
  );

  const categories = (categoriesData as any)?.data || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    name: Yup.string().required("Event name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.string().required("Category is required"),
    address: Yup.string().required("Address is required"),
    startDateTime: Yup.date().required("Start date/time is required"),
    endDateTime: Yup.date()
      .required("End date/time is required")
      .min(Yup.ref("startDateTime"), "End time must be after start time"),
    status: Yup.string().required("Status is required"),
    ticketType: Yup.string().required("Ticket type is required"),
  });

  const initialValues = {
    name: event.name || "",
    description: event.description || "",
    categoryId: event.categoryId || "",
    address: event.address || "",
    startDateTime: event.startDateTime
      ? new Date(event.startDateTime).toISOString().slice(0, 16)
      : "",
    endDateTime: event.endDateTime
      ? new Date(event.endDateTime).toISOString().slice(0, 16)
      : "",
    status: event.status || "published",
    ticketType: event.ticketType || "free",
    ticketPrice: event.ticketPrice || 0,
    currency: event.currency || "USD",
    maxAttendees: event.maxAttendees || "",
    isPublic: event.isPublic ?? true,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSaving}
          >
            ✕
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const updates = {
              ...values,
              startDateTime: new Date(values.startDateTime).toISOString(),
              endDateTime: new Date(values.endDateTime).toISOString(),
              ticketPrice:
                values.ticketType === "paid"
                  ? Number(values.ticketPrice)
                  : undefined,
              maxAttendees: values.maxAttendees
                ? Number(values.maxAttendees)
                : undefined,
            };
            onSave(event.id, updates);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-6 space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Name *
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <Field
                  name="description"
                  as="textarea"
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                {categoriesLoading ? (
                  <div className="text-sm text-gray-500">
                    Loading categories...
                  </div>
                ) : (
                  <Field
                    name="categoryId"
                    as="select"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                )}
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date & Time *
                  </label>
                  <Field
                    name="startDateTime"
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <ErrorMessage
                    name="startDateTime"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date & Time *
                  </label>
                  <Field
                    name="endDateTime"
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <ErrorMessage
                    name="endDateTime"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address *
                </label>
                <Field
                  name="address"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status *
                </label>
                <Field
                  name="status"
                  as="select"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Ticket Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ticket Type *
                  </label>
                  <Field
                    name="ticketType"
                    as="select"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e: any) => {
                      setFieldValue("ticketType", e.target.value);
                      if (e.target.value === "free") {
                        setFieldValue("ticketPrice", 0);
                      }
                    }}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </Field>
                </div>

                {values.ticketType === "paid" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ticket Price
                    </label>
                    <div className="flex gap-2">
                      <Field
                        name="ticketPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                      />
                      <Field
                        name="currency"
                        as="select"
                        className="w-24 border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </Field>
                    </div>
                  </div>
                )}
              </div>

              {/* Max Attendees */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Attendees (optional)
                </label>
                <Field
                  name="maxAttendees"
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Is Public */}
              <div className="flex items-center gap-2">
                <Field name="isPublic" type="checkbox" className="rounded" />
                <label className="text-sm font-medium">
                  Make event public
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditAIEventModal;

