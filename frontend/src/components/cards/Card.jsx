/* eslint-disable react/prop-types */
import { FaBookOpen } from "react-icons/fa";

const Card = ({ title, count }) => {
  return (
    <>
      <div className="shadow-md rounded-md">
        <div className="flex gap-4 p-4">
          <FaBookOpen className="text-5xl text-[#8c9159] " />
          <div>
            <h1 className="text-3xl">{title}</h1>
            <span>{count}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
