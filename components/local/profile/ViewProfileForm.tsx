import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function ViewProfileForm({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: Function;
}) {
  return (
    <div className="flex gap-3 md:flex-row flex-col">
      <div className="md:w-1/2 w-full ">
        <Image
          src={"/images/profile.png"}
          alt=""
          width={250}
          height={250}
          className="bg-gray-300 rounded-lg shadow-md"
        />
      </div>
      <div className="flex flex-col gap-5 md:w-1/2 w-full">
        <div className="">
          <p className="text-gray-500 font-semibold">Name:</p>
          <p className="font-bold md:text-xl">Chun lee silver</p>{" "}
        </div>{" "}
        <div className="">
          <p className="text-gray-500 font-semibold">Email:</p>
          <p className="font-bold md:text-xl">stanleysilver@gmail.com</p>
        </div>{" "}
        <div className="">
          <p className="text-gray-500 font-semibold">Contact:</p>
          <p className="font-bold md:text-xl"> +23480123456789</p>
        </div>{" "}
        <div className="">
          <p className="text-gray-500 font-semibold">Address:</p>
          <p className="font-bold md:text-xl">
            No. 4, greenville, victoria island
          </p>
        </div>
        <Button onClick={setIsEditing(true)}>Edit Profile</Button>
      </div>
    </div>
  );
}
