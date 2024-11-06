"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ErrorMessage from "@/components/local/errorMessage";
import { useRegisterMutation, useBecomeSellerMutation } from "@/redux/appData";
import toast from "react-hot-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { registerSchema, becomeSellerSchema } from "@/lib/zod";
import { Loader } from "lucide-react";
import jwt from "jsonwebtoken";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface DecodedToken {
  email: string;
  action: string;
  token: string;
}

type BecomeSellerFormData = z.infer<typeof becomeSellerSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function SellerReg() {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const [
    register,
    {
      isLoading: isLoadingRegister,
      isSuccess: isSuccessRegister,
      isError: isErrorRegister,
      error: errorRegister,
    },
  ] = useRegisterMutation();

  const [
    becomeSeller,
    {
      isLoading: isLoadingBecomeSeller,
      isSuccess: isSuccessBecomeSeller,
      isError: isErrorBecomeSeller,
      error: errorBecomeSeller,
    },
  ] = useBecomeSellerMutation();

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "seller",
    },
  });

  const becomeSellerForm = useForm<BecomeSellerFormData>({
    resolver: zodResolver(becomeSellerSchema),
    defaultValues: {
      email: "",
    },
  });

  const form = isEmailChecked
    ? (registerForm as UseFormReturn<RegisterFormData>)
    : (becomeSellerForm as UseFormReturn<BecomeSellerFormData>);

  // const checkEmail = async (values: BecomeSellerFormData) => {
  //   setGlobalError(""); // Reset global error before submission
  //   // console.log("clicke");
  //   // console.log(values);
  //   try {
  //     const result = await becomeSeller(values); // API call to check email

  //     if (result?.data?.status === 200) {
  //       toast.success("OTP sent to your email.");
  //       const payload = { values, action: "verify" };
  //       const encodedJWT = jwt.sign(payload, "defaultsecret");

  //       router.push(`/verify?token=${encodeURIComponent(encodedJWT)}`);
  //     }
  //     if (
  //       result?.error &&
  //       "status" in result?.error &&
  //       (result.error as FetchBaseQueryError).status === 404
  //     ) {
  //       toast.error("Account not found");
  //       setIsEmailChecked(true);
  //     }
  //   } catch (error) {
  //     toast.error("An unexpected error occurred.");
  //     setGlobalError("An unexpected error occurred.");
  //     console.error("An error occurred:", error);
  //   }
  // };

  // const onSubmit = async (values: RegisterFormData) => {
  //   setGlobalError("");
  //   try {
  //     const result = await register(values);
  //     setToken(result?.data?.id);
  //   } catch (error) {
  //     toast.error("An unexpected error occurred.");
  //     setGlobalError("An unexpected error occurred.");
  //   }
  // };

  const handleFormSubmit = async (
    values: RegisterFormData | BecomeSellerFormData
  ) => {
    setGlobalError(""); // Reset global error before submission

    try {
      if (isEmailChecked) {
        // console.log(values);
        // Perform full registration
        const result = await register(values as RegisterFormData);
        setToken(result?.data?.id);
        console.log(result)

        // Handle successful registration
        // if (isSuccessRegister) {
        //   toast.success("Registration successful!");
        //   const email = (values as RegisterFormData).email;
        //   const action = "register";
        //   const payload = { email, token, action };
        //   const encodedJWT = jwt.sign(payload, "defaultsecret");
        //   router.push(`/verify?token=${encodeURIComponent(encodedJWT)}`);
        // }
      } else {
        // Check email and send OTP if account exists
        const result = await becomeSeller(values as BecomeSellerFormData);
        console.log(result);

        if (result?.data?.status === 200) {
          toast.success("OTP sent to your email.");
          setToken(result?.data?.id);
          const payload = {
            email: (values as BecomeSellerFormData).email,
            token,
            action: "verify",
          };
          // console.log(payload);
          const encodedJWT = jwt.sign(payload, "defaultsecret");
          router.push(`/verify?token=${encodeURIComponent(encodedJWT)}`);
        } else if (
          result?.error &&
          "status" in result?.error &&
          (result.error as FetchBaseQueryError).status === 404
        ) {
          toast.error("Account not found.");
          setIsEmailChecked(true); // Proceed to full registration on retry
          registerForm.setValue(
            "email",
            (values as BecomeSellerFormData).email
          );
        }
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    if (isSuccessRegister) {
      toast.success("Registration successful!");

      const email = registerForm.getValues("email");
      const action = "register";
      const payload = { email, token, action };
      const encodedJWT = jwt.sign(payload, "defaultsecret");

      router.push(`/verify?token=${encodeURIComponent(encodedJWT)}`);
    } else if (isErrorRegister) {
      if ("data" in errorRegister && typeof errorRegister.data === "object") {
        const errorMessage = (errorRegister.data as { message?: string })
          ?.message;
        setGlobalError(errorMessage || "Registration failed.");
        toast.error(errorMessage || "Registration failed.");
      } else {
        setGlobalError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  }, [
    isSuccessRegister,
    isErrorRegister,
    errorRegister,
    router,
    registerForm,
    token,
  ]);

  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] space-y-5 md:space-y-10">
      <div className="flex items-center gap-5 lg:gap-10 w-full">
        <div className="md:h-[335px] w-[404px] hidden md:block">
          <Image
            src="/images/seller-reg.png"
            alt=""
            className="w-full h-full object-cover rounded-lg"
            width={404}
            height={335}
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-col w-full items-center justify-center mb-5">
            <h2 className="text-[20px] font-bold text-gray-800">
              Sell on Takeoff Trade
            </h2>
            <p className="text-[16px] text-gray-500 mt-2 text-center">
              Enter email to continue or create a new seller account
            </p>
          </div>
          {globalError && <ErrorMessage error={globalError} />}
          <Form
            {...(form as UseFormReturn<
              RegisterFormData | BecomeSellerFormData
            >)}
          >
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-2"
            >
              {/* Email Field */}
              {isEmailChecked && (
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!isEmailChecked && (
                <FormField
                  control={becomeSellerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* Conditionally render the rest of the form fields */}
              {isEmailChecked && (
                <>
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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

                  <div className="flex md:flex-row flex-col items-center w-full gap-3">
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/2">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              <div className="w-full">
                {isLoadingBecomeSeller || isLoadingRegister ? (
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
                    Become a Seller
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
