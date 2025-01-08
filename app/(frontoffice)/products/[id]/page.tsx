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
import {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
} from "@/redux/appData";
import { AddReview } from "@/components/local/AddReview";
import { FavoritesState, Product, ProductImage, Reviews } from "@/types";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Chat from "@/components/local/Chat";
import PaginationComponent from "@/components/local/PaginationComponent";
import ReviewCard from "./ReviewCard";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slices/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const productId = params.id;
  const { data: productData, isLoading } = useGetProductByIdQuery(productId);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [rating, setRating] = useState(3);
  const data = productData?.data;
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const handleAddToCart = (data: Product | undefined, quantity: number) => {
    if (data) {
      dispatch(addToCart({ data, quantity }));
    }
  };

  const { data: relatedProducts, isLoading: isLoadingRelated } =
    useGetAllProductQuery({ page: 1, limit: 10 });

  const { data: review, isLoading: isLoadingReviews } =
    useGetProductReviewsQuery({ productId, page, limit });
  const reviews: Reviews[] = review?.reviews;
  console.log(reviews && reviews);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const totalPages = reviews && review?.pagination?.totalPages;

  const relatedProductData = isLoadingRelated
    ? Array(5).fill({})
    : relatedProducts?.data?.slice(0, 5);

  useEffect(() => {
    if (data) {
      setSelectedImage(data.thumbnail);
    }
  }, [data]);

  const thumbnails: string[] =
    data && data.images.map((image: ProductImage) => image.url);

  const favoriteItems: Product[] = useSelector(
    (state: FavoritesState) => state.favorites.favoriteItems
  );
  // console.log(favoriteItems);
  const isFavorite = favoriteItems.some((item) => item.id === data?.id);

  const handleToggleFavorite = (data: Product | undefined) => {
    if (!isFavorite) {
      dispatch(addToFavorites(data));
    } else {
      dispatch(removeFromFavorites(data));
    }
  };

  // console.log("dd",data)
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
        <div className="w-full md:w-1/2 flex flex-col gap-1 p-3">
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
                !data?.inStock ? "text-red-500" : "text-green-300"
              } font-semibold mt-2`}
            >
              {!data?.inStock ? "Out of stock" : "In stock"}
            </p>
          )}
          <div className="">
            {" "}
            <Chat reciepient="seller" receiverId={data?.seller} />
          </div>

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

          <div className="flex flex-col gap-3">
            {" "}
            <div className="flex md:flex-row mt-4 flex-col gap-5 items-center">
              <div className="flex gap-2  items-center">
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
            </div>
            <span
              onClick={() => handleToggleFavorite(data)}
              className="md:w-[150px] text-sm justify-center hover:bg-gray-300 flex items-center gap-2 text-black cursor-pointer font-semibold border border-gray-300 p-2 rounded-[30px] "
            >
              {isFavorite ? (
                <FaHeart className=" w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-red-500" />
              )}{" "}
              save item
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
              className="text-[14px] md:text-[17px] font-[450] text-[#252525]"
            >
              {data?.description}
            </TabsContent>
            <TabsContent value="reviews">
              <>
                <AddReview product={params.id} />
                {reviews &&
                  reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      review={review}
                      isLoading={isLoading || isLoadingReviews}
                    />
                  ))}

                <PaginationComponent
                  placement="justify-end"
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  onPageChange={handlePageChange}
                  currentPage={page}
                  totalPages={totalPages || 1}
                />
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
