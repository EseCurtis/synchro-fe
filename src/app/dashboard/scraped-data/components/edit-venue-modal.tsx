"use client";
import Input from "@/app/_components/input_fields";
import { FC } from "react";
import { useFormik } from "formik";
import { object, string, number, array } from "yup";
import { ScrapedVenue } from "../types/scraped-venue.types";

interface EditVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueData: ScrapedVenue;
  onSave: (updatedVenue: ScrapedVenue) => void;
}

const EditVenueModal: FC<EditVenueModalProps> = ({
  isOpen,
  onClose,
  venueData,
  onSave,
}) => {
  if (!isOpen) return null;

  const formik = useFormik({
    initialValues: {
      name: venueData.name,
      description: venueData.description || "",
      city: venueData.location?.city || "",
      address: venueData.location?.address || "",
      region: venueData.location?.region || "",
      country: venueData.location?.country || "United States",
      latitude: venueData.location?.latitude || 0,
      longitude: venueData.location?.longitude || 0,
      capacity: venueData.capacity.max,
      hourlyRate: venueData.pricing.hourly || 0,
      dailyRate: venueData.pricing.daily || 0,
      currency: venueData.pricing.currency || "USD",
      images: venueData.images.join(", "),
      amenities: venueData.amenities.join(", "),
    },
    validationSchema: object({
      name: string().required("Name is required"),
      description: string(),
      city: string().required("City is required"),
      address: string(),
      capacity: number()
        .min(1, "Capacity must be at least 1")
        .required("Capacity is required"),
      currency: string().required("Currency is required"),
      images: string(),
      amenities: string(),
    }),
    onSubmit: (values) => {
      const updatedVenue: ScrapedVenue = {
        ...venueData,
        name: values.name,
        description: values.description,
        location: {
          city: values.city,
          address: values.address,
          region: values.region,
          country: values.country,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        capacity: {
          ...venueData.capacity,
          max: values.capacity,
        },
        pricing: {
          hourly: values.hourlyRate || undefined,
          daily: values.dailyRate || undefined,
          currency: values.currency,
        },
        images: values.images
          .split(",")
          .map((img) => img.trim())
          .filter((img) => img),
        amenities: values.amenities
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
      };
      onSave(updatedVenue);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Venue</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Venue Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter venue name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter venue description"
              />
            </div>
          </div>

          {/* Location */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  City *
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="City"
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Region/State
                </label>
                <Input
                  type="text"
                  name="region"
                  value={formik.values.region}
                  onChange={formik.handleChange}
                  placeholder="Region or State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <Input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  placeholder="Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Capacity & Pricing */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Capacity & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacity *
                </label>
                <Input
                  type="number"
                  name="capacity"
                  value={formik.values.capacity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Max guests"
                />
                {formik.touched.capacity && formik.errors.capacity && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.capacity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Currency *
                </label>
                <Input
                  type="text"
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  placeholder="USD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Hourly Rate
                </label>
                <Input
                  type="number"
                  name="hourlyRate"
                  value={formik.values.hourlyRate}
                  onChange={formik.handleChange}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Daily Rate
                </label>
                <Input
                  type="number"
                  name="dailyRate"
                  value={formik.values.dailyRate}
                  onChange={formik.handleChange}
                  placeholder="0"
                />
              </div>
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
                <textarea
                  name="images"
                  value={formik.values.images}
                  onChange={formik.handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://image1.jpg, https://image2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Amenities (comma-separated)
                </label>
                <textarea
                  name="amenities"
                  value={formik.values.amenities}
                  onChange={formik.handleChange}
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
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVenueModal;

