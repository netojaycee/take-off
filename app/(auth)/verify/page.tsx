"use client";

import { useEffect, useState, Suspense } from "react";
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

// Define the schema for OTP verification
const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^\d{4}$/, "Invalid OTP format"),
});

function VerifyComponent() {
  const [globalError, setGlobalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";
  const action = searchParams.get("action") || "";
  const isReset = action === "reset";

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: code || "", // Set the initial value of OTP from the URL code if it exists
    },
  });

  // Update the form value if code changes
  useEffect(() => {
    if (code) {
      form.setValue("otp", code); // Set the OTP field value when code is present
    }
  }, [code, form]);

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      let otp = "";
      if (code) {
        otp = code;
      } else {
        otp = values.otp;
      }

      const credentials = { email, otp, isReset };

      // const result = await handleVerify(credentials);
      // Handle verification logic here...
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleResendVerification = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      // Handle resend logic here...
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while resending the verification code.");
      console.error("Error resending verification code:", error);
    }
  };

  const handleOTPChange = (value: string) => {
    form.setValue("otp", value);
  };

  return (
    <>
      <div className="max-w-md mx-auto my-10 flex flex-col gap-5 items-center justify-center">
        <div className="">
          <h2 className="text-[24px] font-bold text-gray-800 text-center">
            Verify your Email address{" "}
          </h2>
          <p className="text-[16px] text-gray-500 text-center w-[60%] mx-auto mt-5">
            We have sent a verification code to {email}
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
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-1">
                  <span>Sending</span>
                  <Loader className="animate-spin" />
                </div>
              ) : (
                <Button
                  className="gap-1 items-center flex w-full"
                  type="submit"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
        <p className="text-lg text-gray-500 text-center">
          Didn&apos;t receive the verification code? It might take a bit of
          time, request a new code in 00:11{" "}
          <span
            className="text-[#B5CC39] cursor-pointer"
            // onClick={() => handleResendVerification({ email })}
          >
            {loading ? "Resending..." : "Resend"}
          </span>
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
