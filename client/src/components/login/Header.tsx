import { Lock } from "lucide-react";

const Header = () => {
  return (
    <div className="mb-8">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
      <p className="text-gray-500">Sign in to your account</p>
    </div>
  );
};

export default Header;
