import Navigations from "./Navigations";
import SidebarUser from "./SidebarUser";

const Sidebar = () => {
  return (
    <div className=" fixed  h-screen bg-white shadow p-2.5 pt-3.5  rounded-e-3xl w-[20%] ">
      <div className=" text-2xl font-bold  mt-4 mb-3 mx-3">
        <span
          className=" p-1.5 px-2 bg-linear-to-r from-indigo-600
          to-purple-500 text-white rounded-sm m-1 "
        >
          U
        </span>
        SMP
      </div>
      <Navigations/>
      <SidebarUser/>
    </div>
  );
};

export default Sidebar;
