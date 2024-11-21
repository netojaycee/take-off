// "use client";
// import { Button } from "@/components/ui/button";
// import { Facebook, Heart, Instagram, Linkedin } from "lucide-react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Separator } from "@/components/ui/separator";
// import { RiTwitterXFill } from "react-icons/ri";
// import { Rating as ReactRating } from "@smastrom/react-rating";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import * as React from "react";
// import CustomCarousel from "@/components/local/CustomCarousel";
// import ProductCard from "@/components/local/ProductCard";
// import { useGetAllProductQuery, useGetProductByIdQuery } from "@/redux/appData";
// import { AddReview } from "@/components/local/AddReview";
// import { Product, ProductImage } from "@/types";
// import { addToCart } from "@/redux/slices/cartSlice";
// import { useDispatch } from "react-redux";

// const ProductDetails = ({ params }: { params: { id: string } }) => {
//   const dispatch = useDispatch();

//   const { data: productData, isLoading } = useGetProductByIdQuery(params.id);
//   const [selectedImage, setSelectedImage] = useState<string>(""); // Main image state
//   const [rating, setRating] = useState(3);
//   const data = productData?.data;
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = (data: Product | undefined, quantity: number) => {
//     if (data) {
//       dispatch(addToCart({ data, quantity }));
//     }
//   };

//   const {
//     data: relatedProducts,
//     isLoading: isLoadingRelated,
//     error,
//   } = useGetAllProductQuery(undefined);

//   const relatedProductData = isLoadingRelated
//     ? Array(5).fill({})
//     : relatedProducts?.slice(0, 5);

//   useEffect(() => {
//     if (data) {
//       setSelectedImage(data.thumbnail);
//     }
//   }, [data]);

//   if (isLoading) return <p>Loading...</p>;

//   if (!data) return <p>No product found.</p>;

//   const thumbnails: string[] =
//     data && data.images.map((image: ProductImage) => image.url);

//   return (
//     <>
//       <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
//         {/* Left side with main image and thumbnails */}
//         <div className="w-full md:w-1/2 flex flex-col">
//           <div className="w-full h-[300px] mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
//             {selectedImage && (
//               <Image
//                 src={selectedImage}
//                 alt="Product Image"
//                 width={450}
//                 height={450}
//                 className="object-contain w-full h-full"
//                 quality={95}
//               />
//             )}
//           </div>
//           <div className="flex gap-4">
//             {thumbnails
//               .filter((thumbnail) => thumbnail !== selectedImage) // Exclude the selected image
//               .map((thumbnail, index) => (
//                 <div
//                   key={index}
//                   className="cursor-pointer w-[100px] h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
//                   onClick={() => setSelectedImage(thumbnail)}
//                 >
//                   <Image
//                     src={thumbnail}
//                     alt={`Thumbnail ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="object-contain object-center w-full h-full"
//                   />
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Right side with product information */}
//         <div className="w-full md:w-1/2 flex flex-col">
//           <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
//             {data.name}
//           </h1>
//           <span className="flex items-center gap-2">
//             <ReactRating
//               style={{ maxWidth: 100 }}
//               value={rating}
//               onChange={setRating}
//             />
//             <p className="text-sm text-gray-500">(38 Customer reviews)</p>
//           </span>
//           <p className="text-base mt-2 text-[#25252580]">{data.description}</p>
//           <p
//             className={` ${
//               data.quantity < 1 ? "text-red-500" : "text-black"
//             } font-semibold mt-2`}
//           >
//             {data.quantity < 1 ? "Out of stock" : "In stock"}
//           </p>
//           <Separator className="my-2" />

//           <p className="text-2xl font-bold">
//             {new Intl.NumberFormat("en-NG", {
//               style: "currency",
//               currency: "NGN",
//             }).format(data.price)}
//           </p>

//           {/* Quantity and Add to Cart section */}
//           <div className="flex flex-col gap-2">
//             <div className="flex gap-2 mt-4 items-center">
//               <Button
//                 className="text-black hover:text-white bg-gray-300 font-bold"
//                 onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//               >
//                 -
//               </Button>
//               <span className="px-4">{quantity}</span>
//               <Button
//                 className="text-black hover:text-white bg-gray-300 font-bold"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 +
//               </Button>
//             </div>
//             <Button
//               disabled={data.quantity < 1}
//               onClick={() => handleAddToCart(data, quantity)}
//             >
//               Add to Cart
//             </Button>
//             <span className="flex items-center gap-2 text-black cursor-pointer font-semibold">
//               <Heart className="w-5 h-5" /> Save item
//             </span>
//           </div>

