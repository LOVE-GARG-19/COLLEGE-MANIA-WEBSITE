import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostContainer from "../../components/Users Post/PostContainer";
import UsersReelCard from "../Reels/UsersReelCard";
import ProfileModel from "./ProfileModel";

import {
  findUserById,
  FollowUserAction,
  UnfollowUserAction,
} from "../../Redux/Auth/auth.action";

const tabs = [
  { value: "post", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
];

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth } = useSelector((store) => store);

  const isOwnProfile = auth.user?.id === parseInt(id);
  const profileUser = isOwnProfile ? auth.user : auth.viewedUser;

  const [value, setValue] = useState("post");
  const [openModel, setOpenModal] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (!isOwnProfile && id) {
      dispatch(findUserById(id));
    }
  }, [id, trigger, dispatch, isOwnProfile]);

  const handleFollowUser = () => {
    const isFollowing = profileUser?.follower?.some(
      (follower) => follower.id === auth.user?.id
    );

    const action = isFollowing
      ? UnfollowUserAction(profileUser.id)
      : FollowUserAction(profileUser.id);

    dispatch(action).then(() => {
      dispatch(findUserById(id));
    });
  };
  // setTrigger((prev) => !prev)
  const handleclose = () => {
    setOpenModal(!openModel);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!profileUser) {
    return (
      <div className="flex justify-center py-20">
        <CircularProgress />
        <p className="ml-2 text-white">Loading profile...</p>
      </div>
    );
  }

  const isFollowing = profileUser?.follower?.some(
    (follower) => follower.id === auth.user?.id
  );

  return (
    <div className="py-10 w-[70%]">
      <div className="rounded-md bg-[#191c29]">
        {/* Cover Image */}
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://media.istockphoto.com/id/1141304089/vector/global-network-connection-concept-big-data-visualization-social-network-communication-in-the.jpg?s=612x612&w=0&k=20&c=XoQRixTQExBgu3CKeSzTleQSbasbpBkDs3S3q6BByOM="
            alt="cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt={profileUser?.name}
            src={
              profileUser?.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            sx={{ width: 80, height: 80 }}
          />
          <div>
            {isOwnProfile ? (
              <Button variant="outlined" onClick={() => setOpenModal(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleFollowUser}
                sx={{ backgroundColor: "#1976d2" }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pl-5">
          <h1 className="py-1 font-bold text-xl">{profileUser?.name}</h1>
          <p>@{profileUser?.username}</p>
          <div className="flex space-x-5 items-center py-3">
            <span>{profileUser?.posts.length} posts</span>
            <span>{profileUser?.follower.length} followers</span>
            <span>{profileUser?.following.length} following</span>
          </div>
          {/* <p>{profileUser?.bio}</p> */}
        </div>
        {/* bio */}
        <div className="p-5">
        <div className="max-w-full">
          <p className="font-medium pb-1">{profileUser?.name}</p>
          <p className="whitespace-pre-line pb-1">{profileUser?.bio}</p>
          {profileUser?.website && (
            <a
              href={profileUser.website}
              target="_blank" rel="noreferrer"
              className="text-blue-900 font-medium"
            >
              {profileUser.website}
            </a>
          )}
        </div>
         </div>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, mt: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.name} value={tab.value} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <div className="p-4">
          {value === "post" && (
            <div className="grid grid-cols-3 gap-4">
              {profileUser.posts && profileUser.posts.length > 0 ? (
                profileUser.posts.map((post) => (
                  <PostContainer key={post.id} post={post} />
                ))
              ) : (
                <p className="text-center col-span-3">No Posts</p>
              )}
            </div>
          )}

          {value === "reels" && (
            <div className="grid grid-cols-3 gap-4">
              {profileUser.reels && profileUser.reels.length > 0 ? (
                profileUser.reels.map((reel) => (
                  <UsersReelCard key={reel.id} reel={reel} />
                ))
              ) : (
                <p className="text-center col-span-3">No Reels</p>
              )}
            </div>
          )}

          {value === "saved" && (
            <div className="grid grid-cols-3 gap-4">
              {profileUser.savedPosts && profileUser.savedPosts.length > 0 ? (
                profileUser.savedPosts.map((post) => (
                  <PostContainer key={post.id} post={post} />
                ))
              ) : (
                <p className="text-center col-span-3">No Saved Posts</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {openModel && (
        <ProfileModel
          open={openModel}
          setOpen={setOpenModal}
          user={auth.user}
          handleClose={handleclose}
        />
      )}
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Tab,
//   Tabs,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import PostCard from "../../components/Users Post/PostCard";
// import UsersReelCard from "../Reels/UsersReelCard";
// import ProfileModel from "./ProfileModel";

// import { findUserById, FollowUserAction, UnfollowUserAction } from "../../Redux/Auth/auth.action";

// const tabs = [
//   { value: "post", name: "Posts" },
//   { value: "reels", name: "Reels" },
//   { value: "saved", name: "Saved" },
// ];

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { auth } = useSelector((store) => store);

//   const isOwnProfile = auth.user?.id === parseInt(id);
//   const profileUser = isOwnProfile ? auth.user : auth.viewedUser;

//   const [value, setValue] = useState("post");
//   const [openModel, setOpenModal] = useState(false);
//   const [trigger, setTrigger] = useState(false);

//   useEffect(() => {
//     if (!isOwnProfile) {
//       dispatch(findUserById(id));
//     }
//   }, [id, trigger]); // trigger ke change pe bhi chalega

//   const handleFollowUser = () => {
//     if (!profileUser.followers.includes(auth.user.id)) {
//       dispatch(FollowUserAction(profileUser.id)).then(() => {
//         setTrigger((prev) => !prev);
//       });
//     } else {
//       dispatch(UnfollowUserAction(profileUser.id)).then(() => {
//         setTrigger((prev) => !prev);
//       });
//     }
//   };
//   // useEffect(() => {
//   //   if (!isOwnProfile) {
//   //     dispatch(findUserById(id));
//   //   }
//   // }, [id]);

//   // const handleFollowUser = () => {
//   //   if (!profileUser.followers.includes(auth.user.id)) {
//   //     dispatch(FollowUserAction(profileUser.id));
//   //   } else {
//   //     dispatch(UnfollowUserAction(profileUser.id));
//   //   }
//   // };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (!profileUser) {
//     return (
//       <div className="flex justify-center py-20">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="py-10 w-[70%]">
//       <div className="rounded-md bg-[#191c29]">
//         {/* Cover Image */}
//         <div className="h-[15rem]">
//           <img
//             className="w-full h-full rounded-t-md"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXfwkZy2Bj8CxzRxsrYOV6k_4fQsRMnIRKNsBb3jku2sG8rLstpoCF7yRt8CsyyLPF_ZM_w&s"
//             alt="cover"
//           />
//         </div>

//         {/* Profile Info */}
//         <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
//           <Avatar
//             alt={profileUser?.name}
//             src={
//               profileUser?.image ||
//               "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             }
//             sx={{ width: 80, height: 80 }}
//           />
//           <div>
//             {isOwnProfile ? (
//               <Button variant="outlined" onClick={() => setOpenModal(true)}>
//                 Edit Profile
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={handleFollowUser}
//                 sx={{ backgroundColor: "#1976d2" }}
//               >
//                 {profileUser.followers.includes(auth.user.id)
//                   ? "Unfollow"
//                   : "Follow"}
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, mt: 3 }}>
//           <Tabs value={value} onChange={handleChange}>
//             {tabs.map((tab) => (
//               <Tab key={tab.value} label={tab.name} value={tab.value} />
//             ))}
//           </Tabs>
//         </Box>

//         {/* Tab Content */}
//         <div className="p-4">
//           {value === "post" && (
//             <div className="grid grid-cols-3 gap-4">
//               {profileUser.posts && profileUser.posts.length > 0 ? (
//                 profileUser.posts.map((post) => (
//                   <PostCard key={post.id} post={post} />
//                 ))
//               ) : (
//                 <p className="text-center col-span-3">No Posts</p>
//               )}
//             </div>
//           )}

//           {value === "reels" && (
//             <div className="grid grid-cols-3 gap-4">
//               {profileUser.reels && profileUser.reels.length > 0 ? (
//                 profileUser.reels.map((reel) => (
//                   <UsersReelCard key={reel.id} reel={reel} />
//                 ))
//               ) : (
//                 <p className="text-center col-span-3">No Reels</p>
//               )}
//             </div>
//           )}

//           {value === "saved" && (
//             <div className="grid grid-cols-3 gap-4">
//               {profileUser.savedPosts && profileUser.savedPosts.length > 0 ? (
//                 profileUser.savedPosts.map((post) => (
//                   <PostCard key={post.id} post={post} />
//                 ))
//               ) : (
//                 <p className="text-center col-span-3">No Saved Posts</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {openModel && (
//         <ProfileModel open={openModel} setOpen={setOpenModal} user={auth.user} />
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Tab,
//   Tabs,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import PostCard from "../../components/Users Post/PostCard";
// import UsersReelCard from "../Reels/UsersReelCard";
// import ProfileModel from "./ProfileModel";

// import { findUserById } from "../../Redux/Auth/auth.action";
// import { getUsersPost } from "../../Redux/Post/post.action";
// import { getUsersReels } from "../../Redux/Reels/reels.acton";
// import {FollowUserAction,UnfollowUserAction} from '../../Redux/Auth/auth.action'

// const tabs = [
//   { value: "post", name: "Posts" },
//   { value: "reels", name: "Reels" },
//   { value: "saved", name: "Saved" },
// ];

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { auth, post, reel } = useSelector((store) => store);

//   const isOwnProfile = auth.user?.id === parseInt(id);
//   const profileUser = isOwnProfile ? auth.user : auth.viewedUser;

//   const [value, setValue] = useState("post");
//   const [openModel, setOpenModal] = useState(false);

//   useEffect(() => {
//     if (!isOwnProfile) {
//       dispatch(findUserById(id));
//     }
//     dispatch(getUsersPost(id));
//     dispatch(getUsersReels(id));
//   }, [id]);

//   const handleFollowUser = () => {
//     if (!profileUser.followers.includes(auth.user.id)) {
//       // Follow action
//       dispatch(FollowUserAction(profileUser.id));
//     } else {
//       // Unfollow action
//       dispatch(UnfollowUserAction(profileUser.id));
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (!profileUser) {
//     return (
//       <div className="flex justify-center py-20">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="py-10 w-[70%]">
//       <div className="rounded-md bg-[#191c29]">
//         {/* Cover Image */}
//         <div className="h-[15rem]">
//           <img
//             className="w-full h-full rounded-t-md"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXfwkZy2Bj8CxzRxsrYOV6k_4fQsRMnIRKNsBb3jku2sG8rLstpoCF7yRt8CsyyLPF_ZM_w&s"
//             alt="cover"
//           />
//         </div>

//         {/* Profile Image & Buttons */}
//         <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
//           <Avatar
//             alt={profileUser?.name}
//             src={
//               profileUser?.userImage ||
//               "data:image/png;base64,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"
//             }
//             className="transform -translate-y-24"
//             sx={{
//               width: "10rem",
//               height: "10rem",
//               bgcolor: "#212534",
//               color: "rgb(88,199,250)",
//             }}
//           />

//           {isOwnProfile ? (
//             <Button
//               onClick={() => setOpenModal(true)}
//               sx={{ borderRadius: "20px" }}
//               variant="outlined"
//             >
//               Edit Profile
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleFollowUser}
//             >
//               {profileUser.followers.includes(auth.user.id)
//                 ? "Unfollow"
//                 : "Follow"}
//             </Button>
//           )}
//         </div>

//         {/* Profile Info */}
//         <div className="p-5">
//           <h1 className="py-1 font-bold text-xl">{profileUser?.name}</h1>
//           <p>@{profileUser?.username}</p>
//           <div className="flex space-x-5 items-center py-3">
//             <span>{post.posts.length} posts</span>
//             <span>0 followers</span>
//             <span>0 following</span>
//           </div>
//           <p>{profileUser?.bio}</p>
//         </div>

//         {/* Tabs */}
//         <section>
//           <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
//             <Tabs value={value} onChange={handleChange}>
//               {tabs.map((tab) => {
//                 if (tab.value === "saved" && !isOwnProfile) return null;
//                 return (
//                   <Tab
//                     key={tab.value}
//                     value={tab.value}
//                     label={tab.name}
//                     wrapped
//                   />
//                 );
//               })}
//             </Tabs>
//           </Box>

//           {/* Tab Content */}
//           <div className="flex justify-center">
//             {value === "post" && (
//               <div className="space-y-5 w-[70%] my-10">
//                 {post.posts.map((item) => (
//                   <div
//                     key={item.id}
//                     className="border border-[#3b4054] rounded-md"
//                   >
//                     <PostCard item={item} />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {value === "reels" && (
//               <div className="flex flex-wrap py-5">
//                 {reel.reels.map((reelItem) => (
//                   <UsersReelCard key={reelItem.id} reel={reelItem} />
//                 ))}
//               </div>
//             )}

//             {value === "saved" && (
//               <div className="space-y-5 w-[70%] my-10">
//                 {profileUser?.savedPosts?.map((item) => (
//                   <PostCard key={item.id} item={item} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </div>

//       {/* Edit Modal */}
//       <ProfileModel open={openModel} handleClose={() => setOpenModal(false)} />
//     </div>
//   );
// };

// export default Profile;
