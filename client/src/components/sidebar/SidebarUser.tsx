import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { LogOut } from "lucide-react";
import getAvatarUrl from "../../utils/getAvatarUrl";
const url = import.meta.env.VITE_API_URL;
const SidebarUser = () => {
  const { data } = useAppSelector((state) => state.user);
  const urlavatar = getAvatarUrl(data?.avatar);
  return (
    <div className=" absolute left-6 bottom-6 ">
      <div
        className=" w-full flex justify-between items-center 
      "
      >
        <Link to={"/profile"} className="flex gap-1.5">
          <img
            src={urlavatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <div className="text-xs font-bold">{data?.username}</div>
            <div className="text-xs text-gray-600">{data?.email}</div>
            <div className=" text-xs">Mern Stack</div>
          </div>
        </Link>
        <div className=" p-2.5 ml-6 rounded-full hover:bg-red-600 bg-red-500">
          <LogOut size={20} className=" text-white" />
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
