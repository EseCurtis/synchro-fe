"use client";
import { FC, useRef } from "react";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { ScrapedVenue } from "../types/scraped-venue.types";
import { validateScrapedVenue } from "../utils/venue-mapper";

interface UploadJsonButtonProps {
  onUpload: (venues: ScrapedVenue[]) => void;
}

const UploadJsonButton: FC<UploadJsonButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      toast(
        <AppToast>Please select a valid JSON file</AppToast>,
        { type: "error" }
      );
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      if (!Array.isArray(jsonData)) {
        toast(
          <AppToast>JSON file must contain an array of venues</AppToast>,
          { type: "error" }
        );
        return;
      }

      if (jsonData.length === 0) {
        toast(
          <AppToast>JSON file is empty</AppToast>,
          { type: "error" }
        );
        return;
      }

      // Validate all venues
      const validatedVenues = jsonData.map((venue: any, index: number) => {
        const validation = validateScrapedVenue(venue);
        return { venue, validation, index };
      });

      const validVenues = validatedVenues
        .filter((item) => item.validation.isValid)
        .map((item) => item.venue as ScrapedVenue);

      const invalidVenues = validatedVenues.filter(
        (item) => !item.validation.isValid
      );

      if (validVenues.length === 0) {
        toast(
          <AppToast>
            No valid venues found in JSON file. Please check the format.
          </AppToast>,
          { type: "error" }
        );
        console.error("Validation errors:", invalidVenues);
        return;
      }

      onUpload(validVenues);

      toast(
        <AppToast>
          Successfully loaded {validVenues.length} venue(s)
          {invalidVenues.length > 0
            ? `. ${invalidVenues.length} venue(s) skipped due to validation errors.`
            : ""}
        </AppToast>,
        { type: "success" }
      );

      if (invalidVenues.length > 0) {
        console.warn("Skipped venues:", invalidVenues);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      toast(
        <AppToast>
          Failed to parse JSON file. Please check the file format.
        </AppToast>,
        { type: "error" }
      );
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        id="venue-json-upload"
      />
      <label htmlFor="venue-json-upload">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 text-white rounded-xl bg-gradient-to-r from-blue-900 to-red-600 hover:from-blue-800 hover:to-red-500 transition-all"
        >
          + Upload Venues JSON
        </button>
      </label>
    </>
  );
};

export default UploadJsonButton;

