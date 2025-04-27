// import React, { useState, useEffect } from "react";
// import "./StoryProgress.css";

// const StoryProgressBar = ({ duration, index, activeIndex, setActiveIndex }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress < 100) {
//           return prevProgress + 1;
//         }

//         clearInterval(interval);
//         return prevProgress;
//       });
//     }, duration / 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [duration, activeIndex]);

//   useEffect(() => {
//     setProgress(0);
//   }, [activeIndex]);

//   const isActive = index === activeIndex;

//   return (
//     <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
//       <div
//         className={`${isActive ? "progress-bar" : ""}`}
//         style={{ width: ` ${progress}%` }}
//       ></div>
//     </div>
//   );
// };

// export default StoryProgressBar;

import React, { useState, useEffect } from "react";
import "./StoryProgress.css";

const StoryProgressBar = ({ duration, index, activeIndex }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (index === activeIndex) {
      setProgress(0); // Reset before starting
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, duration / 100); // duration split into 100 steps
    } else {
      setProgress(index < activeIndex ? 100 : 0); // filled for previous, empty for upcoming
    }

    return () => clearInterval(interval);
  }, [duration, activeIndex, index]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default StoryProgressBar;

// import React, { useState, useEffect } from "react";
// import "./StoryProgress.css";

// const StoryProgressBar = ({ duration, index, activeIndex }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let interval;
  
//     if (index === activeIndex) {
//       setProgress(0);
//       interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             return 100;
//           }
//           return prev + 1;
//         });
//       }, duration / 100);
//     }
  
//     return () => clearInterval(interval);
//   }, [duration, activeIndex, index]);

//   useEffect(() => {
//     setProgress(0);
//   }, [activeIndex]);

//   const isActive = index === activeIndex;

//   return (
//     <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
//       <div className={`${isActive ? "progress-bar" : ""}`} style={{ width: `${progress}%` }}></div>
//     </div>
//   );
// };

// export default StoryProgressBar;
