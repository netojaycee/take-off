import { Button } from "@/components/ui/button";
import Loader from "@/components/local/loader";

export default function LoadingButton({
  pending,
  text,
}: {
  pending: boolean;
  text: string;
}) {
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? (
      <Loader />
      ) : (
        <>{text}</>
      )}
    </Button>
  );
}
