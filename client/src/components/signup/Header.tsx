import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="mb-8">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome New User
      </h1>
      <p className="text-gray-500">Make new account</p>
    </div>
  );
};

export default Header;
