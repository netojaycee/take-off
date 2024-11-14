"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Heart, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { RiTwitterXFill } from "react-icons/ri";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import CustomCarousel from "@/components/local/CustomCarousel";
import ProductCard from "@/components/local/ProductCard";
import { useGetProductByIdQuery } from "@/redux/appData";
import { AddReview } from "@/components/local/AddReview";
import { ProductImage } from "@/types";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { data: productData, isLoading } = useGetProductByIdQuery(params.id);
  const [selectedImage, setSelectedImage] = useState<string>(""); // Main image state
  const [rating, setRating] = useState(3);
  const data = productData?.data;

  useEffect(() => {
    if (data) {
      setSelectedImage(data.thumbnail);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No product found.</p>;

  const thumbnails: string[] =
    data && data.images.map((image: ProductImage) => image.url);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
        {/* Left side with main image and thumbnails */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full h-[300px] mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Product Image"
                width={450}
                height={450}
                className="object-contain w-full h-full"
                quality={95}
              />
            )}
          </div>
          <div className="flex gap-4">
            {thumbnails
              .filter((thumbnail) => thumbnail !== selectedImage) // Exclude the selected image
              .map((thumbnail, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-[100px] h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
                  onClick={() => setSelectedImage(thumbnail)}
                >
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-contain object-center w-full h-full"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right side with product information */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
            {data.name}
          </h1>
          <span className="flex items-center gap-2">
            <ReactRating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
            <p className="text-sm text-gray-500">(38 Customer reviews)</p>
          </span>
          <p className="text-base mt-2 text-[#25252580]">{data.description}</p>
          <p
            className={` ${
              data.quantity < 1 ? "text-red-500" : "text-black"
            } font-semibold mt-2`}
          >
            {data.quantity < 1 ? "Out of stock" : "In stock"}
          </p>
          <Separator className="my-2" />

          <p className="text-2xl font-bold">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(data.price)}
          </p>

          {/* Quantity and Add to Cart section */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 mt-4 items-center">
              <Button className="text-black hover:text-white bg-gray-300 font-bold">
                -
              </Button>
              1
              <Button className="text-black hover:text-white bg-gray-300 font-bold">
                +
              </Button>
            </div>
            <Button>Add to Cart</Button>
            <span className="flex items-center gap-2 text-black cursor-pointer font-semibold">
              <Heart className="w-5 h-5" /> Save item
            </span>
          </div>

          {/* Product meta information */}
          <p className="text-gray-700 mt-2">Categories: {data.categoryName}</p>
          <span className="flex items-center gap-2">
            <p className="text-gray-700 mt-1">Share this product:</p>
            <span className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <Facebook className="w-5 h-5" />
              <Linkedin className="w-5 h-5" />
              <RiTwitterXFill className="w-5 h-5" />
            </span>
          </span>
        </div>
      </div>

      <div className="my-4">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-transparent gap-3">
            <TabsTrigger
              className="p-0 text-gray-500 aria-selected:font-bold aria-selected:text-black"
              value="description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="text-gray-500 aria-selected:font-bold aria-selected:text-black"
              value="reviews"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <Separator className="my-2" />

          <TabsContent
            value="description"
            className="text-[14px] md:text-[20px] font-[450] text-[#252525]"
          >
            {data.description}
          </TabsContent>
          <TabsContent value="reviews">
            <>
              <AddReview />
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/shape.png"
                        alt="Reviewer Image"
                        width={50}
                        height={50}
                        className="object-cover bg-gray-400 rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold">Anita Honeybeans</p>
                        <ReactRating style={{ maxWidth: 100 }} value={rating} />
                      </div>
                    </div>
                    <p>16 July, 2024</p>
                  </div>
                  <p className="text-[12px] md:text-[16px] lg:text-[20px] text-gray-500">
                    Lorem ipsum dolor sit amet consectetur. At sagittis lacinia
                    auctor vitae...
                  </p>
                  <Separator className="my-4" />
                </div>
              ))}
            </>
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
        <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
          You may also like
        </h1>
        <CustomCarousel
          items={productData}
          renderCard={() => <ProductCard  data={""}/>}
          carouselOpts={{
            align: "start",
            loop: true,
          }}
        />
      </div> */}
    </>
  );
};

export default ProductDetails;
