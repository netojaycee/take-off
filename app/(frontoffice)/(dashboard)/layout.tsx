import Sidebar from "@/components/local/profile/Sidebar";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full md:w-[90%] mx-auto">
      {/* Sidebar */}
      <div className="w-1/4 p-4 sticky top-0 hidden lg:block">
      <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-3/4 flex-grow overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
