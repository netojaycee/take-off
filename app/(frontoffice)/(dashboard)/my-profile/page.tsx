"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";



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
