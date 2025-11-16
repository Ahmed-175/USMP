import { BookMarked, ChartBarBig, Heart, Newspaper, Users } from "lucide-react";
import React, { useState } from "react";

const sections = [
  {
    name: "Posts",
    icon: Newspaper,
    id: "posts",
    color: "text-blue-600",
    activeColor: "bg-blue-600",
  },
  {
    name: "Followers",
    icon: Users,
    id: "followers",
    color: "text-emerald-600",
    activeColor: "bg-emerald-600",
  },
  {
    name: "Followings",
    icon: Heart,
    id: "followings",
    color: "text-rose-600",
    activeColor: "bg-rose-600",
  },
  {
    name: "Saved",
    icon: BookMarked,
    id: "saved",
    color: "text-purple-600",
    activeColor: "bg-purple-600",
  },
  {
    name: "Analysis",
    icon: ChartBarBig,
    id: "analysis",
    color: "text-amber-600",
    activeColor: "bg-amber-600",
  },
];

const StateSection = ({
  stateSection,
  setStateSection,
}: {
  stateSection: string;
  setStateSection: any;
}) => {
  console.log("the state now", stateSection);
  return (
    <div
      className="mx-auto mt-10 w-full px-6 flex justify-between
     items-center gap-6 rounded-xl mb-10"
    >
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => setStateSection(sec.id)}
          className={`flex flex-col items-center gap-2 p-3 cursor-pointer 
              transition-all duration-200 ease-in-out  
              ${
                stateSection === sec.id
                  ? `${sec.color} border-b-2 rounded-none border-gray-400  `
                  : "text-gray-500 hover:text-indigo-500 rounded-xl hover:bg-indigo-100"
              }`}
        >
          <div className="relative">
            <sec.icon
              className={`w-5 h-5 transition-all duration-200 ${
                stateSection === sec.id ? "scale-110" : ""
              }`}
            />
          </div>
          <div className="text-xs font-medium transition-all duration-200">
            {sec.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default StateSection;
