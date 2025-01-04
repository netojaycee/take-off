"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   useGetUserOrderByIdQuery,
//   useUpdateOrderMutation,
// } from "@/redux/appData";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";
import ErrorMessage from "@/components/local/errorMessage";
import { CartType, Order, RootState, UserData } from "@/types";
import { checkoutSchema } from "@/lib/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useGetUserDetailsQuery,
} from "@/redux/appData";
import { clearCart } from "@/redux/slices/cartSlice";

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const cart = useSelector((state: { cart: CartType }) => state.cart);
  const { cartItems } = cart;
  const [globalError, setGlobalError] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: userDetail,
    isLoading: isLoadingUserDetail,
    error: errorUserDetail,
  } = useGetUserDetailsQuery(undefined);
  console.log(userDetail);
  const userDetailData: UserData = userDetail?.data;
  //   const order: Order = data?.order;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: userDetailData?.email || "",
      name: userDetailData?.name || "",
      address: userDetailData?.address || "",
      phone: userDetailData?.phone || "",
      note: "",
    },
  });

  React.useEffect(() => {
    if (userDetail) {
      form.reset({
        email: userDetailData?.email || "",
        name: userDetailData?.name || "",
        address: userDetailData?.address || "",
        phone: userDetailData?.phone || "",
        note: "",
      });
    }
  }, [
    userDetailData?.email,
    userDetailData?.name,
    userDetailData?.address,
    userDetailData?.phone,
    form,
    userDetail,
  ]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const onSubmit = async (values: CheckoutFormValues) => {
    setGlobalError("");
    try {
      if (!termsAccepted) {
        setGlobalError(
          "Please read and accept the terms and conditions to proceed with your order."
        );

        window.scrollTo({ top: 0, behavior: "smooth" });

        return;
      }

      const cartData = cart.cartItems.map((item) => ({
        product: {
          _id: item?.id,
          sellerId: item?.seller,
          price: item?.price,
        },
        quantity: item.cartQuantity,
      }));
      const nameParts = values.name.trim().split(" ");

      // Set first name to the full name or first part
      const first_name = nameParts[0] || null;

      // Set last name to the second part, if it exists
      const last_name =
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

      const credentials = {
        first_name: first_name || "",
        last_name: last_name || "",
        email: userDetailData?.email,
        amount: cart.cartTotalAmount * 100,
        metadata: {
          name: userDetailData?.name || "",
          address: values.address || "",
          phone: values.phone || "",
          note: values.note,
          totalPrice: cart.cartTotalAmount,
          cart: cartData,
        },
      };

      console.log(credentials);

      const result = await createOrder(credentials);
      console.log(result);
      if (result?.data?.data?.authorization_url) {
        toast.success("Payment started successfully!");
        form.reset();
        dispatch(clearCart());

        router.push(`${result?.data?.data?.authorization_url}`);
      } else {
        toast.error("Failed to process payment.");
      }
    } catch (error) {
      // toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    if (
      termsAccepted &&
      globalError ===
        "Please read and accept the terms and conditions to proceed with your order."
    ) {
      setGlobalError("");
      return;
    }
  }, [globalError, termsAccepted]);

  if (isLoadingUserDetail) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (errorUserDetail) {
    notFound();
  }

  return (
    <div className=" px-2 md:px-10 my-10">
      <div className="flex lg:flex-row flex-col gap-6 items-start">
        {/* Billing Details */}
        <div className="border rounded-lg p-5 w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

          <div className="">
            {globalError && <ErrorMessage error={globalError} />}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="p-5 bg-gray-100"
                          type="text"
                          placeholder="Enter your full name"
                          autoComplete="off"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          className="p-5 bg-gray-100"
                          type="text"
                          placeholder="Enter your delivery address"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center md:flex-row flex-col gap-2 md:gap-5 w-full">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="p-5 bg-gray-100 w-full"
                              type="email"
                              placeholder="Enter your email"
                              autoComplete="off"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              className="p-5 bg-gray-100 w-full"
                              type="text"
                              placeholder="Enter your phone number"
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
                <Separator className="my-5" />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" bg-gray-100"
                          placeholder="Notes about your order e.g special notes for your delivery."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-2 border-primary rounded-lg p-5 lg:w-1/3 w-full">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <Separator className="my-2" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-400 text-sm">
              Products
            </span>
            <span className="font-semibold text-gray-400 text-sm">
              SubTotal
            </span>
          </div>
          <Separator className="my-2" />
          <div className="bg-gray-100 p-4 rounded-lg">
            {cartItems?.map((item) => (
              <div key={item?.id} className="flex justify-between items-center">
                <span className="text-sm w-[80%]">
                  {item?.name}
                  <span className="font-bold px-2">x{item?.cartQuantity}</span>
                </span>
                <span>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(item?.price * item?.cartQuantity)}
                </span>
              </div>
            ))}

            <div className="mt-4 border-t pt-4">
              {/* <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>$7.25</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Shipping</span>
                <span>Flat rate: $5.00</span>
              </div> */}
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-gray-400">Total</span>
                <span className="font-bold text-lg">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(cart?.cartTotalAmount ?? 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                <p>
                  <strong>Pay with Paystack:</strong> A secure payment gateway
                  supporting various payment methods such as cards, bank
                  transfers, and more.
                </p>
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Once you proceed to pay, you will be redirected to Paystack to
                  complete the payment process securely. Your order will be
                  confirmed upon successful payment.
                </p>
              </div>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="text-primary border-gray-300 rounded shadow-sm focus:ring-yprimary/70 focus:border-yprimary/70"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="ml-2 text-xs text-gray-700">
                    I have read and agree to the website{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-primary/80 underline underline-offset-1"
                    >
                      terms and conditions
                    </Link>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full mt-4">
              {isLoading ? (
                <Button
                  disabled
                  className="bg-primary hover:bg-primary/80 flex items-center justify-center gap-1 w-full"
                  type="submit"
                >
                  <span>Please wait</span>
                  <Loader className="animate-spin" />
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-primary/80 w-full"
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
