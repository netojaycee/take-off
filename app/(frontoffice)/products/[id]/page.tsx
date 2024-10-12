"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Heart, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { RiTwitterXFill } from "react-icons/ri";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import CustomCarousel from "@/components/local/CustomCarousel";

import ProductCard from "@/components/local/ProductCard";
import { AddReview } from "@/components/local/AddReview";

const ProductDetails = () => {
  const productData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
  }));
  const [selectedImage, setSelectedImage] = useState("/images/thumbnail1.png"); // Main image state
  const thumbnails = [
    "/images/thumbnail1.png",
    "/images/thumbnail2.png",
    "/images/thumbnail3.png",
    "/images/thumbnail4.png",
  ];

  const [rating, setRating] = useState(3);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
        {/* Left side with main image and thumbnails */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full h-auto mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Product Image"
              width={450}
              height={450}
              className="object-cover"
            />
          </div>
          <div className="flex gap-4">
            {thumbnails
              .filter((thumbnail) => thumbnail !== selectedImage) // Exclude the selected image
              .map((thumbnail, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-[100px h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
                  onClick={() => setSelectedImage(thumbnail)}
                >
                  <Image
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right side with product information */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
            JBL Headphone
          </h1>
          <span className="flex items-center gap-2">
            <ReactRating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />

            <p className="text-sm text-gray-500">(38 Customer reviews)</p>
          </span>
          <p className="text-base mt-2 text-[#25252580]">
            Lorem ipsum dolor sit amet consectetur. At sagittis lacinia auctor
            vitae. Enim risus pellentesque sapien amet aliquam venenatis. Massa
            sed mattis id risus volutpat. Eget at ac cursus ut viverra. Enim at
            id amet viverra sed. Pharetra nullam lorem ut potenti neque nulla.
            Gravida est arcu penatibus purus enim sodales at.
          </p>
          <p className="text-red-500 font-semibold mt-2">Out of stock</p>
          <Separator className="my-2" />

          <p className="text-2xl font-bold">$250</p>

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
          <p className="text-gray-700 mt-2">
            Categories: Electronics and Audio
          </p>
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

      <div className="mt-4">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-transparent gap-3">
            <TabsTrigger
              className=" p-0 text-gray-500 aria-selected:font-bold aria-selected:text-black"
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
            className="text-[14px ]md:text-[20px] font-[450] text-[#252525]"
          >
            Lorem ipsum dolor sit amet consectetur. Molestie sed mattis ultrices
            lorem facilisis at. Purus ornare turpis lacus scelerisque elit arcu
            ut facilisi. Nisl ornare lorem magnis ornare volutpat cras. Egestas
            nulla nulla viverra sed lorem nibh tellus lectus orci. Felis tortor
            scelerisque lacus quis lorem imperdiet id mattis leo. Rhoncus ut dui
            id nec. Nunc amet elementum iaculis lectus lacus. Duis eu aliquam id
            sem diam. Nunc ultrices morbi elit ultricies laoreet faucibus. Mi
            odio enim posuere egestas. Lacus commodo in tortor mus in. Metus id
            mollis sed eleifend dui at ligula. Imperdiet semper viverra egestas
            volutpat lorem tristique pellentesque elit ut. A elit quis aliquam
            felis diam sodales non. Dictumst enim sem placerat fringilla tempus.
            Ornare potenti in quis vel dictum. Vulputate at fermentum augue sem
            neque scelerisque laoreet posuere. Cursus vitae morbi euismod nam
            neque faucibus dolor cursus dui. Viverra sed mauris ipsum sed nunc
            in et aliquam. Vel vivamus lorem condimentum mauris condimentum.
            Nisi enim mauris sed ante auctor massa egestas. Ridiculus blandit
            nibh purus tristique pulvinar bibendum bibendum amet cursus. Felis
            fermentum urna hac nisi morbi lacus. Turpis tempor sit sed dolor
            elementum quam egestas. Gravida massa sit elit massa ipsum. Lectus
            dignissim euismod aliquet lorem. Risus arcu nisi suspendisse arcu id
            adipiscing bibendum. Dignissim odio vestibulum elementum maecenas
            nec molestie. Lacus amet integer aliquam non felis sed dignissim.
            Lorem turpis sed nec molestie ultrices id eros egestas ullamcorper.
            Et est odio neque iaculis ullamcorper. Sed nisl urna pellentesque
            urna elementum. Viverra vestibulum gravida sagittis nibh.{" "}
          </TabsContent>
          <TabsContent value="reviews">
            <>
              <AddReview />
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/shape.png"
                          alt="Product Image"
                          width={50}
                          height={50}
                          className="object-cover bg-gray-400 rounded-full"
                        />
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold ">Anita Honeybeans</p>
                          <ReactRating
                            style={{ maxWidth: 100 }}
                            value={rating}
                            // onChange={setRating}
                          />
                        </div>
                      </div>
                      <p className="">16 July, 2024</p>
                    </div>
                    <p className="text-[12px] md:text-[16px] lg:text-[20px] text-gray-500">
                      Lorem ipsum dolor sit amet consectetur. At sagittis
                      lacinia auctor vitae. Enim risus pellentesque sapien amet
                      aliquam venenatis. Massa sed mattis id risus volutpat.
                      Eget at ac cursus ut viverra. Enim at id amet viverra sed.
                      Pharetra nullam lorem ut potenti neque nulla. Gravida est
                      arcu penatibus purus enim sodales at. Aliquet id accumsan
                      bibendum maecenas in nibh tellus maecenas. Fringilla lacus
                      consequat tellus nibh aliquet fames.
                    </p>
                  </div>
                  <Separator className="my-4" />
                </>
              ))}
            </>
          </TabsContent>
        </Tabs>
      </div>

      <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
        <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
          You may also like
        </h1>
        <CustomCarousel
          items={productData}
          renderCard={() => <ProductCard />}
          carouselOpts={{
            align: "start",
            loop: true,
          }}
        />
      </div>
    </>
  );
};

export default ProductDetails;
