import LeftSide from "../components/login/LeftSide";
import Logo from "../components/login/Logo";
import RightSide from "../components/login/RightSide";


const Login = () => {
  return (
    <div className=" w-screen flex justify-between items-center
     px-16 h-screen">
      <Logo/>
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default Login;
