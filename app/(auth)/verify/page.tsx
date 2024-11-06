"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingButton from "@/components/local/loadingButton";
import ErrorMessage from "@/components/local/errorMessage";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useVerifyTokenMutation,
  useResendVerifyTokenMutation,
} from "@/redux/appData";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the schema for OTP verification
const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^\d{4}$/, "Invalid OTP format"),
});

function VerifyComponent() {
  const [globalError, setGlobalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Initially loading
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(60);
  const searchParams = useSearchParams();
  const router = useRouter();
  const encryptedToken = searchParams.get("token") || "";

  const secretKey = "defaultsecret";

  useEffect(() => {
    if (encryptedToken) {
      try {
        // Decode the JWT
        const decoded = jwt.verify(encryptedToken, secretKey) as JwtPayload;
        const { email, token, action } = decoded;
        setEmail(email);
        setUserId(token);
        setAction(action);

        setLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error);
        setGlobalError("Failed to verify token. Please try again.");
        setLoading(false);
      }
    }
  }, [encryptedToken, secretKey]);

  const isReset = action === "reset";

  const [
    verifyToken,
    {
      isLoading: isLoadingVerify,
      isSuccess: isSuccessVerify,
      isError: isErrorVerify,
      error: errorVerify,
    },
  ] = useVerifyTokenMutation();

  const [
    resendVerifyToken,
    {
      isLoading: isLoadingResendVerify,
      isSuccess: isSuccessResendVerify,
      isError: isErrorResendVerify,
      error: errorResendVerify,
    },
  ] = useResendVerifyTokenMutation();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "", // Set the initial value of OTP from the URL code if it exists
    },
  });

  useEffect(() => {
    // Start the timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      // Cleanup the interval on component unmount or timer change
      return () => clearInterval(interval);
    } else {
      setCanResend(true); // Enable resend button when timer reaches 0
    }
  }, [timer]);

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      const credentials = { userId, token: values.otp };
      if (!isReset) {
        await verifyToken(credentials);
        // console.log(result);
      } else {
        console.log(credentials);
        // const result = await handleVerify(credentials);
      }

     
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred:", error);
    }
  };

  React.useEffect(() => {
    if (isSuccessVerify) {
      toast.success("Verification successful!");
      if (isReset) {
        // router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        router.push(`/signin`);
      }
    } else if (isErrorVerify) {
      if ("data" in errorVerify && typeof errorVerify.data === "object") {
        const errorMessage = (errorVerify.data as { message?: string })
          ?.message;
        setGlobalError(
          errorMessage || "An error occurred during verification."
        );
        toast.error(errorMessage || "An error occurred during verification.");
      } else {
        setGlobalError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  }, [isSuccessVerify, isErrorVerify, errorVerify, router, isReset]);

  const handleResendVerification = async ({ email }: { email: string }) => {
    try {
      const credentials = { email };
      const result = await resendVerifyToken(credentials);
      console.log(result);
    } catch (error) {
      toast.error("An error occurred while resending the verification code.");
      console.error("Error resending verification code:", error);
    }
  };

  React.useEffect(() => {
    if (isSuccessResendVerify) {
      toast.success("Verification code resent successful!");
      setTimer(60);
      setCanResend(false);
    } else if (isErrorResendVerify) {
      if (
        "data" in errorResendVerify &&
        typeof errorResendVerify.data === "object"
      ) {
        const errorMessage = (errorResendVerify.data as { message?: string })
          ?.message;
        setGlobalError(
          errorMessage ||
            "An error occurred while resending the verification code."
        );
        toast.error(
          errorMessage ||
            "An error occurred while resending the verification code."
        );
      } else {
        setGlobalError(
          "An error occurred while resending the verification code."
        );
        toast.error("An error occurred while resending the verification code.");
      }
    }
  }, [isSuccessResendVerify, isErrorResendVerify, errorResendVerify]);

  const handleOTPChange = (value: string) => {
    form.setValue("otp", value);
  };

  if (loading) {
    // Render a loader while the token is being decoded
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto my-10 flex flex-col gap-5 items-center justify-center">
        <div className="">
          <h2 className="text-[24px] font-bold text-gray-800 text-center">
            Verify your Email address{" "}
          </h2>
          <p className="text-[16px] text-gray-500 text-center w-[60%] mx-auto mt-5">
            We have sent a verification code to{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>
        {globalError && <ErrorMessage error={globalError} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      value={field.value}
                      onChange={handleOTPChange}
                    >
                      <InputOTPGroup className="flex justify-center gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full  mt-2">
              <div className="w-full">
                {isLoadingVerify ? (
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
                    Verify Email
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
        <p className="text-lg text-gray-500 text-center">
          Didn&apos;t receive the verification code? It might take a bit of
          time, request a new code{" "}
          {canResend ? (
            <span
              onClick={() => handleResendVerification({ email })}
              className="text-[#B5CC39] cursor-pointer font-bold hover:underline"
            >
              {isLoadingResendVerify ? (
                <span className=" items-center gap-1 inline-flex text-sm">
                  <Loader className="animate-spin" /> Resending
                </span>
              ) : (
                "Resend"
              )}
            </span>
          ) : (
            <>in {timer < 10 ? `00:0${timer}` : `00:${timer}`}</>
          )}
        </p>
      </div>
    </>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyComponent />
    </Suspense>
  );
}
