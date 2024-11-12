import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteForm from "./DeleteForm";

export function CustomDialog({
  open,
  onOpenChange,
  title,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  data: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        {/* <DialogHeader>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader> */}

        <DeleteForm title={title} onClose={onOpenChange} data={data} />
      </DialogContent>
    </Dialog>
  );
}
