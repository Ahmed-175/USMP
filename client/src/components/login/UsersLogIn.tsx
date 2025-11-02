import img1 from "../../../public/38d0421af9c0b17cf7490cf0e21355ac.jpg";
import img2 from "../../../public/487777062_665807499193422_316891488937918134_n (1).jpg";
import img3 from "../../../public/light_yagami_by_suzettecharlotte_deu86sz-fullview.jpg";
import { Star } from "lucide-react";
const UsersLogIn = () => {
  return (
    <div className="flex  gap-3.5 items-center mb-5 ">
      <div className=" relative flex justify-center items-center">
        <img
          src={img1}
          alt="levi"
          className=" relative object-cover z-10 left-3.5 rounded-full w-10 h-10"
        />
        <img
          src={img2}
          alt="levi"
          className=" relative object-cover left-2.5  rounded-full w-10 h-10"
        />
        <img
          src={img3}
          alt="levi"
          className=" object-cover  rounded-full w-10 h-10"
        />
      </div>

      <div>
        <div className=" flex justify-center gap-1.5 mb-1.5">
          <Star className=" text-amber-500 text-sm " />
          <Star className=" text-amber-500 text-sm " />
          <Star className=" text-amber-500 text-sm " />
          <Star className=" text-amber-500 text-sm " />
          <Star className=" text-amber-500 text-sm " />
        </div>
        <div className=" text-gray-500 text-sm"> Used by 2M+ developers</div>
      </div>
    </div>
  );
};

export default UsersLogIn;
