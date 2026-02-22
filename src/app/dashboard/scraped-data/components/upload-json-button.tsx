"use client";
import { FC, useRef } from "react";
import { toast } from "react-toastify";
import { AppToast } from "@/app/_components/AppToast";
import { ScrapedEvent } from "../types/scraped-event.types";
import { validateScrapedEvent } from "../utils/event-mapper";

interface UploadJsonButtonProps {
  onUpload: (events: ScrapedEvent[]) => void;
}

const UploadJsonButton: FC<UploadJsonButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".json")) {
      toast(
        <AppToast>Please upload a valid JSON file</AppToast>,
        {
          type: "error",
        }
      );
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Validate JSON structure
      if (!Array.isArray(jsonData)) {
        toast(
          <AppToast>JSON file must contain an array of events</AppToast>,
          {
            type: "error",
          }
        );
        return;
      }

      if (jsonData.length === 0) {
        toast(
          <AppToast>JSON file is empty</AppToast>,
          {
            type: "error",
          }
        );
        return;
      }

      // Validate all events
      const validatedEvents = jsonData.map((event: any, index: number) => {
        const validation = validateScrapedEvent(event);
        return { event, validation, index };
      });

      const validEvents = validatedEvents
        .filter((item) => item.validation.isValid)
        .map((item) => item.event as ScrapedEvent);

      const invalidEvents = validatedEvents.filter(
        (item) => !item.validation.isValid
      );

      if (validEvents.length === 0) {
        toast(
          <AppToast>
            No valid events found in the file. Please check the data format.
          </AppToast>,
          {
            type: "error",
          }
        );
        return;
      }

      // Pass all valid events
      onUpload(validEvents);

      // Show success message
      toast(
        <AppToast>
          Loaded {validEvents.length} valid event{validEvents.length !== 1 ? "s" : ""}
          {invalidEvents.length > 0 ? `. ${invalidEvents.length} invalid event${invalidEvents.length !== 1 ? "s" : ""} skipped.` : "!"}
        </AppToast>,
        {
          type: "success",
        }
      );

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast(
        <AppToast>
          Failed to parse JSON file. Please check the file format.
        </AppToast>,
        {
          type: "error",
        }
      );
      console.error("JSON parsing error:", error);
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
      />
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4V16M4 10H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Create New Event from JSON
      </button>
    </>
  );
};

export default UploadJsonButton;

