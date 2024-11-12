"use client";

import { useState } from "react";
import React from "react";
import EditCategory from "@/components/local/profile/EditCategory";
import ViewCategory from "@/components/local/profile/ViewCategory";

export default function CategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      {isEditing ? (
        <EditCategory
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          id={params.id}
        />
      ) : (
        <ViewCategory isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
