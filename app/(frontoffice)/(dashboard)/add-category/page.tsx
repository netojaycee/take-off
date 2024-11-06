"use client";
import { useState } from "react";
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
import { createCategorySchema } from "@/lib/zod";
import { uploadImageToCloudinary } from "@/lib/Cloudinary";

export default function AddCategoryForm() {
  const [globalError, setGlobalError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: "jkjj",
    },
  });

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
      inputElement.click(); // Trigger file input click when image is clicked
    }
  };

  const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
    setGlobalError(""); // Reset global error before submission

    try {
      // Upload the image if it exists
      //   if (imageFile) {
      //     try {
      //       const uploadedUrl = await uploadImageToCloudinary(imageFile);
      //       values.image = uploadedUrl; // Add the image URL to the form values
      //     } catch (error) {
      //       console.error("Image upload failed:", error);
      //       toast.error("Failed to upload image.");
      //       return;
      //     }
      //   }
      console.log(values);

      //   const result = await handleRegister(values);

      //   if (result?.success === false) {
      //     toast.error(result.message);
      //     setGlobalError(result.message); // Display error message
      //   } else {
      //     toast.success("Registration successful!");
      //     const email = result.email || ""; // Provide a default value
      //     router.push(
      //       `/verify?email=${encodeURIComponent(email)}&action=register`
      //     );
      //   }
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
            className="flex gap-3 flex-col md:w-[85%] mx-auto items-center"
          >
            <div className="flex flex-col gap-4 w-full relative">
              {/* Image Preview with Camera Icon */}
              <div
                className="relative cursor-pointer"
                onClick={handleImageClick}
              >
                <Image
                  src={imagePreview || "/images/profile.png"}
                  alt="Profile Preview"
                  width={250}
                  height={250}
                  className="object-cover rounded-lg bg-gray-400 p-1"
                />
                {/* Camera Icon on Top Left */}
                <div className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-lg">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
              </div>

              {/* Hidden Input for Image Upload */}
              <div className="flex gap-1">
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

            <div className="w-full flex-col flex gap-5">
              {/* Other form fields */}
              <div className="space-y-3 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      {/* <FormLabel className="text-gray-500 font-semibold text-[16px]">
                        Name:{" "}
                      </FormLabel> */}
                      <FormControl>
                        <div className="flex flex-col w-full gap-[2px]">
                          <Input
                            type="text"
                            placeholder="Enter category name"
                            autoComplete="off"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full gap-5 justify-end">
                <div className="w-1/2">
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-1">
                      <span>Saving</span>
                      <Loader className="animate-spin" />
                    </div>
                  ) : (
                    <Button className="w-full" type="submit">
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
