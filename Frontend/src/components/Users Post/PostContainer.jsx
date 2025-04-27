import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
const PostContainer = ({ post }) => {
  console.log("post data in post container-------------------",post)
    return (
        <div className="relative w-full aspect-square overflow-hidden rounded-lg cursor-pointer group">
          {/* Image */}
          <img
            src={post.image}
            alt="post"
            className="w-full h-full object-cover group-hover:blur-sm transition duration-300"
          />
    
          {/* Overlay with icons */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
            <div className="flex gap-6 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
              <div className="flex items-center gap-1">
                <FavoriteIcon fontSize="small" />
                <span>{post.liked?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatBubbleIcon fontSize="small" />
                <span>{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      );
};

export default PostContainer;
