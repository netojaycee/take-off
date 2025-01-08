"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import Chat from "@/components/local/Chat";
import { Loader } from "lucide-react";
import { useGetOrderByIdQuery, useMarkOrderMutation } from "@/redux/appData";
import TrackingStepComponent from "@/components/local/TrackingStep";
import { formatDateTime } from "@/hooks/format-date";

export default function OrderDetailsSeller({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  const [markOrder, { isLoading: isMarking }] = useMarkOrderMutation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No orders found for this Id.</p>
      </div>
    );
  }

  console.log(order);

  const handleOrderStatus = async (action: string) => {
    try {
      const response = await markOrder({ action, id: orderId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full gap-5 lg:gap-8">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Order Details Section */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-gray-500">
              Order ID: <span className="font-semibold">{order?.id}</span>
            </p>
          </div>
          <span
            className={`${
              order?.deliveryStatus === "N/A"
                ? "bg-red-100 text-red-600"
                : order?.deliveryStatus === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : order?.deliveryStatus === "shipped"
                ? "bg-blue-100 text-blue-600"
                : order?.deliveryStatus === "delivered"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            } px-3 py-1 rounded-md font-semibold`}
          >
            {order?.deliveryStatus}
          </span>
        </div>

        {/* Basic Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p>
              <strong>Item:</strong> {order?.product?.name}
            </p>
            <p>
              <strong>Quantity:</strong> {order?.quantity}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(order?.totalPrice)}
            </p>
            <p>
              <strong>Date of Order:</strong> {formatDateTime(order?.createdAt)}
            </p>
          </div>
          <div>
            <p>
              <strong>Buyer Name:</strong> {order?.buyer?.name}
            </p>
            <p>
              <strong>Phone:</strong> {order?.phone}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order?.address}
            </p>
            <p>
              <strong>Note:</strong> {order?.note}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Chat and Actions */}
        <div className="flex justify-between items-center">
          <Chat reciepient="buyer" receiverId={order?.buyer?.id} />
          {order?.status === "pending" && order?.paymentStatus === "paid" && (
            <div className="flex gap-4">
              <Button
                onClick={() => handleOrderStatus("accept")}
                className="bg-green-600"
                disabled={isMarking}
              >
                Accept Order {isMarking && <Loader className="animate-spin" />}
              </Button>
              <Button
                onClick={() => handleOrderStatus("reject")}
                variant="destructive"
                disabled={isMarking}
              >
                Reject Order
                {isMarking && <Loader className="animate-spin" />}
              </Button>
            </div>
          )}

          {order?.status === "confirmed" &&
            order?.deliveryStatus === "pending" && (
              <Button
                onClick={() => handleOrderStatus("ship")}
                className="bg-green-600"
                disabled={isMarking}
              >
                Mark as Shipped
                {isMarking && <Loader className="animate-spin" />}{" "}
              </Button>
            )}

          {order?.status === "confirmed" &&
            order?.deliveryStatus === "shipped" && (
              <Button
                onClick={() => handleOrderStatus("deliver")}
                className="bg-green-600"
                disabled={isMarking}
              >
                Mark as Delivered
                {isMarking && <Loader className="animate-spin" />}
              </Button>
            )}
        </div>

        <Separator className="my-4" />

        {/* Tracking History Section */}
        <TrackingStepComponent order={order} />
      </div>
    </div>
  );
}
