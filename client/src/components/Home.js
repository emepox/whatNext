// import Beetjuice from "../img/Beetjuice.png";
// import Bestpickle from "../img/Bestpickle.png";
// import Citric from "../img/Citric.png";
// import Hot from "../img/Hot.png";

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Rating from "react-rating";
// import StoryPreview2 from "./StoryPreview2";

// const axios = require("axios");

// export default function Home() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [story, setStory] = useState(null);

//   useEffect(() => getStory(id), []);

//   const getStory = async (id) => {
//     try {
//       const { data } = await axios.get(`/stories/${id}/`);
//       setStory(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePlay = async (id, first) => {
//     console.log(id, first);
//     navigate(`/story/preview/${id}`);
//   };

//   //TODO: MAKE THIS WORK
//   const handleEdit = (id) => {
//     console.log(`Click edit ${id}`);
//   };

//   return (
//     <div className="" style={{ width: "100%", height: "100%" }}>
//       <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3">
//       <div className="md:container md:mx-auto">
//       <div className="grid justify-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      
      
//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Hot} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Adventure
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar visits the city</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Bestpickle} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Horror
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar tries pickles</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

      
//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Citric} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Love
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar falls in love</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Beetjuice} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Drama
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar doesn't get beets</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

     
//         </div>
      
//       </div>

//       <div className="my-5">
//         <div class="w-full mx-auto mt-20 text-center md:w-10/12">
//             <div class="relative z-0 w-full mt-8">
//                 <div class="relative overflow-hidden shadow-2xl">
//                     <div class="flex items-center flex-none px-4 bg-green-400 rounded-b-none h-11 rounded-xl">
//                         <div class="flex space-x-1.5">
//                             <div class="w-3 h-3 border-2 border-white rounded-full"></div>
//                             <div class="w-3 h-3 border-2 border-white rounded-full"></div>
//                             <div class="w-3 h-3 border-2 border-white rounded-full"></div>
//                         </div>
//                     </div>

//                     <div class="w-full mx-auto mt-20 md:w-5/12 mb-20 ">
//                     <div><StoryPreview2 /></div>
//                     <div><StoryPreview2 /></div>
//                     </div>
//                 </div>
//             </div>
//         </div>

        
//         <div className="mt-20 my-5">
//           <div className="w-72 h-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <div class="flex items-center justify-center text-white font-semibold uppercase absolute w-72 px-5 bg-gray-200 rounded-b-none h-10 rounded-xl"> MOST POPULAR</div>
//                 <img className="mt-10 object-cover h-48 w-screen" src={Beetjuice} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Drama
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar doesn't get beets</a>
//                   <p className="mt-2 mb-7 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Bestpickle} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Horror
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar tries pickles</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>

      
//         <div className="my-5">
//           <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
//             <div className="md:flex">
//               <div className="md:flex-initial">
//                 <img className="object-cover h-48 w-screen" src={Citric} alt="whatever" />
//                 <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
//                   Love
//                   </div>
//                   <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar falls in love</a>
//                   <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                 </div>
//             </div>
//           </div>
//         </div>
      

//       <section>
//         <div class="container max-w-full mx-auto py-24 px-6">
//           <h1 class="text-center text-4xl text-black font-medium leading-snug tracking-wider">
//             Stories
//           </h1>
//           <p class="text-center text-lg text-gray-700 mt-2 px-6">
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//             accusantium doloremque laudantium, totam rem aperiam.
//           </p>
//           <div class="h-1 mx-auto bg-indigo-200 w-24 opacity-75 mt-4 rounded"></div>

//           <div class="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
//             <div class="relative block flex flex-col md:flex-row items-center">
              
//               {/* CARD HOBBIE */}
//               <div class="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
//                 <div class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
//                   <div class="block text-left text-sm sm:text-md text-black">
//                     <img className="object-cover h-48 w-screen" src={Bestpickle} alt="whatever" />
//                     <div className="m-5">
//                       <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3'>
//                         Horror
//                       </div>
//                       <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3">Boar tries pickles</a>
//                       <p className="mt-2 text-gray-500 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                     </div>     
//                   </div>
//                 </div>
//               </div>



//               {/* CARD MOST POPULAR */}
//               <div class="w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg">
//                 <div class="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
//                   Most Popular
//                 </div>
//                 <div class="block text-left text-sm sm:text-md  text-black">
//                     <img className="object-cover h-48 w-screen" src={Beetjuice} alt="whatever" />
//                     <div className="m-5">
//                       <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3'>
//                         Horror
//                       </div>
//                       <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3">Boar tries pickles</a>
//                       <p className="mt-2 text-gray-500 mr-2 mb-20">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                     </div>     
//                   </div>
//               </div>



//               {/* CARD ENTERPRISE */}
//               <div class="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
//                     <div class="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
//                       <div class="block text-left text-sm sm:text-md text-black">
//                         <img className="object-cover h-48 w-screen" src={Citric} alt="whatever" />
//                         <div className="m-5">
//                           <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3'>
//                             Horror
//                           </div>
//                           <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3">Boar tries pickles</a>
//                           <p className="mt-2 text-gray-500 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
//                         </div>     
//                       </div>
//                     </div>
//                   </div>
//               {/* HERE IT ENDS  */}


//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
