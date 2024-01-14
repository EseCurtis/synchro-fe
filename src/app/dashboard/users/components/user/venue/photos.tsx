import { useState } from "react";

const Block = ({ w = 100 }: { w: number }) => {
  return (
    <div
      style={{
        width: `${w}%`,
      }}
      className={`block bg-gray-400 rounded-[20px] h-[100%]`}
    ></div>
  );
};

const Photos = () => {
  return (
    <div className="mt-2 w-[100%] grid gap-2">
      <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
        <Block w={60} />
        <Block w={40} />
      </div>
      <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
        <Block w={40} />
        <Block w={60} />
      </div>
      <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
        <Block w={100} />
      </div>
    </div>
  );
};

export default Photos;
