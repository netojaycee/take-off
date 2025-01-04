"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SquarePen, ShoppingCart, Trash, Heart } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CustomDialog } from "./profile/CustomDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slices/favoriteSlice";
import { FavoritesState, Product } from "@/types";

export default function ProductCard({
  profile,
  data,
  isLoading,
  p,
}: {
  profile?: boolean;
  data?: Product | undefined;
  isLoading: boolean;
  p?: boolean;
}) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const favoriteItems: Product[] = useSelector(
    (state: FavoritesState) => state.favorites.favoriteItems
  );
  // console.log(favoriteItems);
  const isFavorite = favoriteItems.some((item) => item.id === data?.id);

  const handleAddToCart = (data: Product | undefined) => {
    dispatch(addToCart({data}));
  };

  const handleToggleFavorite = (data: Product | undefined) => {
    if (!isFavorite) {
      dispatch(addToFavorites(data));
    } else {
      dispatch(removeFromFavorites(data));
    }
  };
  return (
    <div className={`${p ? "  " : "  "} flex flex-col`}>
      <Link
        href={isLoading ? "#" : `/products/${data?.id}`}
        className="bg-[#F6F6F6] p-5 flex items-center justify-center w-full md:h-[260px] lg:h-[310px] h-[141px]"
      >
        {isLoading ? (
          <Skeleton className="w-full h-full object-center object-contain bg-gray-400" />
        ) : (
          <Image
            src={data?.thumbnail || "/images/blender.png"}
            alt={data?.name || "Product Image"}
            width={209}
            height={104}
            className="w-full h-full object-center object-contain"
          />
        )}
      </Link>

      <div className="flex justify-between items-center p-1">
        <div className="flex flex-col w-full">
          {isLoading ? (
            <>
              <Skeleton className=" bg-gray-400 h-4 w-3/4 mb-1" />{" "}
              {/* Title skeleton */}
              <Skeleton className=" bg-gray-400 h-3 w-1/2" />{" "}
              {/* Price skeleton */}
            </>
          ) : (
            <>
              <h2 className="text-[10px] md:text-[14px] text-black font-semibold line-clamp-1 w-[90%]">
                {data?.name}
              </h2>
              <h2 className="text-[8px] md:text-[12px] text-[rgba(37, 37, 37, 0.63)]">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(Number(data?.price))}
              </h2>
            </>
          )}
        </div>

        {profile ? (
          <div className="flex gap-4 items-center">
            {isLoading ? (
              <>
                <Skeleton className=" bg-gray-400 w-5 h-5" />{" "}
                {/* Edit icon skeleton */}
                <Skeleton className=" bg-gray-400 w-5 h-5" />{" "}
                {/* Trash icon skeleton */}
              </>
            ) : (
              <>
                <SquarePen
                  onClick={() => router.push(`/my-items/${data?.id}`)}
                  className="w-5 h-5 cursor-pointer"
                />
                <Trash
                  onClick={() => setDialogOpen(true)}
                  className="w-5 h-5 cursor-pointer text-red-500"
                />
              </>
            )}
          </div>
        ) : isLoading ? (
          <div className="flex gap-4 items-center">
            <Skeleton className=" bg-gray-400 w-7 h-7" />
            <Skeleton className=" bg-gray-400 w-7 h-7" />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            {isFavorite ? (
              <FaHeart
                className="cursor-pointer w-5 h-5 text-red-500"
                onClick={() => handleToggleFavorite(data)}
              />
            ) : (
              <FaRegHeart
                className="cursor-pointer w-5 h-5 text-red-500"
                onClick={() => handleToggleFavorite(data)}
              />
            )}
            <ShoppingCart
              onClick={() => handleAddToCart(data)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        )}
      </div>

      <CustomDialog
        open={isDialogOpen}
        onOpenChange={(open) => setDialogOpen(open)}
        title={"product"}
        data={data}
      />
    </div>
  );
}
