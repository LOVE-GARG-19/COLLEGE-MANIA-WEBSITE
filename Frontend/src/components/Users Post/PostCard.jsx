import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import {fetchCommentsByPostId, createComment, likeComment,unlikeComment } from "../../Redux/Comment/comment.action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Divider } from "@mui/material";
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../Redux/Post/post.action";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function PostCard({ index, item }) {
  const [showComment, setShowComment] = React.useState(false);
  const dispatch = useDispatch();
 
  const {comment} = useSelector(store=>store);
  
//  React.useEffect(()=>{
//    console.log("item id :",item?.id)
//  fetchComment();

//  },[comment?.likingComment,comment?.unlikingComment,comment?.deletingComment, comment?.create])
  const handleopencommentbox = ()=>{
    setShowComment(!showComment)
    console.log("item id :",item?.id)
    dispatch(fetchCommentsByPostId(item?.id))
  }
  const fetchComment = ()=>{
    dispatch(fetchCommentsByPostId(item?.id));
  }
  const handleCreateComment = (content) => {
    console.log("handlecreatecomment")
    dispatch(createComment({ postId: item?.id, data: { content } }));
    fetchComment();
  };
  console.log("postcard item :",item);
  const handlePostLike = () => {
    if (item?.likedByRequser) {
      dispatch(unlikePost(item?.id));
    } else {
      dispatch(likePost(item?.id));
     
    }
  };
  const handleCommentLike = (bolean,id) => {
    if (bolean) {
      console.log("unlike")
      dispatch(unlikeComment(id));
      fetchComment();
    } else {
      console.log("like")
      dispatch(likeComment(id));
      fetchComment();
    }
  };

  const handleSavePost = () => {
    if (item?.savedByRequser) {
      dispatch(unsavePost(item?.id));
    } else {
      dispatch(savePost(item?.id));
    }
  };

  return (
    <div className="card" sx={{ w: "100%" }}>
      <CardHeader
        key={index}
        className=""
        avatar={
          <Avatar
            alt={item?.user?.name}
            src={
              item?.user?.userImage ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            sx={{ width: 80, height: 80 }}
          />
        }
        action={
          <IconButton color="primary" aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.user?.name}
        subheader={"@" + item?.user?.username}
      />
      {item?.image && (
        <CardMedia
          component="img"
          height="194"
          image={item?.image}
          alt={item.caption}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="primary">
          {item?.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton
            color="primary"
            onClick={handlePostLike}
            aria-label="add to favorites"
          >
            {item?.likedByRequser ? (
              <>
                <span className="text-sm mr-1">{item?.liked?.length || 0}
                <FavoriteIcon sx={{ color: pink[500] }} /></span>
              </>
            ) : (
              <>
                <span className="text-sm mr-1">{item?.liked?.length || 0}
                <FavoriteBorderIcon /></span>
              </>
            )}
          </IconButton>
          {/* <IconButton color="primary" aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <IconButton
            color="primary"
            onClick={handleopencommentbox}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <IconButton color="primary" onClick={handleSavePost}>
            {item?.savedByRequser ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} />
            <input
              onKeyPress={(e) => {
                console.log("e", e.target.value);
                if (e.key === "Enter") {
                  console.log("--------");
                  handleCreateComment(e.target.value);
                  e.target.value="";
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {comment.comments.map((comment, index) => (
              <div key={index} className="flex justify-between items-center mb-5">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{
                      height: "2rem",
                      width: "2rem",
                      fontSize: ".8rem",
                      bgcolor: "#212534",
                      color: "rgb(88,199,250)",
                    }}
                    src={
                      comment?.user?.userImage ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  >
                    {comment?.user?.name}
                  </Avatar>
                  <div className="flex flex-col">
                    <p>{comment?.user?.name}</p>
                    <p className="text-white">{comment?.content}</p>
                  </div>
                </div>
                <div>
                <IconButton
            color="primary"
            onClick={()=>handleCommentLike(comment?.likedByRequser,comment?.id)}
            aria-label="add to favorites"
          >
            {comment?.likedByRequser ? (
              <>
                <span className="text-sm mr-1">{comment?.liked?.length || 0}
                <FavoriteIcon sx={{ color: pink[500] }} /></span>
              </>
            ) : (
              <>
                <span className="text-sm mr-1">{comment?.liked?.length || 0}
                <FavoriteBorderIcon /></span>
              </>
            )}
          </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
