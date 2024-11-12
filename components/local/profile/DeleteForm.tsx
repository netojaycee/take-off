import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-hot-toast"; // Assuming you are using react-hot-toast for notifications
import { Loader } from "lucide-react"; // Assuming you're using this for the loader
import { useDeleteCategoryMutation } from "@/redux/appData";

export default function DeleteForm({
  data,
  onClose,
  title,
}: {
  data: any;
  title: string;
  onClose: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [
    deleteCategory,
    {
      isLoading: deleteCategoryLoading,
      error: deleteCategoryError,
      isSuccess: deleteCategorySuccess,
    },
  ] = useDeleteCategoryMutation();
  // Handle delete
  const handleDelete = async () => {
    try {
      setIsLoading(true); // Start loading
      let result;

      // Check the title and call the appropriate deletion function
      if (title === "category") {
        console.log("category");
        result = await deleteCategory(data._id); // Delete category
        console.log(result)
      }
      if (title === "product") {
        console.log("product");
        // result = await deleteCategory(data.id, data.restaurantId); // Delete category
      }

      // If the deletion was successful, show a success toast and close the dialog
      // if (result && result.success) {
      //   toast.success(result.message);
      //   onClose(false); // Close the dialog after deletion
      // } else {
      //   toast.error(result?.message || "Failed to delete item");
      // }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
      <div className="text-center">
        <DialogTitle>Are you sure you want to delete {data?.name}?</DialogTitle>
      </div>
      <div className="flex w-[50%] mx-auto justify-between">
        <Button
          type="button"
          onClick={() => onClose(false)}
          disabled={isLoading} // Disable button while loading
        >
          NO
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader className="mr-2 animate-spin" size={16} /> Deleting...
            </div>
          ) : (
            "YES"
          )}
        </Button>
      </div>
    </form>
  );
}
