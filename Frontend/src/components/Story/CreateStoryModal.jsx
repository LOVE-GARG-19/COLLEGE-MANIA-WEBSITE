import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, Backdrop, CircularProgress } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import { uploadToCloudinary } from "../../utis/uploadToCloudniry";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/Story/story.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "0",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
};

export default function CreateStoryModal({ handleClose, open }) {
  const [caption, setCaption] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(""); // image or video
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectFile = async (event, type) => {
    setIsloading(true);
    const file = event.target.files[0];
    const uploadedUrl = await uploadToCloudinary(file, type);
    setSelectedMedia(uploadedUrl);
    setMediaType(type);
    setIsloading(false);
  };

  const handleCreateStory = () => {
    const storyData = { captions: caption, image: selectedMedia };
    dispatch(createStory(storyData));
    handleClose();
    setCaption("");
    setSelectedMedia(null);
    setMediaType("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <input
          placeholder="Write captions..."
          className="outline-none w-full bg-slate-100 mt-5 p-2"
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="flex items-center mt-5 gap-4">
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleSelectFile(e, "image")}
            style={{ display: "none" }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <IconButton color="primary" component="span">
              <ImageIcon />
            </IconButton>
          </label>
          <span>Image</span>

          {/* Video Upload */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleSelectFile(e, "video")}
            style={{ display: "none" }}
            id="video-input"
          />
          <label htmlFor="video-input">
            <IconButton color="primary" component="span">
              <VideocamIcon />
            </IconButton>
          </label>
          <span>Video</span>
        </div>

        {/* Show preview */}
        {selectedMedia && (
          <div className="mt-4">
            {mediaType === "image" ? (
              <img src={selectedMedia} alt="Story Preview" className="max-h-[10rem] mx-auto" />
            ) : (
              <video className="h-[10rem]" controls>
                <source src={selectedMedia} type="video/mp4" />
              </video>
            )}
          </div>
        )}

        <div className="flex w-full justify-end mt-5">
          <Button sx={{ borderRadius: "1.5rem" }} variant="contained" onClick={handleCreateStory}>
            Create
          </Button>
        </div>

        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}

// this is good
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { IconButton, Backdrop, CircularProgress } from "@mui/material";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import { uploadToCloudinary } from "../../utis/uploadToCloudniry";  // Assuming this is the utility for file upload
// import { useDispatch } from "react-redux";
// import { createStory } from "../../Redux/Story/story.action";  // Import the Redux action

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   border: "0",
//   outline: "none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: ".6rem",
// };

// export default function CreateStoryModal({ handleClose, open }) {
//   const [caption, setCaption] = useState("");
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isLoading, setIsloading] = useState(false);
//   const dispatch = useDispatch();

//   // Function to handle video selection and upload
//   const handleSelectVideo = async (event) => {
//     setIsloading(true);
//     const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
//     setSelectedVideo(videoUrl);
//     setIsloading(false);
//   };

//   // Function to handle story creation after form submission
//   const handleCreateStory = () => {
//     const storyData = { captions: caption, image: selectedVideo };  // Prepare story data
//     dispatch(createStory(storyData));  // Dispatch the action to create a story
//     handleClose();  // Close the modal after submission
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <input
//           placeholder="Write captions..."
//           className="outline-none w-full bg-slate-100 mt-5 p-2"
//           type="text"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}  // Handle caption change
//         />

//         {/* Video upload section */}
//         <div className="flex items-center mt-5">
//           <input
//             type="file"
//             accept="video/*"
//             onChange={handleSelectVideo}
//             style={{ display: "none" }}
//             id="video-input"
//           />
//           <label htmlFor="video-input">
//             <IconButton color="primary" component="span">
//               <VideocamIcon />
//             </IconButton>
//           </label>
//           <span>Video</span>
//         </div>

//         {/* Show selected video */}
//         {selectedVideo && (
//           <div className="mt-4">
//             <video className="h-[10rem]" controls>
//               <source src={selectedVideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}

//         {/* Submit button */}
//         <div className="flex w-full justify-end mt-5">
//           <Button sx={{ borderRadius: "1.5rem" }} variant="contained" onClick={handleCreateStory}>
//             Create
//           </Button>
//         </div>

//         {/* Loading spinner */}
//         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
//           <CircularProgress color="inherit" />
//         </Backdrop>
//       </Box>
//     </Modal>
//   );
// }


// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Avatar, IconButton } from "@mui/material";
// import ImageIcon from "@mui/icons-material/Image";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import ArticleIcon from "@mui/icons-material/Article";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   border: "0",
//   outline:"none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius:".6rem"
// };

// export default function CreateStoryModal({handleClose,open}) {
  

//   return (
    
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div className="">
//             {/* <div className="flex space-x-4 items-center">
//               <Avatar />
//               <div>
//                 <p className="font-bold text-lg">Code with zosh</p>
//                 <p className="text-sm">@codewithzosh</p>
//               </div>
//             </div> */}
//             <input
//                 placeholder="Write captions..."
//                 className="outline-none w-full bg-slate-100 mt-5 p-2"
//                 type="text"
//               />
       
//               <div className="flex items-center mt-5">
               
//               </div>
              
        
//             <div className="flex w-full justify-end">
//                 <Button sx={{borderRadius:"1.5rem"}} variant="contained">Create</Button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
    
//   );
// }

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { useDispatch } from "react-redux";
// import { createStory } from "../../Redux/Story/story.actions";  // Import the Redux action

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   border: "0",
//   outline: "none",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: ".6rem"
// };

// export default function CreateStoryModal({ handleClose, open }) {
//   const [caption, setCaption] = useState("");
//   const dispatch = useDispatch();

//   const handleCreateStory = () => {
//     const storyData = { image: "", captions: caption };  // Prepare story data
//     dispatch(createStory(storyData));  // Dispatch the action to create a story
//     handleClose();  // Close the modal after submission
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <input
//           placeholder="Write captions..."
//           className="outline-none w-full bg-slate-100 mt-5 p-2"
//           type="text"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}  // Handle caption change
//         />
//         <div className="flex w-full justify-end">
//           <Button sx={{ borderRadius: "1.5rem" }} variant="contained" onClick={handleCreateStory}>
//             Create
//           </Button>
//         </div>
//       </Box>
//     </Modal>
//   );
// }
