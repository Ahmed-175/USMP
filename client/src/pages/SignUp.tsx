import LeftSide from "../components/login/LeftSide";
import Logo from "../components/login/Logo";
import RightSideSign from "../components/signup/RightSideSign";

const SignUp = () => {
  return (
    <div
      className=" w-screen flex justify-between items-center 
    h-screen px-16"
    >
      <Logo />
      <LeftSide />
      <RightSideSign />
    </div>
  );
};

export default SignUp;
