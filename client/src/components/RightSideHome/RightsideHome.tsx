import FollowersAnIngs from "./FollowersAnIngs";
import Wisdom from "./Wisdom";

const RightsideHome = () => {
  return (
    <div
      className="  fixed top-0 right-0 h-screen  p-2.5 pt-3.5  
     w-[20%]  "
    >
      <Wisdom />
      <FollowersAnIngs />
    </div>
  );
};

export default RightsideHome;