//           {/* Product meta information */}
//           <p className="text-gray-700 mt-2">Categories: {data.categoryName}</p>
//           <span className="flex items-center gap-2">
//             <p className="text-gray-700 mt-1">Share this product:</p>
//             <span className="flex items-center gap-2">
//               <Instagram className="w-5 h-5" />
//               <Facebook className="w-5 h-5" />
//               <Linkedin className="w-5 h-5" />
//               <RiTwitterXFill className="w-5 h-5" />
//             </span>
//           </span>
//         </div>
//       </div>

//       <div className="my-4">
//         <Tabs defaultValue="description" className="w-full">
//           <TabsList className="bg-transparent gap-3">
//             <TabsTrigger
//               className="p-0 text-gray-500 aria-selected:font-bold aria-selected:text-black"
//               value="description"
//             >
//               Description
//             </TabsTrigger>
//             <TabsTrigger
//               className="text-gray-500 aria-selected:font-bold aria-selected:text-black"
//               value="reviews"
//             >
//               Reviews
//             </TabsTrigger>
//           </TabsList>
//           <Separator className="my-2" />

//           <TabsContent
//             value="description"
//             className="text-[14px] md:text-[20px] font-[450] text-[#252525]"
//           >
//             {data.description}
//           </TabsContent>
//           <TabsContent value="reviews">
//             <>
//               <AddReview />
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <div key={index} className="flex flex-col gap-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src="/images/shape.png"
//                         alt="Reviewer Image"
//                         width={50}
//                         height={50}
//                         className="object-cover bg-gray-400 rounded-full"
//                       />
//                       <div className="flex flex-col gap-2">
//                         <p className="font-semibold">Anita Honeybeans</p>
//                         <ReactRating style={{ maxWidth: 100 }} value={rating} />
//                       </div>
//                     </div>
//                     <p>16 July, 2024</p>
//                   </div>
//                   <p className="text-[12px] md:text-[16px] lg:text-[20px] text-gray-500">
//                     Lorem ipsum dolor sit amet consectetur. At sagittis lacinia
//                     auctor vitae...
//                   </p>
//                   <Separator className="my-4" />
//                 </div>
//               ))}
//             </>
//           </TabsContent>
//         </Tabs>
//       </div>
//       <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
//         <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
//           You may also like
//         </h1>
//         <CustomCarousel
//           items={relatedProductData}
//           renderCard={(product: Product, index: number) => (
//             <ProductCard
//               key={product.id || index}
//               data={product}
//               isLoading={isLoadingRelated}
//             />
//           )}
//           carouselOpts={{
//             align: "start",
//             loop: true,
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, Heart, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { RiTwitterXFill } from "react-icons/ri";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCarousel from "@/components/local/CustomCarousel";
import ProductCard from "@/components/local/ProductCard";
import { useGetAllProductQuery, useGetProductByIdQuery } from "@/redux/appData";
import { AddReview } from "@/components/local/AddReview";
import { Product, ProductImage } from "@/types";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const { data: productData, isLoading } = useGetProductByIdQuery(params.id);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [rating, setRating] = useState(3);
  const data = productData?.data;
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (data: Product | undefined, quantity: number) => {
    if (data) {
      dispatch(addToCart({ data, quantity }));
    }
  };
   

  const { data: relatedProducts, isLoading: isLoadingRelated } =
    useGetAllProductQuery(undefined);

  const relatedProductData = isLoadingRelated
    ? Array(5).fill({})
    : relatedProducts?.slice(0, 5);

  useEffect(() => {
    if (data) {
      setSelectedImage(data.thumbnail);
    }
  }, [data]);

  const thumbnails: string[] =
    data && data.images.map((image: ProductImage) => image.url);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
        {/* Left side with main image and thumbnails */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full h-[300px] mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="bg-gray-400 w-full h-full" />
            ) : (
              selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Product Image"
                  width={450}
                  height={450}
                  className="object-contain w-full h-full"
                  quality={95}
                />
              )
            )}
          </div>
          <div className="flex gap-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-[100px] h-[100px] bg-gray-400 rounded-md"
                    />
                  ))
              : thumbnails
                  ?.filter((thumbnail) => thumbnail !== selectedImage)
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
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          {isLoading ? (
            <Skeleton className="bg-gray-400 w-3/4 h-6" />
          ) : (
            <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
              {data?.name}
            </h1>
          )}
          <span className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="bg-gray-400 w-[100px] h-[20px]" />
            ) : (
              <>
                <ReactRating
                  style={{ maxWidth: 100 }}
                  value={rating}
                  onChange={setRating}
                />
                <p className="text-sm text-gray-500">(38 Customer reviews)</p>
              </>
            )}
          </span>
          {isLoading ? (
            <Skeleton className="bg-gray-400 w-full h-10" />
          ) : (
            <p className="text-base mt-2 text-[#25252580]">
              {data?.description}
            </p>
          )}
          {isLoading ? (
            <Skeleton className="bg-gray-400 w-1/4 h-6" />
          ) : (
            <p
              className={`${
                data?.quantity < 1 ? "text-red-500" : "text-black"
              } font-semibold mt-2`}
            >
              {data?.quantity < 1 ? "Out of stock" : "In stock"}
            </p>
          )}
          <Separator className="my-2" />

          {isLoading ? (
            <Skeleton className="bg-gray-400 w-[120px] h-6" />
          ) : (
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(data?.price || 0)}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 mt-4 items-center">
              <Button
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                className="text-black hover:text-white bg-gray-300 font-bold"
              >
                -
              </Button>

              <span className="font-semibold px-4">{quantity}</span>

              <Button
                onClick={() => setQuantity(quantity + 1)}
                className="text-black hover:text-white bg-gray-300 font-bold"
              >
                +
              </Button>
            </div>

            <Button
              disabled={isLoading}
              onClick={() => handleAddToCart(data, quantity)}
            >
              Add to Cart
            </Button>

            <span className="flex items-center gap-2 text-black cursor-pointer font-semibold">
              <Heart className="w-5 h-5" /> Save item
            </span>
          </div>

          {/* Product meta information */}
          <div className="text-gray-700 mt-2 ">
            <p className="flex gap-2 items-center">
              Categories:{" "}
              {isLoading ? (
                <Skeleton className="bg-gray-400 w-[200px] h-6" />
              ) : (
                <span className="font-semibold">{data?.categoryName}</span>
              )}
            </p>
          </div>

          <span className="flex items-center gap-2 mt-2">
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
        {isLoading ? (
          <div className="w-full">
            {/* Tabs skeleton */}
            <div className="flex gap-3 mb-2">
              <Skeleton className="bg-gray-400 w-[120px] h-8" />
              <Skeleton className="bg-gray-400 w-[120px] h-8" />
            </div>
            <Separator className="my-2" />

            {/* Tab Content Skeleton */}
            <div className="space-y-4">
              {/* Description Skeleton */}
              <Skeleton className="bg-gray-400 w-full h-6" />
              <Skeleton className="bg-gray-400 w-full h-6" />
              <Skeleton className="bg-gray-400 w-2/3 h-6" />
            </div>
          </div>
        ) : (
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
              {data?.description}
            </TabsContent>
            <TabsContent value="reviews">
              <>
                <AddReview />
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="bg-gray-400 w-[50px] h-[50px] rounded-full" />
                        ) : (
                          <Image
                            src="/images/shape.png"
                            alt="Reviewer Image"
                            width={50}
                            height={50}
                            className="object-cover bg-gray-400 rounded-full"
                          />
                        )}
                        <div className="flex flex-col gap-2">
                          {isLoading ? (
                            <Skeleton className="bg-gray-400 w-[120px] h-6" />
                          ) : (
                            <p className="font-semibold">Anita Honeybeans</p>
                          )}
                          {isLoading ? (
                            <Skeleton className="bg-gray-400 w-[100px] h-4" />
                          ) : (
                            <ReactRating
                              style={{ maxWidth: 100 }}
                              value={rating}
                            />
                          )}
                        </div>
                      </div>
                      {isLoading ? (
                        <Skeleton className="bg-gray-400 w-[80px] h-6" />
                      ) : (
                        <p>16 July, 2024</p>
                      )}
                    </div>
                    {isLoading ? (
                      <Skeleton className="bg-gray-400 w-full h-5" />
                    ) : (
                      <p className="text-[12px] md:text-[16px] lg:text-[20px] text-gray-500">
                        Lorem ipsum dolor sit amet consectetur. At sagittis
                        lacinia auctor vitae...
                      </p>
                    )}
                    <Separator className="my-4" />
                  </div>
                ))}
              </>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
        <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
          You may also like
        </h1>
        <CustomCarousel
          items={relatedProductData}
          renderCard={(product: Product, index: number) => (
            <ProductCard
              key={product.id || index}
              data={product}
              isLoading={isLoadingRelated}
            />
          )}
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
