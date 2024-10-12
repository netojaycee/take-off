"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

// export default function MyProfile() {
//   // State to toggle between view and edit modes
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "Chun lee silver",
//     email: "stanleysilver@gmail.com",
//     contact: "+23480123456789",
//     address: "No. 4, Greenville, Victoria Island",
//     image: "/images/profile.png",
//   });

//   // Function to handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Function to handle image change
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setProfileData((prev) => ({ ...prev, image: imageUrl }));
//     }
//   };

//   // Function to save changes
//   const saveProfile = () => {
//     setIsEditing(false);
//     console.log("Profile saved:", profileData);
//   };

//   // Function to cancel editing
//   const cancelEdit = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="py-10 px-10 md:py-[50px] md:px-[70px] border rounded-md">
//       <div className="flex gap-3 md:flex-row flex-col md:w-[80%] mx-auto">
//         <div className="md:w-1/2 w-full">
//           {/* Profile Image */}
//           <Image
//             src={profileData.image}
//             alt="Profile Picture"
//             width={250}
//             height={250}
//             className="bg-gray-300 rounded-lg shadow-md"
//           />

//           {/* Image Upload */}
//           {isEditing && (
//             <div className="mt-4">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//           )}
//         </div>

//         {/* Profile Details */}
//         <div className="flex flex-col gap-5 md:w-1/2 w-full">
//           {isEditing ? (
//             <>
//               {/* Editable Form */}
//               <div className="flex flex-row items-center">
//                 <p className="text-gray-500 font-semibold mr-4">Name:</p>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={profileData.name}
//                   onChange={handleInputChange}
//                   className="w-full"
//                 />
//               </div>

//               <div className="flex flex-row items-center">
//                 <p className="text-gray-500 font-semibold mr-4">Email:</p>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={profileData.email}
//                   onChange={handleInputChange}
//                   className="w-full"
//                 />
//               </div>

//               <div className="flex flex-row items-center">
//                 <p className="text-gray-500 font-semibold mr-4">Contact:</p>
//                 <Input
//                   type="text"
//                   name="contact"
//                   value={profileData.contact}
//                   onChange={handleInputChange}
//                   className="w-full"
//                 />
//               </div>

//               <div className="flex flex-row items-center">
//                 <p className="text-gray-500 font-semibold mr-4">Address:</p>
//                 <Input
//                   type="text"
//                   name="address"
//                   value={profileData.address}
//                   onChange={handleInputChange}
//                   className="w-full"
//                 />
//               </div>

//               {/* Save and Cancel Buttons */}
//               <div className="flex gap-4 mt-5">
//                 <Button className="w-1/2" onClick={saveProfile}>Save</Button>
//                 <Button className="w-1/2" variant="outline" onClick={cancelEdit}>
//                   Cancel
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Profile View */}
//               <div>
//                 <p className="text-gray-500 font-semibold">Name:</p>
//                 <p className="font-bold md:text-xl">{profileData.name}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-semibold">Email:</p>
//                 <p className="font-bold md:text-xl">{profileData.email}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-semibold">Contact:</p>
//                 <p className="font-bold md:text-xl">{profileData.contact}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-semibold">Address:</p>
//                 <p className="font-bold md:text-xl">{profileData.address}</p>
//               </div>

//               <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import ViewProfileForm from "@/components/local/profile/ViewProfileForm";
import EditProfileForm from "@/components/local/profile/EditProfileForm";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      {isEditing ? (
        <EditProfileForm isEditing={isEditing} setIsEditing={setIsEditing} />
      ) : (
        <ViewProfileForm isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
