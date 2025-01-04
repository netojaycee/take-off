// export default function MyOrderDetails({ params }: { params: { id: string } }) {
//   return (
//     <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
//       hello
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chat from "@/components/local/Chat";
import { Loader } from "lucide-react";
import { useGetOrderByIdQuery, useMarkOrderMutation } from "@/redux/appData";
import { TrackingStep } from "@/components/local/TrackingStep";

export default function OrderDetailsBuyer({
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


  const handleOrderStatus = async (action: string) => {
    try {
      const response = await markOrder({ action, id: orderId });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="flex flex-col md:flex-row w-full gap-5 lg:gap-8">
    //   <div className="w-full md:w-[70%] p-6 bg-white rounded-lg shadow-lg">
    //     {/* Order Details Section */}
    //     <div className="flex justify-between items-center border-b pb-4">
    //       <div>
    //         <h1 className="text-xl font-bold">Order Details</h1>
    //         <p className="text-gray-500">
    //           Order ID: <span className="font-semibold">#24561L</span>
    //         </p>
    //       </div>
    //       <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md font-semibold">
    //         Delivered
    //       </span>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //       <div>
    //         <p>
    //           <strong>Item:</strong> Washing Machine
    //         </p>
    //         <p>
    //           <strong>Date:</strong> 10th Sep 2024, 12:24
    //         </p>
    //       </div>
    //       <div>
    //         <p>
    //           <strong>Payment method:</strong> Cash on Delivery
    //         </p>
    //         <p>
    //           <strong>Address:</strong> Victoria Island, Lagos State
    //         </p>
    //       </div>
    //     </div>

    //     <Separator className="my-4" />

    //     {/* Courier Details Section */}
    //     <div className="border p-4 rounded-lg flex justify-between">
    //       <div className="">
    //         {" "}
    //         <h2 className="text-lg font-semibold">Courier Details</h2>
    //         <div className="mt-2">
    //           <p>
    //             <strong>Vendor name:</strong> John William
    //           </p>
    //           <p>
    //             <strong>Item:</strong> Washing Machine
    //           </p>
    //           <p>
    //             <strong>Weight:</strong> 10 KG
    //           </p>
    //           <p>
    //             <strong>Telephone:</strong> +2348108989123
    //           </p>
    //         </div>
    //       </div>
    //       <Chat reciever="buyer"/>
    //     </div>

    //     <Separator className="my-4" />

    //     {/* Tracking History Section */}
    //     <div className="border p-4 rounded-lg">
    //       <h2 className="text-lg font-semibold">Tracking History</h2>
    //       <div className="mt-2 space-y-4">
    //         <TrackingStep
    //           date="10th Sep 2024"
    //           time="12:24 AM"
    //           location="Lekki Lagos"
    //           status="Order Confirmed"
    //         />
    //         <TrackingStep
    //           date="10th Sep 2024"
    //           time="12:24 AM"
    //           location="Lekki Lagos"
    //           status="Order Picked up"
    //         />
    //         <TrackingStep
    //           date="10th Sep 2024"
    //           time="12:24 AM"
    //           location="Lekki Lagos"
    //           status="In Transit"
    //         />
    //         <TrackingStep
    //           date="10th Sep 2024"
    //           time="12:24 AM"
    //           location="Lekki Lagos"
    //           status="On Delivery"
    //         />
    //         <TrackingStep
    //           date="10th Sep 2024"
    //           time="12:24 AM"
    //           location="Lekki Lagos"
    //           status="Delivered"
    //           delivered
    //         />
    //       </div>
    //     </div>

    //     <Separator className="my-4" />

    //     {/* Order Charges Section */}
    //     <div className="border p-4 rounded-lg flex flex-col gap-2">
    //       <h2 className="text-lg font-semibold">Order Charges</h2>
    //       <div className="flex justify-between">
    //         <p>Washing Machine</p>
    //         <p>$200</p>
    //       </div>
    //       <div className="flex justify-between">
    //         <p>Delivery</p>
    //         <p>$200</p>
    //       </div>
    //       <Separator />
    //       <div className="flex justify-between font-bold">
    //         <p>Total</p>
    //         <p>$400</p>
    //       </div>
    //       <Button variant="destructive" className="mt-4 w-full">
    //         Cancel Order
    //       </Button>
    //     </div>
    //   </div>

    //   <div className="w-full md:w-[30%] flex flex-col gap-3">
    //     <Card className="w-full h-auto px-3 py-8 flex flex-col justify-between bg-[#F2F2F2] shadow-md">
    //       {/* Card Header */}
    //       <CardHeader>
    //         <CardTitle className="text-[14px] lg:text-xl font-semibold">
    //           Order Summary
    //         </CardTitle>
    //       </CardHeader>
    //       <Separator className="my-2 " />

    //       {/* Card Content */}
    //       <CardContent>
    //         <div className="space-y-4">
    //           <div className="flex justify-between">
    //             <span className="text-[#252525] text-[12px] lg:text-[14px]">
    //               Headphone
    //             </span>
    //             <span>$200</span>
    //           </div>
    //           <div className="flex justify-between">
    //             <span className="text-[#252525] text-[12px] lg:text-[14px]">
    //               iPhone 12 Pro Max
    //             </span>
    //             <span>$400</span>
    //           </div>
    //           <div className="flex justify-between">
    //             <span className="text-[#252525] text-[12px] lg:text-[14px]">
    //               PlayStation 4 Controller
    //             </span>
    //             <span>$90</span>
    //           </div>
    //           <div className="flex justify-between">
    //             <span className="text-[#252525] text-[12px] lg:text-[14px]">
    //               ASUS Zenbook
    //             </span>
    //             <span className="">$200</span>
    //           </div>
    //           <Separator className="my-2 " />
    //           <div className="flex justify-between text-lg font-semibold">
    //             <span>Total</span>
    //             <span>$200</span>
    //           </div>
    //         </div>
    //       </CardContent>

    //       {/* Card Footer */}
    //       <CardFooter className="flex justify-end">
    //         <Button className="w-full">Checkout</Button>
    //       </CardFooter>
    //     </Card>{" "}
    //   </div>
    // </div>

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
              <strong>Item:</strong> {order?.name}
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
              <strong>Date of Order:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(order?.paidAt))}
            </p>
          </div>
          <div>
            <p>
              <strong>Delivery Status:</strong> {order?.deliveryStatus}
            </p>
            {/* <p>
              <strong>Estimated Delivery:</strong> 11th Sep 2024, 9:00 AM
            </p> */}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Chat and Actions */}
        <div className="flex justify-between items-center">
          <Chat reciever="seller" />
          {order?.deliveryStatus === "delivered" && (
            <Button
              onClick={() => handleOrderStatus("recieved")}
              className="bg-green-600"
            >
              Mark as Recieved
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        {/* Tracking History Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Order Process</h2>
          <div className="mt-2 space-y-4">
            <TrackingStep
              date="10th Sep 2024"
              status="Order Placed"
              delivered={order?.deliveryStatus === "N/A" ? true : false}
            />
            <TrackingStep
              date="10th Sep 2024"
              status="Order Accepted"
              delivered={order?.deliveryStatus === "pending" ? true : false}
            />
            <TrackingStep
              date="10th Sep 2024"
              status="Shipped"
              delivered={order?.deliveryStatus === "shipped" ? true : false}
            />
            
            <TrackingStep
              date="11th Sep 2024"
              status="Delivered"
              delivered={order?.deliveryStatus === "delivered" ? true : false}
            />
            <TrackingStep
              date="11th Sep 2024"
              status="Accepted by Buyer"
              delivered={order?.deliveryStatus === "recieved" ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
