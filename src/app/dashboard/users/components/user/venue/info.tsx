import { BiCalendar, BiInfoCircle, BiMapPin, BiTime } from "react-icons/bi";

const Info = () => {
  return (
    <div>
      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiInfoCircle /> About
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Gravida mollis nisi in
          consequat neque amet urna ac. Scelerisque eget integer vestibulum quis
          et. Arcu quis ut eget orci pellentesque. Tincidunt facilisis aenean
          nunc quis ac nec dictumst.
        </p>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">
          <BiMapPin /> Location
        </h4>
        <p>West 40th Street, Chelsea, New York, United States</p>
        <div className="flex h-[150px] w-[100%] rounded bg-gray-300"></div>
      </div>

      <div className="grid gap-3 mt-6">
        <h4 className="flex items-center gap-2">Pricing</h4>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3">
            <BiTime />
            <div className="grid">
              <p className="text-sm text-gray-400">Hourly</p>
              <p>$120/hr</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BiCalendar />
            <div className="grid">
              <p className="text-sm text-gray-400">Daily</p>
              <p>$420/hr</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-7">
        <h3 className="font-bold">Show more details</h3>
      </div>
    </div>
  );
};

export default Info;
