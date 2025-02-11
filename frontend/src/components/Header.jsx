import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";


const Header = () => {
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  return (
    <div className=" h-[70px] shadow-sm">
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center h-full">
          <h1 className="text-[#9b87f5] text-xl font-bold">Student Portal</h1>
          <div className="flex items-center gap-3">
            <CgProfile className="text-xl" />
            <h1 className="text-2xl">{ user.name}</h1>
            <IoIosLogOut className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
