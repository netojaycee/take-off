"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useRegisterMutation } from "@/redux/appData";
import toast from "react-hot-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from "@/lib/zod";
import { Loader } from "lucide-react";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  email: string;
  action: string;
  token: string;
}

export default function SellerReg() {
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

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setGlobalError(""); // Reset global error before submission
    try {
      const result = await register(values);
      // console.log(result);
      setToken(result?.data?.id);
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    if (isSuccessRegister) {
      toast.success("Registration successful!");

      const email = form.getValues("email");
      const action = "register";
      const secretKey = "defaultsecret";

      if (!secretKey) {
        // console.error("JWT_SECRET is not defined");
        return;
      }

      const payload = { email, token, action };

      const encodedJWT = jwt.sign(payload, secretKey);

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
  }, [isSuccessRegister, isErrorRegister, errorRegister, router, form, token]);

  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] space-y-5 md:space-y-10">
      <div className="flex items-center gap-5 lg:gap-10 w-full">
        <div className="md:h-[335px] w-[404px] hidden md:block">
          <Image
            src="/images/seller-reg.png"
            alt=""
            className=" w-full h-full object-cover rounded-lg" // Add 'lg:object-top' here
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
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

              <div className="flex md:flex-row flex-col items-center w-full gap-3">
                <FormField
                  control={form.control}
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
                  control={form.control}
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

              <div className="w-full">
                {isLoadingRegister ? (
                  <Button
                    disabled
                    className="flex items-center justify-center gap-1 w-full"
                    type="submit"
                  >
                    {" "}
                    <span>Please wait</span>
                    <Loader className="animate-spin" />
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Continue
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

// hide all fields except email, if response is email found navigate to verify page else display other fields and hit reg endponit with seller role den move to verify page
