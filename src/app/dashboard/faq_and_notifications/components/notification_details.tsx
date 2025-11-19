import { Button } from "@/app/_components/button";
import React from "react";

const NotificationDetails = () => {
  return (
    <div>
      <h3 className="font-bold">Notification details</h3>

      <div className="info-box border border-[2px] border-gray-300 p-[0.5em] rounded-[10px] mt-5 bg-gray-100">
        <b>Title goes here,</b>
        <p>Channel: Email</p>
        <p>10:54PM, 3rd June 2023</p>
        <p className="mt-5">Lorem ipsum dolor sit amet consectetur. Mattis consequat tellus dictum consequat sed id. Nullam amet mauris diam penatibus augue quam eu duis. Massa imperdiet suspendisse eu erat ornare vulputate enim. Egestas mauris lorem viverra urna magna massa mauris. Rhoncus magna quis vel nulla a. Pulvinar non hendrerit malesuada quisque nunc orci. At amet mauris dignissim porttitor ultrices sem commodo arcu. Tortor faucibus ut sapien aliquet tellus pharetra morbi in augue. Nisl odio odio amet mus cursus. Eu id pretium volutpat dui faucibus risus dapibus. Viverra id scelerisque dui ipsum nunc tellus turpis habitant. Odio ut sapien viverra convallis. Magna dictum vel consequat sed ultrices duis vestibulum.</p>
      </div>
    </div>
  );
};

export default NotificationDetails;
