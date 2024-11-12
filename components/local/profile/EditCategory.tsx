// "use client";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import { Camera, Loader } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ErrorMessage from "@/components/local/errorMessage";
// import toast from "react-hot-toast";
// import { createCategorySchema } from "@/lib/zod";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function EditCategory({
//   isEditing,
//   setIsEditing,
//   id,
// }: {
//   id?: string;
//   isEditing?: boolean;
//   setIsEditing?: Function;
// }) {
//   const [globalError, setGlobalError] = useState<string>("");
//   const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
//     "/images/thumbnail1.png",
//     "/images/thumbnail2.png",
//     "/images/thumbnail3.png",
//     "/images/thumbnail4.png",
//   ]);

//   const form = useForm<z.infer<typeof createCategorySchema>>({
//     resolver: zodResolver(createCategorySchema),
//     defaultValues: {
//       name: "",
//       thumbnail: undefined,
//     },
//   });

//   // Handle image upload for the main and thumbnail images
//   const handleImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const file = event.target.files?.[0] || null;
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const newPreviews = [...imagePreviews];
//         newPreviews[index] = reader.result as string;
//         setImagePreviews(newPreviews);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
//     setGlobalError(""); // Reset global error before submission

//     try {
//       // Upload the image if it exists
//       //   if (imageFile) {
//       //     try {
//       //       const uploadedUrl = await uploadImageToCloudinary(imageFile);
//       //       values.image = uploadedUrl; // Add the image URL to the form values
//       //     } catch (error) {
//       //       console.error("Image upload failed:", error);
//       //       toast.error("Failed to upload image.");
//       //       return;
//       //     }
//       //   }
//       console.log(values);
//       // setIsEditing(false);
//       //   const result = await handleRegister(values);

//       //   if (result?.success === false) {
//       //     toast.error(result.message);
//       //     setGlobalError(result.message); // Display error message
//       //   } else {
//       //     toast.success("Registration successful!");
//       //     const email = result.email || ""; // Provide a default value
//       //     router.push(
//       //       /verify?email=${encodeURIComponent(email)}&action=register
//       //     );
//       //   }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//       setGlobalError("An unexpected error occurred.");
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <>
//       <div className="">
//         {globalError && <ErrorMessage error={globalError} />}
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex gap-3 md:flex-row flex-col  items-center"
//           >
//             <div className="w-full md:w-1/2 flex flex-col">
//               {/* Main Image */}
//               <div className="relative w-full h-auto mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
//                 <Image
//                   src={imagePreviews[0] || "/images/thumbnail1.png"}
//                   alt="Product Image"
//                   width={450}
//                   height={450}
//                   className="object-cover"
//                 />
//                 <div className="absolute top-2 left-2">
//                   <label htmlFor="mainImage">
//                     <Camera className="w-6 h-6 cursor-pointer text-gray-500" />
//                     <input
//                       id="mainImage"
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleImageUpload(e, 0)}
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Thumbnail Images */}
//               <div className="flex gap-4">
//                 {imagePreviews.slice(1).map((preview, index) => (
//                   <div
//                     key={index + 1}
//                     className="relative cursor-pointer w-[100px] h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
//                   >
//                     <Image
//                       src={preview || `/images/thumbnail${index + 2}.png`}
//                       alt={`Thumbnail ${index + 2}`}
//                       width={100}
//                       height={100}
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <label htmlFor={`thumbnail${index + 2}`}>
//                         <Camera className="w-6 h-6 text-gray-500" />
//                         <input
//                           id={`thumbnail${index + 2}`}
//                           type="file"
//                           className="hidden"
//                           onChange={(e) => handleImageUpload(e, index + 1)}
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="md:w-[70%] w-full flex-col flex gap-5">
//               {/* Other form fields */}
//               <div className="space-y-3">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel htmlFor="description" className="text-xs">
//                         Name:
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="text"
//                           placeholder="Enter your name"
//                           autoComplete="off"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex flex-col gap-[13px] w-full">
//                   <Label htmlFor="category" className="text-xs">
//                     Category
//                   </Label>
//                   <Controller
//                     name="category"
//                     control={form.control}
//                     render={({ field: { onChange, value } }) => (
//                       <Select onValueChange={onChange} value={value}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select a category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             <SelectItem value={"shoe"}>Shoe</SelectItem>
//                             <SelectItem value={"clothes"}>Clothes</SelectItem>
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 <div className="flex md:flex-row flex-col items-center gap-3">
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem className="w-full md:w-1/2">
//                         <FormLabel htmlFor="price" className="text-xs">
//                           Price:
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="text"
//                             placeholder="Enter item price"
//                             autoComplete="off"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="stock"
//                     render={({ field }) => (
//                       <FormItem className="w-full md:w-1/2">
//                         <FormLabel htmlFor="stock" className="text-xs">
//                           Stock
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="text"
//                             placeholder="Enter item stock count"
//                             autoComplete="off"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel htmlFor="description" className="text-xs">
//                         Item Description
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea
//                           id="description"
//                           {...field}
//                           placeholder="Type your description here."
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="flex w-full gap-5">
//                 <div className="w-1/2">
//                   {form.formState.isSubmitting ? (
//                     <div className="flex items-center gap-1">
//                       <span>Saving</span>
//                       <Loader className="animate-spin" />
//                     </div>
//                   ) : (
//                     <Button className="w-full" type="submit">
//                       Save
//                     </Button>
//                   )}
//                 </div>
//                 <div className="w-1/2">
//                   <Button className="w-full" variant={"outline"} type="submit">
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// }
"use client"
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
import { useAddCategoryMutation } from "@/redux/appData";

export default function EditCategory({
  isEditing,
  setIsEditing,
  id,
}: {
  id?: string;
  isEditing?: boolean;
  setIsEditing?: Function;
}) {
  const [globalError, setGlobalError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      thumbnail: undefined,
    },
  });

  const [
    addCategory,
    { isLoading: isAddingCategory, isSuccess, isError, error },
  ] = useAddCategoryMutation();

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

      const result = await addCategory(formData);
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category created successfully!");
      form.reset(); // Reset form values to default
      setImageFile(null); // Clear the selected file
      setImagePreview(null);
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
                <div className="w-1/2">
                  <Button className="w-full" variant={"outline"} type="submit">
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
