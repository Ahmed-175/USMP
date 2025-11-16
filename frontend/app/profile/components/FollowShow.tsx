import { useCurrentUser } from "@/context/ProfileContexts";
import getavatar from "@/utils/getavatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Users, UserCheck, UserPlus } from "lucide-react";

const FollowShow = ({ type }: { type: "followers" | "followings" }) => {
  const { user, setUser } = useCurrentUser();
  const arrayofFollows =
    type === "followers" ? user?.followers : user?.followings;

  const isFollowing = (userId: string) => {
    console.log(user?.followings)
    console.log("user followers" ,user?.followers)
    console.log( "id :  " , user?.followers[0])
    console.log("user current" , userId)
    return user?.followings?.some((follow : any) => follow._id === userId);
  };

  if (!arrayofFollows || arrayofFollows.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {type === "followers" ? "No Followers Yet" : "Not Following Anyone"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {type === "followers"
              ? "When someone follows you, they'll appear here."
              : "Start following people to see them in your list."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex  justify-between  items-center">
        <div className="flex  items-center gap-3 mb-2">
          {type === "followers" ? (
            <Users className="w-6 h-6 text-blue-500" />
          ) : (
            <UserCheck className="w-6 h-6 text-green-500" />
          )}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {type === "followers" ? "Followers" : "Following"}
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {arrayofFollows.length} {type === "followers" ? "people" : "accounts"}
        </p>
      </div>

      <div className="space-y-3">
        {arrayofFollows?.map((follow, index) => (
          <div
            key={index}
            className="group w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-600"
          >
            <Link
              href={`/user/${follow.id}`}
              className="flex items-center gap-4 flex-1 min-w-0"
            >
              <div className="relative">
                <div className="relative p-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                  <Image
                    src={getavatar(follow.avatar)}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-800"
                    alt={follow.fullName}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 dark:text-white text-base truncate">
                  {follow.fullName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                  {follow.mainJob || "No profession specified"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate mt-1">
                  {follow.email}
                </p>
              </div>
            </Link>

            <div className="flex-shrink-0 ml-4">
              {type === "followers" && (
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isFollowing((follow as any)._id)
                      ? "px-4 py-2 bg-red-50  text-red-600  hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200 "
                      : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {isFollowing(follow.id) ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Follow Back
                    </>
                  )}
                </button>
              )}

              {type === "followings" && (
                <button className="px-4 py-2 bg-red-50  text-red-600  hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200 ">
                  <UserCheck className="w-4 h-4" />
                  Following
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowShow;
