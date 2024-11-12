"use client";

import { useState } from "react";
import React from "react";
import ViewItem from "@/components/local/profile/ViewItem";
import EditItem from "@/components/local/profile/EditItem";

export default function MyItemsDetails({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      {isEditing ? (
        <EditItem
          type="edit"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          data={""}
        />
      ) : (
        <ViewItem data={""} isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
