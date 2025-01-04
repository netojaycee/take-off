import Sidebar from "@/components/local/profile/Sidebar";
import ProfileSheetMobile from "@/components/local/ProfileSheetMobile";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/4 p-4 sticky top-0 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-3/4 flex-grow overflow-y-auto p-4">
        <div className="lg:hidden bg-gray-300 p-2 my-2">
          <ProfileSheetMobile />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
