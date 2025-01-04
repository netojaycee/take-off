import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component, otherwise use regular <textarea>
import { Label } from "@/components/ui/label";
import { Rating as ReactRating } from "@smastrom/react-rating";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { useAddRatingMutation } from "@/redux/appData";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRatingSchema } from "@/lib/zod";
import ErrorMessage from "./errorMessage";

export function AddReview({ product }: { product: string }) {
  const [rating, setRating] = useState(3);
  const [globalError, setGlobalError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addRatingSchema>>({
    resolver: zodResolver(addRatingSchema),
    defaultValues: {
      rating: 3,
      content: "",
    },
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  const [addRating, { isLoading, isSuccess, isError, error }] =
    useAddRatingMutation();

  const onSubmit = async (values: z.infer<typeof addRatingSchema>) => {
    setGlobalError("");

    try {
      const credentials = {
        rating: rating,
        content: values.content,
        product,
      };
      console.log("credentials", credentials);
      await addRating(credentials);
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setGlobalError("An unexpected error occurred.");
      console.error("An error occurred:", error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("review added successfully!");
      form.reset(); // Reset form values to default
      handleDialogClose();
    } else if (isError) {
      if ("data" in error && typeof error.data === "object") {
        const errorMessage = (error.data as { message?: string })?.message;
        setGlobalError(errorMessage || "review creation failed.");
        toast.error(errorMessage || "Review creation failed.");
      } else {
        setGlobalError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  }, [isSuccess, isError, error, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="underline font-semibold text-gray-500 border-none mb-4"
        >
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about the product. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-start gap-4">
            <ReactRating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
            <div className="">
              {globalError && <ErrorMessage error={globalError} />}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your review here..."
                            className="col-span-3"
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
        </div>
        <div className="w-full">
          {isLoading ? (
            <Button
              disabled
              className="flex items-center justify-center gap-1 w-full"
              type="submit"
            >
              <span>Please wait</span>
              <Loader className="animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              type="submit"
            >
              Add Review
            </Button>
          )}
        </div>{" "}
      </DialogContent>
    </Dialog>
  );
}
