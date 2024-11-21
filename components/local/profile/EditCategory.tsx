"use client";
import { useEffect, useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/local/errorMessage";
import toast from "react-hot-toast";
import { createCategorySchema } from "@/lib/zod";
import { useEditCategoryMutation } from "@/redux/appData";
import { category } from "@/types";

export default function EditCategory({
  isEditing,
  setIsEditing,
  data,
  isLoading,
}: {
  data: category;
  isEditing: boolean;
  setIsEditing: Function;
  isLoading: boolean;
}) {
  const [globalError, setGlobalError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.thumbnail?.url || null
  ); // Image preview state
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: data?.name || "",
      thumbnail: undefined,
    },
  });

  const [
    editCategory,
    { isLoading: isEditingCategory, isSuccess, isError, error },
  ] = useEditCategoryMutation();

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

  const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
    setGlobalError("");

    try {
      const formData = new FormData();

      formData.append("name", values.name);

      if (imageFile) {
        formData.append("thumbnail", imageFile);
      }

      const result = await editCategory({ formData, id: data._id });
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category updated successfully!");
      // form.reset(); // Reset form values to default
      // setImageFile(null); // Clear the selected file
      // setImagePreview(null);
    } else if (isError) {
      if ("data" in error && typeof error.data === "object") {
        const errorMessage = (error.data as { message?: string })?.message;
        setGlobalError(errorMessage || "Category creation failed.");
        toast.error(errorMessage || "Category creation failed.");
      } else {
        setGlobalError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  }, [isSuccess, isError, error, form]);

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
              <div
                className="relative cursor-pointer"
                onClick={handleImageClick}
              >
                <div className="w-[250px] h-[200px]">
                  <Image
                    src={
                      imagePreview ||
                      "https://via.placeholder.com/250x200.png?text=Click+to+upload+image"
                    }
                    alt="Profile Preview"
                    width={150}
                    height={120}
                    className="object-contain w-full h-full rounded-lg bg-gray-400 p-1"
                  />
                </div>
                {/* Camera Icon on Top Left */}
                <div className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-lg">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
              </div>

              {/* Hidden Input for Image Upload */}
              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="thumbnail"
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

              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  {isEditingCategory ? (
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
