"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Camera, Loader } from "lucide-react"; // Import the camera icon
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/local/errorMessage";
import toast from "react-hot-toast";
import { editProfileSchema } from "@/lib/zod";
import { uploadImageToCloudinary } from "@/lib/Cloudinary";
import { Separator } from "@/components/ui/separator";
import { UserData } from "@/types";
import {
  useEditProfileMutation,
  useGetUserDetailsQuery,
} from "@/redux/appData";

export default function EditProfileForm({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: Function;
}) {
  const [globalError, setGlobalError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [
    editProfile,
    { isLoading: isEditingProfile, isSuccess, isError, error },
  ] = useEditProfileMutation();
  const {
    data: userDetail,
    isLoading: isLoadingUserDetail,
    error: errorUserDetail,
  } = useGetUserDetailsQuery(undefined);
  console.log(userDetail);
  const userDetailData: UserData = userDetail?.data;
  const [imagePreview, setImagePreview] = useState<string | null>(""); // Image preview state

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      email: userDetailData?.email || "",
      name: userDetailData?.name || "",
      address: userDetailData?.address || "",
      contact: userDetailData?.phone || "",
      password: "",
      image: "",
    },
  });

  React.useEffect(() => {
    if (userDetail) {
      form.reset({
        email: userDetailData?.email || "",
        name: userDetailData?.name || "",
        address: userDetailData?.address || "",
        contact: userDetailData?.phone || "",
        image: "",
        password: undefined,
      });
      setImagePreview(userDetailData?.image || "");
    }
  }, [
    userDetailData?.email,
    userDetailData?.name,
    userDetailData?.address,
    userDetailData?.phone,
    userDetailData?.image,
    form,
    userDetail,
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
  };

  const handleImageClick = () => {
    const inputElement = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };

  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    setGlobalError(""); // Reset global error before submission
    console.log(values);
    try {
      const formData = new FormData();

      formData.append("name", values.name || "");
      formData.append("email", values.email || "");
      formData.append("address", values.address || "");
      formData.append("contact", values.contact || "");
      formData.append("password", values.password || "");

      if (imageFile) {
        formData.append("avatar", imageFile);
      }

      setIsEditing(false);
      const result = await editProfile(formData);
      // console.log(result);

      if (result?.data?.status) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("An unexpected error occurred.");
        setGlobalError("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="">
        {globalError && <ErrorMessage error={globalError} />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 md:flex-row flex-col"
          >
            <div className="md:w-1/2 flex flex-col gap-4 w-full relative">
              {/* Image Preview with Camera Icon */}
              <div
                className="relative cursor-pointer w-[250px] h-[250px]"
                onClick={handleImageClick}
              >
                <Image
                  src={imagePreview || "/images/profile.png"}
                  alt="Profile Preview"
                  width={250}
                  height={250}
                  className="object-contain w-full h-full rounded-lg bg-gray-400 p-1"
                />
                {/* Camera Icon on Top Left */}
                <div className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-lg">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
              </div>

              {/* Hidden Input for Image Upload */}
              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="imageInput" // Add an id to trigger click
                          type="file"
                          accept="image/*"
                          className="hidden" // Hide the input
                          onChange={handleImageUpload}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="md:w-[70%] w-full flex-col flex gap-5">
              {/* Other form fields */}
              <div className="space-y-3 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-gray-500 font-semibold text-[16px]">
                        Name:{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-[2px]">
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-gray-500 font-semibold text-[16px]">
                        Email:{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-[2px]">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            {...field}
                            disabled
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-gray-500 font-semibold text-[16px]">
                        Contact:{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-[2px]">
                          <Input
                            type="text"
                            placeholder="Enter your contact"
                            autoComplete="off"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-gray-500 font-semibold text-[16px]">
                        Address:{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col w-full gap-[2px]">
                          <Input
                            type="text"
                            placeholder="Enter your address"
                            autoComplete="off"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <h2 className="">Change Password</h2>
                <Separator className="my-2" />
                <div className="flex md:flex-row flex-col items-center w-full gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Confirm New Password</FormLabel>

                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  {isEditingProfile ? (
                    <Button
                      disabled
                      className="flex items-center justify-center gap-1 w-full"
                      type="submit"
                    >
                      <span>Updating</span>
                      <Loader className="animate-spin" />
                    </Button>
                  ) : (
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  )}
                </div>
                <div className="w-1/2">
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
