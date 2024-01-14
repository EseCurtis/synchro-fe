"use client";
import moment from "moment";
import React, { useState } from "react";

const arrow_with_bar = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2002 13.9004L15.7002 14.8004L14.2002 15.7004V13.9004Z"
      fill="#2E2E2E"
      stroke="#2E2E2E"
      stroke-width="0.6"
      stroke-linejoin="round"
    />
    <path
      d="M3 3V10C3 12.651 5.14777 14.8 7.79874 14.8C9.98665 14.8 12.5786 14.8 14.8 14.8"
      stroke="#2E2E2E"
      stroke-width="0.6"
    />
    <path
      opacity="0.2"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6Z"
      fill="#2E2E2E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.0002 4.79922C3.99431 4.79922 4.8002 3.99333 4.8002 2.99922C4.8002 2.00511 3.99431 1.19922 3.0002 1.19922C2.00608 1.19922 1.2002 2.00511 1.2002 2.99922C1.2002 3.99333 2.00608 4.79922 3.0002 4.79922Z"
      fill="#2E2E2E"
    />
  </svg>
);

const colabsIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="11.9998"
      cy="12.0008"
      rx="11.0769"
      ry="11.0769"
      fill="url(#paint0_radial_2368_62612)"
    />
    <path
      d="M16.3074 11.3848H7.69204C7.52883 11.3848 7.37231 11.4496 7.2569 11.565C7.1415 11.6804 7.07666 11.8369 7.07666 12.0002C7.07666 12.1634 7.1415 12.3199 7.2569 12.4353C7.37231 12.5507 7.52883 12.6155 7.69204 12.6155H16.3074C16.4706 12.6155 16.6272 12.5507 16.7426 12.4353C16.858 12.3199 16.9228 12.1634 16.9228 12.0002C16.9228 11.8369 16.858 11.6804 16.7426 11.565C16.6272 11.4496 16.4706 11.3848 16.3074 11.3848Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_2368_62612"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(0.92285 10.0432) rotate(26.716) scale(28.9933 227.853)"
      >
        <stop stop-color="#E73C01" />
        <stop offset="0.697917" stop-color="#0512D2" />
      </radialGradient>
    </defs>
  </svg>
);

const Audit_Box = ({ item }: { item: any }) => {
  const [open, setOpen] = useState(false);

  const openAccordion = () => (!open ? setOpen(true) : setOpen(!true));

  const plusIcon = (
    <div className="cursor-pointer">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="11.9998"
          cy="12.0008"
          rx="11.0769"
          ry="11.0769"
          fill="#EEF1F5"
        />
        <path
          d="M16.3074 11.3839H12.6151V7.69156C12.6151 7.52835 12.5503 7.37182 12.4349 7.25641C12.3195 7.14101 12.1629 7.07617 11.9997 7.07617C11.8365 7.07617 11.68 7.14101 11.5646 7.25641C11.4492 7.37182 11.3844 7.52835 11.3844 7.69156V11.3839H7.69204C7.52883 11.3839 7.37231 11.4487 7.2569 11.5641C7.1415 11.6795 7.07666 11.836 7.07666 11.9992C7.07666 12.1625 7.1415 12.319 7.2569 12.4344C7.37231 12.5498 7.52883 12.6146 7.69204 12.6146H11.3844V16.3069C11.3844 16.4702 11.4492 16.6267 11.5646 16.7421C11.68 16.8575 11.8365 16.9223 11.9997 16.9223C12.1629 16.9223 12.3195 16.8575 12.4349 16.7421C12.5503 16.6267 12.6151 16.4702 12.6151 16.3069V12.6146H16.3074C16.4706 12.6146 16.6272 12.5498 16.7426 12.4344C16.858 12.319 16.9228 12.1625 16.9228 11.9992C16.9228 11.836 16.858 11.6795 16.7426 11.5641C16.6272 11.4487 16.4706 11.3839 16.3074 11.3839Z"
          fill="#2E2E2E"
        />
      </svg>
    </div>
  );

  return (
    <div>
      <div className="flex gap-5 my-10">
        <div>{plusIcon}</div>
        <div className="flex justify-between  w-[80%]">
          <p>{item?.title}</p>
          <p className="text-text_primary">
            {moment(item?.created_at).format("MMM DD YYYY")} at{" "}
            {moment(item?.created_at).format("HH:mm A")}
          </p>
        </div>
      </div>
      {/* dropdown  */}
      {open && (
        <div>
          <div className="flex gap-5 my-5">
            <div>{colabsIcon}</div>
            <div className="flex justify-between  w-[80%]">
              <p>Imani edited a user profile of Kwame Eugene</p>
              <p className="text-text_primary">May 12 2020 at 2:30</p>
            </div>
          </div>

          {/* support items */}
          <div className="flex gap-5 my-5 pl-10">
            <div>{arrow_with_bar}</div>
            <div className="flex justify-between  w-[80%]">
              <p>Imani edited a user profile of Kwame Eugene</p>
              <p className="text-text_primary">May 12 2020 at 2:30</p>
            </div>
          </div>
          {/* support items */}
          <div className="flex gap-5 my-5 pl-10">
            <div>{arrow_with_bar}</div>
            <div className="flex justify-between  w-[80%]">
              <p>Imani edited a user profile of Kwame Eugene</p>
              <p className="text-text_primary">May 12 2020 at 2:30</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audit_Box;
