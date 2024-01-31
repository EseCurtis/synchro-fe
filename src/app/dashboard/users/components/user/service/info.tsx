import moment from "moment";
import Image from "next/image";
import { Fragment, ReactNode, useEffect, useState } from "react";
import {
  BiArrowToBottom,
  BiBook,
  BiCalendar,
  BiInfoCircle,
  BiMapPin,
  BiTime,
} from "react-icons/bi";
import {
  FaDollarSign,
} from "react-icons/fa";


const Info = ({ data }: any) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiInfoCircle /> About
        </h4>
        <p>{data?.description}</p>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiMapPin /> Location
        </h4>
        <p>{data?.address}</p>
        <div className="flex h-[auto] w-[100%] rounded-lg bg-gray-300">
          <Image
            className="w-[300%] h-[100%]"
            src={"/images/map-dummy-location.svg"}
            alt="location map"
            width={550}
            height={100}
          />
        </div>
      </div>

      <div
        className={`${
          showMore ? "h-full" : "h-0"
        } overflow-clip transition-[0.4s] flex-col`}
      >
        <div className="grid gap-3 mt-6">
          <h4 className="flex items-center gap-2">Pricing Packages</h4>
          <div className="grid grid-cols-2 mt-3">
            {data.packages.map((item: any, key: any) => {
              item = JSON.parse(item);

              return (
                <div className="col-span-1" key={key}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="bg-gray-200 rounded-full p-1">
                        <FaDollarSign />
                      </div>
                      <div className="flex flex-col">
                        <p>{item.name}</p>
                        <b>${item.amount}</b>
                      </div>
                    </div>
                    <div className="flex pr-3">
                      <p className="text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 mt-6 pb-6">
          <h4 className="flex items-center gap-2">Benefits</h4>
          <div className="flex gap-2 mt-3">
            {data.benefits.map((item: any, key: any) => {
              return (
                <div className="col-span-1" key={key}>
                  <span className="bg-gray-200 px-3 py-1 rounded-full">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-7 flex items-center justify-center">
        <h3
          className="font-bold cursor-pointer border border-gray-300 m-auto w-auto py-3 px-7 rounded-lg"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more details"}
        </h3>
      </div>
    </div>
  );
};

export default Info;
