/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

export const LoaderWithCheck = ({ loading, itemIndex, currentItemId }) => {
  const [checkOpacity, setCheckOpacity] = useState(0);

  // console.log(
  //   "loading: ",
  //   loading,
  //   " itemIndex:",
  //   itemIndex,
  //   "currentItemId:",
  //   currentItemId
  // );
  useEffect(() => {
    if (loading && currentItemId === itemIndex) {
      setTimeout(() => {
        setCheckOpacity(100);
      }, 1000); // Show check mark after 1 second

      setTimeout(() => {
        setCheckOpacity(0);
      }, 4000); // Hide check mark after 4 seconds
    }
  }, [loading, currentItemId, itemIndex]);

  return (
    <div role="status">
      {loading && currentItemId === itemIndex ? (
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-200 animate-spin fill-primary-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: checkOpacity / 100 }}
          className="w-6 h-6 text-green-600"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
      <span className="sr-only">{loading ? "Loading..." : "Success"}</span>
    </div>
  );
};

// import { useEffect, useState } from "react";

// export const LoaderWithCheck = ({ loading, itemIndex }) => {
//   const [checkOpacity, setCheckOpacity] = useState(0);

//   useEffect(() => {
//     if (loading && itemIndex) {
//       setTimeout(() => {
//         setCheckOpacity(100);
//       }, 1000); // 1 seconds

//       setTimeout(() => {
//         setCheckOpacity(0);
//       }, 5000); // 5 seconds
//     }
//   }, [loading, itemIndex]);

//   return (
//     <div role="status">
//       {loading && itemIndex ? (
//         <svg
//           aria-hidden="true"
//           className="w-5 h-5 text-gray-200 animate-spin  fill-primary-600"
//           viewBox="0 0 100 101"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//             fill="currentColor"
//           />
//           <path
//             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//             fill="currentFill"
//           />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           style={{ opacity: checkOpacity / 100 }}
//           className="w-6 h-6 text-green-600"
//           //   width="32"
//           //   height="32"
//           viewBox="0 0 24 24"
//           fill="none"
//         >
//           <path
//             d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
//             fill="currentColor"
//           ></path>
//         </svg>
//       )}
//       <span className="sr-only">{loading ? "Loading..." : "Success"}</span>
//     </div>
//   );
// };
