import { useCurrentUser } from "@/context/ProfileContexts";
import React from "react";
import PostEditable from "./PostEditable";

const PostSection = () => {
  const { user, loading } = useCurrentUser();
  console.log((user as any)?.posts[3].comments[0]._id);
  return (
    <div className=" flex flex-col gap-6 mb-28">
      { user?.posts?.length > 0 && user?.posts?.map((post, index) => (
        <PostEditable key={index} post={post} />
      ))}
    </div>
  );
};

export default PostSection;
