import { Link } from "react-router-dom";

const HomeButton = (prop) => {
  return (
    <Link to="/">
      <div className="flex group ">
        <div className={`${prop.buttonStyle} p-4 rounded-md`}>{prop.icon}</div>
        <div className=" flex flex-col w-24 justify-center text-gray-500 group-hover:text-gray-900 text-lg pl-3 break-words">{prop.text}</div>
      </div>
    </Link>
  );
};

export default HomeButton;
