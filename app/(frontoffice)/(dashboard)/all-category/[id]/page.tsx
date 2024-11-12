"use client";

import { useState } from "react";
import React from "react";
import EditCategory from "@/components/local/profile/EditCategory";
import ViewCategory from "@/components/local/profile/ViewCategory";
import { useGetCategoryByIdQuery } from "@/redux/appData";

export default function CategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useGetCategoryByIdQuery(params.id);
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      {isEditing ? (
        <EditCategory
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          data={data.category}
        />
      ) : (
        <ViewCategory
          data={data.category}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}
