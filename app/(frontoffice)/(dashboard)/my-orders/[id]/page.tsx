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

export default function OrderDetails({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-5 lg:gap-8">
      <div className="w-full md:w-[70%] p-6 bg-white rounded-lg shadow-lg">
        {/* Order Details Section */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-gray-500">
              Order ID: <span className="font-semibold">#24561L</span>
            </p>
          </div>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md font-semibold">
            Delivered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p>
              <strong>Item:</strong> Washing Machine
            </p>
            <p>
              <strong>Date:</strong> 10th Sep 2024, 12:24
            </p>
          </div>
          <div>
            <p>
              <strong>Payment method:</strong> Cash on Delivery
            </p>
            <p>
              <strong>Address:</strong> Victoria Island, Lagos State
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Courier Details Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Courier Details</h2>
          <div className="mt-2">
            <p>
              <strong>Vendor name:</strong> John William
            </p>
            <p>
              <strong>Item:</strong> Washing Machine
            </p>
            <p>
              <strong>Weight:</strong> 10 KG
            </p>
            <p>
              <strong>Telephone:</strong> +2348108989123
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Tracking History Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Tracking History</h2>
          <div className="mt-2 space-y-4">
            <TrackingStep
              date="10th Sep 2024"
              time="12:24 AM"
              location="Lekki Lagos"
              status="Order Confirmed"
            />
            <TrackingStep
              date="10th Sep 2024"
              time="12:24 AM"
              location="Lekki Lagos"
              status="Order Picked up"
            />
            <TrackingStep
              date="10th Sep 2024"
              time="12:24 AM"
              location="Lekki Lagos"
              status="In Transit"
            />
            <TrackingStep
              date="10th Sep 2024"
              time="12:24 AM"
              location="Lekki Lagos"
              status="On Delivery"
            />
            <TrackingStep
              date="10th Sep 2024"
              time="12:24 AM"
              location="Lekki Lagos"
              status="Delivered"
              delivered
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Order Charges Section */}
        <div className="border p-4 rounded-lg flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Order Charges</h2>
          <div className="flex justify-between">
            <p>Washing Machine</p>
            <p>$200</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery</p>
            <p>$200</p>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>$400</p>
          </div>
          <Button variant="destructive" className="mt-4 w-full">
            Cancel Order
          </Button>
        </div>
      </div>

      <div className="w-full md:w-[30%] flex flex-col gap-3">
        <Card className="w-full h-auto px-3 py-8 flex flex-col justify-between bg-[#F2F2F2] shadow-md">
          {/* Card Header */}
          <CardHeader>
            <CardTitle className="text-[14px] lg:text-xl font-semibold">
              Order Summary
            </CardTitle>
          </CardHeader>
          <Separator className="my-2 " />

          {/* Card Content */}
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#252525] text-[12px] lg:text-[14px]">
                  Headphone
                </span>
                <span>$200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252525] text-[12px] lg:text-[14px]">
                  iPhone 12 Pro Max
                </span>
                <span>$400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252525] text-[12px] lg:text-[14px]">
                  PlayStation 4 Controller
                </span>
                <span>$90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252525] text-[12px] lg:text-[14px]">
                  ASUS Zenbook
                </span>
                <span className="">$200</span>
              </div>
              <Separator className="my-2 " />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>$200</span>
              </div>
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex justify-end">
            <Button className="w-full">Checkout</Button>
          </CardFooter>
        </Card>{" "}
      </div>
    </div>
  );
}

// Component for each tracking step
function TrackingStep({
  date,
  time,
  location,
  status,
  delivered = false,
}: {
  date: string;
  time: string;
  location: string;
  status: string;
  delivered?: boolean;
}) {
  return (
    <div className="flex items-center">
      <div
        className={`w-3 h-3 rounded-full ${
          delivered ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      <div className="ml-4">
        <p className="text-sm font-semibold">{status}</p>
        <p className="text-xs text-gray-500">
          {date} at {time} - {location}
        </p>
      </div>
    </div>
  );
}
