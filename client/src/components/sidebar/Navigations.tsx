import { Bell, Home, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  {
    icon: <Home size={20} />,
    name: "Home",
    path: "/",
  },
  {
    icon: <User size={20} />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <Users size={20} />,
    name: "Communities",
    path: "/communities",
  },
  {
    icon: <Bell size={20} />,
    name: "Notifications",
    path: "/notifications",
  },
];

const Navigations = () => {
  const location = useLocation();

  return (
    <div className=" p-3">
      <div className="flex flex-col space-y-1">
        {navs.map((nav, index) => {
          const isActive = location.pathname === nav.path;

          return (
            <Link to={nav.path} key={index}>
              <div
                className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-500 "
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
              >
                <div
                  className={`
                  ${isActive ? "text-blue-600" : "text-gray-500"}
                `}
                >
                  {nav.icon}
                </div>

                <div
                  className={`
                  font-medium text-sm
                  ${isActive ? "text-blue-600" : "text-gray-700"}
                `}
                >
                  {nav.name}
                </div>

                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigations;
