import { useTMutation } from "@/hooks/api/useTMutation";
import React, { useState } from "react";
import { Spinner } from "../spinner/Spinner";

const clipboardIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4402 2.10576 12.4099 2.10576 12.38 2.11C12.2784 2.05174 12.1662 2.01434 12.05 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H13C13.2652 22 13.5196 21.8946 13.7071 21.7071C13.8946 21.5196 14 21.2652 14 21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM8 8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM20.71 17.29L18.71 15.29C18.6149 15.199 18.5028 15.1276 18.38 15.08C18.1365 14.98 17.8635 14.98 17.62 15.08C17.4972 15.1276 17.3851 15.199 17.29 15.29L15.29 17.29C15.1017 17.4783 14.9959 17.7337 14.9959 18C14.9959 18.2663 15.1017 18.5217 15.29 18.71C15.4783 18.8983 15.7337 19.0041 16 19.0041C16.2663 19.0041 16.5217 18.8983 16.71 18.71L17 18.41V21C17 21.2652 17.1054 21.5196 17.2929 21.7071C17.4804 21.8946 17.7348 22 18 22C18.2652 22 18.5196 21.8946 18.7071 21.7071C18.8946 21.5196 19 21.2652 19 21V18.41L19.29 18.71C19.383 18.8037 19.4936 18.8781 19.6154 18.9289C19.7373 18.9797 19.868 19.0058 20 19.0058C20.132 19.0058 20.2627 18.9797 20.3846 18.9289C20.5064 18.8781 20.617 18.8037 20.71 18.71C20.8037 18.617 20.8781 18.5064 20.9289 18.3846C20.9797 18.2627 21.0058 18.132 21.0058 18C21.0058 17.868 20.9797 17.7373 20.9289 17.6154C20.8781 17.4936 20.8037 17.383 20.71 17.29ZM12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H12Z"
      fill="#1B72E7"
    />
  </svg>
);

function ImageUpload({
  onDone,
  id,
}: {
  onDone?: (image: string) => void;
  id: string;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const readFile = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        setImage(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  const { mutate, isLoading } = useTMutation({
    url: "/upload/image-signature",
    method: "get",
  });

  const handleUpload = (file: any) => {
    mutate(
      {
        file,
      },
      {
        onSuccess: async (data) => {
          try {
            setLoading(true);

            const formData = new FormData() as any;
            formData.append("file", file);
            const { cloudName, apiKey, signature, timestamp } = data.data;
            formData.append("cloud_name", cloudName);
            formData.append("api_key", apiKey);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);

            const uploadRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              {
                method: "post",
                body: formData,
              }
            );

            const res = await uploadRes.json();

            onDone && onDone(res.secure_url);

            readFile(file);

            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        },
      }
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    } else {
      alert("Please drop a valid image file.");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div className="w-[100%]">
      <div
        className={`w-[100%] border border-dashed border-gray-400 py-12 px-6 text-center rounded-md ${
          isDragOver ? "border-blue-600" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 display flex items-center justify-center">
          <p className="text-gray-600 flex gap-1">
            {isLoading || loading ? <Spinner /> : clipboardIcon} Drag & drop or
          </p>
          <input
            type="file"
            id={id}
            className="hidden"
            onChange={handleFileInputChange}
          />
          <label
            htmlFor={id}
            className="text-blue-500 hover:text-blue-600 py-2 px-1 rounded cursor-pointer"
          >
            Browse
          </label>
          <p className="text-gray-600 flex gap-1">to add files.</p>
        </div>
        <div id={"dropArea" + id} className="hidden">
          <p className="text-gray-600">Drop your image here</p>
        </div>
      </div>
      <div id={"preview" + id} className="mt-4">
        {image && (
          <img src={image} alt="Uploaded" className="max-w-full mx-auto" />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
