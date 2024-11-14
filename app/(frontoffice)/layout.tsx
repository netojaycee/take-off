import Footer from "@/components/local/Footer";
import Header from "@/components/local/Header";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-5 w-[95%] mx-auto overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
