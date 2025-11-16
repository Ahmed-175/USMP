"use client";
import AboutMe from "@/components/AboutMe";
import React, { useState } from "react";
import BannerAndInfoUser from "./components/BannerAndInfoUser";
import StateSection from "./components/StateSection";
import PostSection from "./components/PostSection";
import FollowShow from "./components/FollowShow";

const ProfilePage = () => {
  const [stateSection, setStateSection] = useState<
    "posts" | "followings" | "followers" | "saved" | "analysis"
  >("followers");

  return (
    <div className=" max-w-[75%] min-h-screen mx-auto">
      <BannerAndInfoUser />
      {/* <AboutMe/> */}
      <StateSection
        stateSection={stateSection}
        setStateSection={setStateSection}
      />
      {stateSection == "posts" && <PostSection/>}
      {stateSection == "followers" && <FollowShow type="followers"/>} 
       {stateSection == "followings" && <FollowShow type="followings"/>} 
    </div>
  );
};

export default ProfilePage;
