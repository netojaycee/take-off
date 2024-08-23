import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    header: "Column One",
    links: [
      { text: "Link One", href: "/link-one" },
      { text: "Link Two", href: "/link-two" },
      { text: "Link Three", href: "/link-three" },
      { text: "Link Four", href: "/link-four" },
      { text: "Link Five", href: "/link-five" },
    ],
  },
  {
    header: "Column Two",
    links: [
      { text: "Link Six", href: "/link-six" },
      { text: "Link Seven", href: "/link-seven" },
      { text: "Link Eight", href: "/link-eight" },
      { text: "Link Nine", href: "/link-nine" },
      { text: "Link Ten", href: "/link-ten" },
    ],
  },
  {
    header: "Column Three",
    links: [
      { text: "Link Eleven", href: "/link-eleven" },
      { text: "Link Twelve", href: "/link-twelve" },
      { text: "Link Thirteen", href: "/link-thirteen" },
      { text: "Link Fourteen", href: "/link-fourteen" },
      { text: "Link Fifteen", href: "/link-fifteen" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#252525] px-10 py-[60px] flex flex-col gap-10 text-[#E1D0D0]">
      <div className="flex lg:flex-row flex-col gap-[50px]">
        <div className="grid grid-cols-4 gap-8 w-full lg:w-[65%]">
          <div>
            <Logo white />
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 text-[7px] md:text-sm">{column.header}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:underline text-[9px] md:text-sm">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex lg:w-[40%] justify-end">
          <div className="flex flex-col gap-3 items-start w-[75%]">
            <h2 className="text-[14px] font-bold">Subscribe</h2>
            <p className="text-[9px] md:text-[12px]">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className="flex items-center gap-2 w-full">
              <Input
                placeholder="Enter your email"
                className="text-black rounded-none flex-grow"
              />
              <Button className="bg-transparent border rounded-none">
                Subscribe
              </Button>
            </div>
            <p className="text-[9px] md:text-[12px]">
              By subscribing you agree to with our Privacy Policy and provide
              consent to receive updates from our company.
            </p>

            <p className="text-[14px] font-bold">Download Our App </p>
            <p className="text-[9px] md:text-[12px]">
              Download our app and get 15% Discount on your first order
            </p>
            <div className="flex gap-4 mt-2">
              <Image
                src="/google-play.png"
                alt="Google Play"
                width={120}
                height={40}
              />
              <Image
                src="/app-store.png"
                alt="App Store"
                width={120}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <hr className="w-full mb-4" />
        <div className="flex md:flex-row flex-col justify-between items-center gap-2">
          <div className="flex md:flex-row flex-col items-center gap-3 text-sm">
            <p className="text-[9px] md:text-[12px]"> © 2023 Takeoff Trade. All rights reserved.</p>
            <Link className="text-[9px] md:text-[12px]" href={"/privacy-policy"}>Privacy Policy</Link>
            <Link className="text-[9px] md:text-[12px]" href={"/terms-of-service"}>Terms of Service</Link>
            <Link className="text-[9px] md:text-[12px]" href={"/cookies-settings"}>Cookies Settings</Link>
          </div>
          <div className="flex items-center gap-4 ">
            <FaFacebook className="w-4 h-4" />
            <FaInstagram className="w-4 h-4" />
            <FaXTwitter className="w-4 h-4" />
            <FaLinkedin className="w-4 h-4" />
            <FaYoutube className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
