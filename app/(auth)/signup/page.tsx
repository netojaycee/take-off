"use client";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/local/loadingButton";
import ErrorMessage from "@/components/local/errorMessage";
import toast from "react-hot-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .min(1, "Name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [globalError, setGlobalError] = useState<string>("");
  const router = useRouter();

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
      console.log(values);
      //   const result = await handleRegister(values);

      //   if (result?.success === false) {
      //     toast.error(result.message);
      //     setGlobalError(result.message); // Display error message
      //   } else {
      //     toast.success("Registration successful!");
      //     const email = result.email || ""; // Provide a default value
      //     router.push(
      //       `/verify?email=${encodeURIComponent(email)}&action=register`
      //     );
      //   }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto my-10">
        <div className="flex flex-col w-full items-center justify-center mb-5">
          <h2 className="text-[30px] font-bold text-gray-800">Sign up</h2>
          <p className="text-[16px] text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href={"/signin"} className="text-[#4285F4] underline">
              Log in
            </Link>{" "}
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
            <LoadingButton
              pending={form.formState.isSubmitting}
              text="Sign Up"
            />
          </form>
        </Form>

        <div className="flex items-center justify-between">
          <Separator className="w-[40%]"/>

          <p className="text-sm text-gray-500 text-center block my-2">or</p>
          <Separator className="w-[40%]"/>
        </div>
        <form className="w-full flex flex-col gap-2">
          <Button variant="outline" className="w-full" type="submit">
            {/* <GoogleI className="h-4 w-4 mr-2" />
             */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <p className="ml-2"> Continue with Google</p>
          </Button>

          <p className="text-center text-sm">
            By signing up, you agree to our{" "}
            <Link href={""} className="text-[#4285F4]">
              Terms & Conditions
            </Link>
            ,{" "}
            <Link href={""} className="text-[#4285F4]">
              Terms of Service
            </Link>{" "}
            and acknowledge that you&apos;ve read our{" "}
            <Link href={""} className="text-[#4285F4]">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  );
}
