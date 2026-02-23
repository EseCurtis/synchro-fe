"use client";
import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Venue } from "../types/scraped-venue.types";
import Input from "@/app/_components/input_fields";

interface EditAIVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  onSave: (venueId: string, updates: any) => void;
  isSaving: boolean;
}

const venueTypes = [
  { value: "banquet_hall", label: "Banquet Hall" },
  { value: "conference_center", label: "Conference Center" },
  { value: "outdoor_space", label: "Outdoor Space" },
  { value: "restaurant", label: "Restaurant" },
  { value: "hotel", label: "Hotel" },
  { value: "other", label: "Other" },
];

const venueStatuses = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const EditAIVenueModal: FC<EditAIVenueModalProps> = ({
  isOpen,
  onClose,
  venue,
  onSave,
  isSaving,
}) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    country: Yup.string().required("Country is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    capacity: Yup.number()
      .min(1, "Capacity must be at least 1")
      .required("Capacity is required"),
    rateType: Yup.string().required("Rate type is required"),
    hourlyRate: Yup.number().when("rateType", {
      is: (val: string) => val === "hourly" || val === "both",
      then: (schema) =>
        schema
          .min(0, "Hourly rate must be positive")
          .required("Hourly rate is required"),
    }),
    dailyRate: Yup.number().when("rateType", {
      is: (val: string) => val === "daily" || val === "both",
      then: (schema) =>
        schema
          .min(0, "Daily rate must be positive")
          .required("Daily rate is required"),
    }),
    currency: Yup.string().required("Currency is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    title: venue.title,
    description: venue.description,
    type: venue.type,
    address: venue.address,
    apartment: venue.apartment || "",
    city: venue.city,
    region: venue.region,
    postalCode: venue.postalCode || "",
    country: venue.country,
    latitude: parseFloat(venue.latitude),
    longitude: parseFloat(venue.longitude),
    capacity: venue.capacity,
    sizeSquareFeet: venue.sizeSquareFeet || 0,
    rateType: venue.rateType,
    hourlyRate: venue.hourlyRate || 0,
    dailyRate: venue.dailyRate || 0,
    currency: venue.currency,
    status: venue.status,
    amenities: venue.amenities?.join(", ") || "",
    images: venue.images?.join(", ") || "",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Venue</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const updates = {
              ...values,
              amenities: values.amenities
                .split(",")
                .map((a) => a.trim())
                .filter((a) => a),
              images: values.images
                .split(",")
                .map((img) => img.trim())
                .filter((img) => img),
            };
            onSave(venue.id, updates);
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Venue Title *
                  </label>
                  <Field
                    name="title"
                    as={Input}
                    type="text"
                    placeholder="Enter venue title"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter venue description"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type *
                  </label>
                  <Field
                    name="type"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {venueTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status *
                  </label>
                  <Field
                    name="status"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {venueStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <Field
                      name="address"
                      as={Input}
                      type="text"
                      placeholder="Street address"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Apartment/Suite
                    </label>
                    <Field
                      name="apartment"
                      as={Input}
                      type="text"
                      placeholder="Apt, Suite, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City *
                    </label>
                    <Field
                      name="city"
                      as={Input}
                      type="text"
                      placeholder="City"
                    />
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Region/State *
                    </label>
                    <Field
                      name="region"
                      as={Input}
                      type="text"
                      placeholder="Region or State"
                    />
                    <ErrorMessage
                      name="region"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Postal Code
                    </label>
                    <Field
                      name="postalCode"
                      as={Input}
                      type="text"
                      placeholder="Postal code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country *
                    </label>
                    <Field
                      name="country"
                      as={Input}
                      type="text"
                      placeholder="Country"
                    />
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Latitude *
                    </label>
                    <Field
                      name="latitude"
                      as={Input}
                      type="number"
                      step="any"
                      placeholder="0.0"
                    />
                    <ErrorMessage
                      name="latitude"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Longitude *
                    </label>
                    <Field
                      name="longitude"
                      as={Input}
                      type="number"
                      step="any"
                      placeholder="0.0"
                    />
                    <ErrorMessage
                      name="longitude"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity & Size */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Capacity & Size</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Capacity *
                    </label>
                    <Field
                      name="capacity"
                      as={Input}
                      type="number"
                      placeholder="Max guests"
                    />
                    <ErrorMessage
                      name="capacity"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Size (sq ft)
                    </label>
                    <Field
                      name="sizeSquareFeet"
                      as={Input}
                      type="number"
                      placeholder="Square feet"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Rate Type *
                    </label>
                    <Field
                      name="rateType"
                      as="select"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="both">Both</option>
                    </Field>
                    <ErrorMessage
                      name="rateType"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Currency *
                    </label>
                    <Field
                      name="currency"
                      as={Input}
                      type="text"
                      placeholder="USD"
                    />
                    <ErrorMessage
                      name="currency"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {(values.rateType === "hourly" ||
                    values.rateType === "both") && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Hourly Rate *
                      </label>
                      <Field
                        name="hourlyRate"
                        as={Input}
                        type="number"
                        placeholder="0"
                      />
                      <ErrorMessage
                        name="hourlyRate"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  )}

                  {(values.rateType === "daily" ||
                    values.rateType === "both") && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Daily Rate *
                      </label>
                      <Field
                        name="dailyRate"
                        as={Input}
                        type="number"
                        placeholder="0"
                      />
                      <ErrorMessage
                        name="dailyRate"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Images & Amenities */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Images & Amenities</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Images (comma-separated URLs)
                    </label>
                    <Field
                      name="images"
                      as="textarea"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://image1.jpg, https://image2.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Amenities (comma-separated)
                    </label>
                    <Field
                      name="amenities"
                      as="textarea"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="WiFi, Parking, AC, Projector"
                    />
                  </div>
                </div>
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

export default EditAIVenueModal;


