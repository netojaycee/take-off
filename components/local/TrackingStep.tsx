import { Order } from "@/types";

function TrackingStep({
  date,
  status,
  delivered,
}: {
  date: string;
  status: string;
  delivered: boolean;
}) {
  let processedDate = "N/A"; // Default to "N/A" for invalid or null values

  if (typeof date === "string" || typeof date === "number") {
    const parsedDate = new Date(date); // Attempt to parse the date
    if (!isNaN(parsedDate.getTime())) {
      processedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(parsedDate);
    }
  }

  return (
    <div className="flex items-center">
      <div
        className={`w-3 h-3 rounded-full ${
          delivered ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      <div className="ml-4">
        <p className="text-sm font-semibold">{status}</p>
        <p className="text-xs text-gray-500">{processedDate}</p>
      </div>
    </div>
  );
}

export default function TrackingStepComponent({ order }: { order: Order }) {
  const isCancelled = order?.deliveryStatus === "cancelled";

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Order Process</h2>
      <div className="mt-2 space-y-4">
        {!isCancelled ? (
          <>
            <TrackingStep
              date={order?.createdAt || ""}
              status="Order Placed"
              delivered={order?.deliveryStatus === "N/A"}
            />
            <TrackingStep
              date={order?.acceptedDate || ""}
              status="Order Accepted"
              delivered={order?.deliveryStatus === "pending"}
            />
            <TrackingStep
              date={order?.shippedDate || ""}
              status="Shipped"
              delivered={order?.deliveryStatus === "shipped"}
            />
            <TrackingStep
              date={order?.deliveredDate || ""}
              status="Delivered"
              delivered={order?.deliveryStatus === "delivered"}
            />
            <TrackingStep
              date={order?.receivedDate || ""}
              status="Accepted by Buyer"
              delivered={order?.deliveryStatus === "recieved"}
            />
          </>
        ) : (
          <TrackingStep
            date={order?.cancelledDate || ""}
            status="Order Cancelled"
            delivered={true} // Mark as completed since the process ended with cancellation
          />
        )}
      </div>
    </div>
  );
}
