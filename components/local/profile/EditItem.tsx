"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Camera, Loader } from "lucide-react";
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
import { editItemSchema } from "@/lib/zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetAllCategoryQuery,
} from "@/redux/appData";
import { category } from "@/types";

export default function EditItem({
  isEditing,
  setIsEditing,
  data,
  type,
}: {
  data?: any;
  isEditing?: boolean;
  setIsEditing?: Function;
  type: string;
}) {
  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetAllCategoryQuery(undefined);
  const categories = (dataCategory?.category || []) as category[];

  const [
    editProduct,
    {
      isLoading: isEditingProduct,
      isSuccess: isSuccessProduct,
      isError: isErrorProduct,
      error: errorProduct,
    },
  ] = useEditProductMutation();
  const [
    addProduct,
    { isLoading: isAddingProduct, isSuccess, isError, error },
  ] = useAddProductMutation();

  const [globalError, setGlobalError] = useState<string>("");
  const [imageFile, setImageFile] = useState<(File | null)[]>([]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    "/images/thumbnail1.png",
    "/images/thumbnail2.png",
    "/images/thumbnail3.png",
    "/images/thumbnail4.png",
  ]);

  const form = useForm<z.infer<typeof editItemSchema>>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      price: "",
      quantity: "",
      description: "",
      images: [],
    },
  });

  // Handle image upload for the main and thumbnail images
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof editItemSchema>) => {
    setGlobalError(""); // Reset global error before submission

    try {
      // if (type === "add") {
        console.log("add");
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        formData.append("quantity", values.quantity.toString());
        formData.append("price", values.price.toString());

        imageFile.forEach((file, index) => {
          if (file) {
            formData.append("images", file); // Append each file to "images"
          }
        });

        const result = await addProduct(formData);
        console.log(result);
      // } else {
      //   console.log("edit");
      // }
      console.log(values);
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
            className="flex gap-3 md:flex-row flex-col  items-center"
          >
            <div className="w-full md:w-1/2 flex flex-col">
              {/* Main Image */}
              <div className="relative w-full h-auto mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
                <div className="w-[300px] h-[300px]">
                  <Image
                    src={imagePreviews[0] || "/images/thumbnail1.png"}
                    alt="Product Image"
                    width={450}
                    height={450}
                    className="object-contain cursor-pointer w-full h-full"
                  />
                </div>
                <div className="absolute top-2 left-2">
                  <label htmlFor="mainImage">
                    <Camera className="w-6 h-6 cursor-pointer text-gray-500" />
                    <input
                      id="mainImage"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 0)}
                    />
                  </label>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4">
                {imagePreviews.slice(1).map((preview, index) => (
                  <div
                    key={index + 1}
                    className="relative  w-[100px] h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
                  >
                    <div className="w-[90px] h-[90px]">
                      <Image
                        src={preview || `/images/thumbnail${index + 2}.png`}
                        alt={`Thumbnail ${index + 2}`}
                        width={100}
                        height={100}
                        className="object-contain object-center w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <label htmlFor={`thumbnail${index + 2}`}>
                        <Camera className="w-6 h-6 text-gray-500 cursor-pointer" />
                        <input
                          id={`thumbnail${index + 2}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, index + 1)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-[70%] w-full flex-col flex gap-5">
              {/* Other form fields */}
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description" className="text-xs">
                        Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-[13px] w-full">
                  <Label htmlFor="category" className="text-xs">
                    Category
                  </Label>
                  <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-auto">
                          <SelectGroup>
                            {categories.length > 0 ? (
                              categories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="flex items-center gap-1 text-xs">
                                No categories available.
                                <Loader className="animate-spin" />
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex md:flex-row flex-col items-center gap-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel htmlFor="price" className="text-xs">
                          Price:
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter item price"
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
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel htmlFor="quantity" className="text-xs">
                          Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter item quantity count"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description" className="text-xs">
                        Item Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          {...field}
                          placeholder="Type your description here."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                {isAddingProduct || isEditingProduct ? (
                  <Button
                    disabled
                    className="flex items-center justify-center gap-1 w-full"
                    type="submit"
                  >
                    <span>Please wait</span>
                    <Loader className="animate-spin" />
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Save
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
