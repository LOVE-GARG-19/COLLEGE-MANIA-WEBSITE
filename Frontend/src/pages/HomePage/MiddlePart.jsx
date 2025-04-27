// import React, { useEffect, useState } from "react";
// import PostCard from "../../components/Users Post/PostCard";
// import StoryCircle from "../../components/Story/StoryCircle";
// import { Avatar, Card, IconButton } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import ImageIcon from "@mui/icons-material/Image";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import ArticleIcon from "@mui/icons-material/Article";
// import CreatePostModal from "../../components/CreatePost/CreatePostModal";
// import AddIcon from "@mui/icons-material/Add";
// import { story } from "../../components/Story/StoryData";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPost } from "../../Redux/Post/post.action";

// const MiddlePart = () => {
//   const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
//   const dispatch = useDispatch();
//   const { post, auth } = useSelector((store) => store);

//   const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
//   const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

//   useEffect(() => {
//     dispatch(getAllPost());
//   }, [auth.token]);
// console.log("post try karra hu:",post.posts)
//   return (
//     <div className="px-20">
//       <div className="bg- py-5 flex items-center bg-[#191c29] p-5 rounded-b-md">
//         <div className="flex flex-col items-center mr-4 cursor-pointer">
//           <Avatar sx={{ width: "5rem", height: "5rem",bgcolor:"#212534",color:"rgb(88,199,250)" }}>
//             <AddIcon sx={{ fontSize: "3rem" }} />
//           </Avatar>
//           <p>New</p>
//         </div>

//         {story.map((item,index) => (
//           <StoryCircle key={index}
//             image={item.image}
//             username={item.username}
//             userId={item.userId}
//           />
//         ))}
//       </div>
//       <div className="card p-5 mt-5">
//         <div className="flex justify-between">
//           <Avatar sx={{ bgcolor:"#212534",color:"rgb(88,199,250)" }} className="bg-[black]" />
//           <input
//             onClick={handleOpenCreatePostModal}
//             placeholder="Create new post..."
//             className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
//             readOnly
//             type="text"
//           />
//         </div>
//         <div className="flex justify-center space-x-9 mt-5">
//           <div className="flex items-center">
//             <IconButton color="primary" onClick={handleOpenCreatePostModal}>
//               <ImageIcon />
//             </IconButton>

//             <span>media</span>
//           </div>
//           <div className="flex  items-center">
//             <IconButton color="primary">
//               <VideocamIcon />
//             </IconButton>

//             <span>video</span>
//           </div>
//           <div className="flex  items-center">
//             <IconButton color="primary">
//               <ArticleIcon />
//             </IconButton>

//             <span>Write Article</span>
//           </div>
//         </div>
//         <div></div>
//       </div>
//       <div className="mt-5 space-y-5">
//         {post.posts.map((item,index) => (

//             <PostCard key={index} item={item} />

//         ))}
//       </div>
//       <CreatePostModal
//         open={openCreatePostModal}
//         handleClose={handleCloseCreatePostModal}
//       />
//     </div>
//   );
// };

// export default MiddlePart;
import _ from "lodash";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedUserStories } from "../../Redux/Story/story.action"; // Import the Redux action
import StoryCircle from "../../components/Story/StoryCircle"; // Import the StoryCircle component
import PostCard from "../../components/Users Post/PostCard";
import CreatePostModal from "../../components/CreatePost/CreatePostModal";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getAllPost } from "../../Redux/Post/post.action";
import CreateStoryModal from "../../components/Story/CreateStoryModal";
import { getAllReels } from "../../Redux/Reels/reels.acton";
const MiddlePart = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);
  const dispatch = useDispatch();
  const { post, auth, story } = useSelector((store) => store); // Access Redux state

  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreateStoryModal = () => setOpenCreateStoryModal(true);
  const handleCloseCreateStoryModal = () => setOpenCreateStoryModal(false);

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(fetchFollowedUserStories()); // Fetch stories of followed users when the component mounts
  }, [dispatch, auth.token]);
  useEffect(() => {
     dispatch(getAllReels());
   }, []);

  useEffect(() => {
    dispatch(fetchFollowedUserStories()); // Fetch stories of followed users when the component mounts
  }, [dispatch, auth.token,story.stories]);

  const uniqueUserStories = story?.followedUserStories?.reduce((acc, current) => {
    const x = acc.find(item => item.user.id === current.user.id);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, []);
  return (
    <div className="px-20">
      <div className="bg-[#191c29] py-5 flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{
              width: "5rem",
              height: "5rem",
              bgcolor: "#212534",
              color: "rgb(88,199,250)",
            }}
          >
            <AddIcon
              sx={{ fontSize: "3rem" }}
              onClick={handleOpenCreateStoryModal}
            />
          </Avatar>
          <p>New</p>
        </div>

        {/* Display Story Circles for Followed Users */}
        {uniqueUserStories.map((item, index) => (
          <StoryCircle
            key={index}
            image={item?.user?.userImage||"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
            username={item.user.username}
            userId={item.user.id}
          />
        ))}
      </div>

      {/* Create Post Section */}
      {/* <div className="card p-5 mt-5">
        <div className="flex justify-between">
          <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} />
          <input
            onClick={handleOpenCreatePostModal}
            placeholder="Create new post..."
            className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
            readOnly
            type="text"
          />
        </div>
      </div> */}

      <div className="card p-5 mt-5">
        <div className="flex justify-between">
          <Avatar
            sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }}
            className="bg-[black]"
          />
          <input
            onClick={handleOpenCreatePostModal}
            placeholder="Create new post..."
            className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
            readOnly
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>media</span>
          </div>
          <div className="flex  items-center">
            {" "}
            <IconButton onClick={handleOpenCreatePostModal} color="primary">
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>
          <div className="flex  items-center">
            <IconButton onClick={handleOpenCreatePostModal} color="primary">
              <ArticleIcon />
            </IconButton>

            <span>Write Article</span>
          </div>
        </div>
        <div></div>
      </div>

      <div className="mt-5 space-y-5">
        {post?.posts.map((item, index) => (
          <PostCard key={index} item={item} />
        ))}
      </div>
      <CreateStoryModal
        open={openCreateStoryModal}
        handleClose={handleCloseCreateStoryModal}
      />
      <CreatePostModal
        open={openCreatePostModal}
        handleClose={handleCloseCreatePostModal}
      />
    </div>
  );
};

export default MiddlePart;

//<div className="card p-5 mt-5">
//         <div className="flex justify-between">
//           <Avatar sx={{ bgcolor:"#212534",color:"rgb(88,199,250)" }} className="bg-[black]" />
//           <input
//             onClick={handleOpenCreatePostModal}
//             placeholder="Create new post..."
//             className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
//             readOnly
//             type="text"
//           />
//         </div>
//         <div className="flex justify-center space-x-9 mt-5">
//           <div className="flex items-center">
//             <IconButton color="primary" onClick={handleOpenCreatePostModal}>
//               <ImageIcon />
//             </IconButton>

//             <span>media</span>
//           </div>
//           <div className="flex  items-center">
//             <IconButton color="primary">
//               <VideocamIcon />
//             </IconButton>

//             <span>video</span>
//           </div>
//           <div className="flex  items-center">
//             <IconButton color="primary">
//               <ArticleIcon />
//             </IconButton>

//             <span>Write Article</span>
//           </div>
//         </div>
//         <div></div>
//       </div>
