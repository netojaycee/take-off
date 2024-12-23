import Footer from "@/components/local/Footer";
import Header from "@/components/local/Header";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header auth />
      <div className="flex-grow mt-5 w-[95%] lg:w-[90%] mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
