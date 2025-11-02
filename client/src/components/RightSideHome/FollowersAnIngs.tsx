import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import getAvatarUrl from "../../utils/getAvatarUrl";

const FollowersAnIngs = () => {
  const { data } = useAppSelector((state) => state.user);

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="mb-8">
        <div className="flex justify-between p-1.5 px-2.5 rounded-lg bg-blue-100 items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Followers</h3>
          <span className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {data?.followers?.length || 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            {data?.followers?.slice(0, 3).map((follower: any, index) => (
              <Link
                to={`/user/${follower._id}`}
                key={follower._id}
                className="transform hover:scale-110 transition-transform 
                duration-200"
              >
                <img
                  src={getAvatarUrl(follower.avatar)}
                  alt={follower.username}
                  className="w-12 h-12 object-cover rounded-full border-2
                   border-white shadow-md  transition-colors
                    duration-200"
                />
              </Link>
            ))}

            {(data as any).followers?.length > 3 && (
              <div className="w-12 h-12 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-xs font-medium text-gray-600">
                  +{(data as any).followers.length - 3}
                </span>
              </div>
            )}
          </div>

          {data?.followers?.length === 0 && (
            <p className="text-gray-500 text-sm">No followers yet</p>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-4"></div>

      <div>
        <div
          className="flex justify-between p-1.5 px-2.5 
        rounded-lg bg-green-100 items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">Following</h3>
          <span className="bg-green-200 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            {data?.followings?.length || 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            {data?.followings?.slice(0, 4).map((following: any, index) => (
              <Link
                to={`/user/${following._id}`}
                key={following._id}
                className="transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={getAvatarUrl(following.avatar)}
                  alt={following.username}
                  className="w-12 h-12 object-cover rounded-full border-2
                   border-white shadow-md  duration-200"
                />
              </Link>
            ))}
            {(data as any)?.followings?.length > 4 && (
              <div className="w-12 h-12 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-xs font-medium text-gray-600">
                  +{(data as any).followings.length - 4}
                </span>
              </div>
            )}
          </div>

          {(data as any)?.followings?.length === 0 && (
            <p className="text-gray-500 text-sm">Not following anyone</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersAnIngs;
