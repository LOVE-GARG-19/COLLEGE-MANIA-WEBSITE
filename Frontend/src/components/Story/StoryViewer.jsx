import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryProgressBar from "./StoryProgress";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStories } from "../../Redux/Story/story.action";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

function StoryViewer() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.story);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const isVideo = (url) => {
    return url?.endsWith(".mp4") || url?.endsWith(".webm") || url?.endsWith(".ogg");
  };

  useEffect(() => {
    dispatch(fetchUserStories(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const currentStory = stories?.[currentStoryIndex];

    if (currentStory && !isVideo(currentStory.image)) {
      const timer = setTimeout(() => {
        handleNextStory();
      }, 4000); // Match duration with StoryProgressBar

      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, stories]);

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setActiveIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full">
      <StoryViewerContainer
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") handleNextStory();
          if (e.key === "ArrowLeft") handlePrevStory();
        }}
      >
        {isVideo(stories?.[currentStoryIndex]?.image) ? (
          <video
            key={currentStoryIndex}
            src={stories?.[currentStoryIndex]?.image}
            autoPlay
            muted
            controls={false}
            onEnded={handleNextStory}
            style={{ maxHeight: "90vh", objectFit: "contain" }}
          />
        ) : (
          <StoryImage
            src={stories?.[currentStoryIndex]?.image}
            alt="Story Image"
          />
        )}
      </StoryViewerContainer>

      <div className="absolute top-0 flex w-full px-4 pt-2 gap-1">
        {stories?.map((story, index) => (
          <StoryProgressBar
            key={index}
            duration={4000}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default StoryViewer;


// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import StoryProgressBar from "./StoryProgress";
// import { useParams } from "react-router-dom";  // Import useParams to access route parameters
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserStories } from "../../Redux/Story/story.action";  // Import the action to fetch stories

// const StoryViewerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #333;
// `;

// const StoryImage = styled.img`
//   max-height: 90vh;
//   object-fit: contain;
// `;

// function StoryViewer() {
//   const { userId } = useParams();  // Access the userId from the URL
//   const dispatch = useDispatch();
//   const { stories } = useSelector((state) => state.story);  // Access stories from Redux
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const isVideo = (url) => {
//     return url?.endsWith(".mp4") || url?.endsWith(".webm") || url?.endsWith(".ogg");
//   };
//   // Fetch user stories when component mounts
//   useEffect(() => {
//     dispatch(fetchUserStories(userId));  // Dispatch the action to fetch stories for this user
//   }, [dispatch, userId]);

//   useEffect(() => {
//     const currentStory = stories?.[currentStoryIndex];
  
//     // if it's an image, set timeout to auto-skip
//     if (currentStory && !isVideo(currentStory.image)) {
//       const timer = setTimeout(() => {
//         handleNextStory();
//       }, 4000); // same as your StoryProgressBar duration
  
//       return () => clearTimeout(timer);
//     }
  
//     // if it's a video, we wait for onEnded (already handled in JSX)
//   }, [currentStoryIndex, stories]);
  
//   const handleNextStory = () => {
//     if (currentStoryIndex < stories?.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//       setActiveIndex(activeIndex + 1);
//     } else {
//       setCurrentStoryIndex(0);
//       setActiveIndex(0);
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex(currentStoryIndex - 1);
//       setActiveIndex(activeIndex - 1);
//     }
//   };

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     handleNextStory();
//   //   }, 2000);

//   //   return () => clearInterval(intervalId);
//   // }, [currentStoryIndex]);

//   return (
//     <div className="relative w-full">
//       <StoryViewerContainer tabIndex={0} onKeyDown={(e) => (e.key === "ArrowRight" ? handleNextStory() : handlePrevStory())}>

//         {/* <StoryImage src={stories?.[currentStoryIndex]?.image} alt="Story Image" /> */}
//         {isVideo(stories?.[currentStoryIndex]?.image) ? (
//     <video
//       key={currentStoryIndex}
//       src={stories?.[currentStoryIndex]?.image}
//       autoPlay
//       muted
//       controls={false}
//       onEnded={handleNextStory}
//       style={{ maxHeight: "90vh", objectFit: "contain" }}
//     />
//   ) : (
//     <StoryImage
//       src={stories?.[currentStoryIndex]?.image}
//       alt="Story Image"
//     />
//   )}

//       </StoryViewerContainer>
//       <div className="absolute top-0 flex w-full">
//         {stories?.map((story, index) => (
//           <StoryProgressBar key={index} duration={4000} index={index} activeIndex={activeIndex} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StoryViewer;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import StoryProgressBar from './StoryProgress';


// const StoryViewerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #333;
  
// `;

// const StoryImage = styled.img`
  
//   max-height: 90vh;
//   object-fit: contain;
// `;

// function StoryViewer({ stories }) {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [currentUserStoryIndex,setCurrentUserStoryIndex]=useState(0);


//   const [activeIndex, setActiveIndex] = useState(0);

  
//   const handleNextStory = () => {
//     if (currentStoryIndex < stories?.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//       setActiveIndex(activeIndex+1)
//     }
//     else if(currentStoryIndex===stories?.length-1){
//       setCurrentStoryIndex(0)
//       setActiveIndex(0)
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex(currentStoryIndex - 1);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowRight') {
//       handleNextStory();
//     } else if (event.key === 'ArrowLeft') {
//       handlePrevStory();
//     }
//   };
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       handleNextStory();
      
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, [currentStoryIndex]);

//   console.log("story ---- ",stories)

//   return (
//     <div className='relative w-full'>
//        <StoryViewerContainer tabIndex={0} onKeyDown={handleKeyDown}>
//       { <StoryImage src={stories?.[currentStoryIndex].image} alt="story image"/>}
   
//     </StoryViewerContainer>
//     <div className='absolute top-0 flex w-full'>
//       {stories.map((story, index) => (
//         <StoryProgressBar
//           key={index}
//           duration={2000}
//           index={index}
//           activeIndex={activeIndex}
//           // setActiveIndex={setActiveIndex}
//         />
//       ))}
//     </div>
    
//     </div>
   
//   );
// }
//  export default StoryViewer;



//  import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import StoryProgressBar from "./StoryProgress";

// const StoryViewerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #333;
// `;

// const StoryImage = styled.img`
//   max-height: 90vh;
//   object-fit: contain;
// `;

// function StoryViewer({ stories }) {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNextStory = () => {
//     if (currentStoryIndex < stories?.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//       setActiveIndex(activeIndex + 1);
//     } else {
//       setCurrentStoryIndex(0);
//       setActiveIndex(0);
//     }
//   };

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex(currentStoryIndex - 1);
//       setActiveIndex(activeIndex - 1);
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       handleNextStory();
//     }, 2000);  // Story duration

//     return () => clearInterval(intervalId);
//   }, [currentStoryIndex]);

//   return (
//     <div className="relative w-full">
//       <StoryViewerContainer tabIndex={0} onKeyDown={(e) => (e.key === "ArrowRight" ? handleNextStory() : handlePrevStory())}>
//         <StoryImage src={stories?.[currentStoryIndex].image} alt="Story Image" />
//       </StoryViewerContainer>
//       <div className="absolute top-0 flex w-full">
//         {stories.map((story, index) => (
//           <StoryProgressBar key={index} duration={2000} index={index} activeIndex={activeIndex} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StoryViewer;
