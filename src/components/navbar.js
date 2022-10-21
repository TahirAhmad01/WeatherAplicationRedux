import React from "react";
import logo from "../assets/logo.png";
import SearchCountries from "./searchCountries";

export default function Navbar() {
  return (
    <>
      <div className="px-4 lg:px-20 md:px-20 sm:px-4 py-2 bg-[#0007] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <img src={logo} alt="logo" className="w-12" />
            <div className="font-medium text-2xl md:block hidden">
              Weather
            </div>
          </div>

          <SearchCountries />
        </div>
      </div>
    </>
  );
}
