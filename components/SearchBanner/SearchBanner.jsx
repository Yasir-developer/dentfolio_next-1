import Image from "next/image";
import React from "react";
import { FaFilter, FaCrosshairs } from "react-icons/fa";
import locationCross from "../../../public/images/location-crosshairs-solid.svg";
import Router from "next/router";
const SearchBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#ccd6e5] to-[#dce8fa]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-[1140px] mx-auto px-4 lg:px-8">
        <div className="w-full lg:w-[70%]">
          <div className="lg:p-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-black w-full lg:w-[80%] mt-[20px] lg:mt-[0px]">
              FIND A PRIVATE DENTIST{" "}
              <span className="text-3xl lg:text-4xl font-bold font-poppins text-custom-blue">
                NEAR YOU
              </span>{" "}
            </h1>
            <p className="mb-4 text-black font-normal lg:text-[14px] text-[13px]">
              Hundreds of dentists and practices around the UK showcase their
              portfolio work on Dentfolio - the home to the UK's best private
              dentists
            </p>
          </div>

          <div className="bg-white w-full lg:w-3/5 rounded-[7px] max-w-[1140px] my-10 lg:my-0 lg:ml-4">
            <div className="flex items-center p-4 w-full">
              <div className="border border-gray-300 w-full flex items-center rounded-[5px]">
                <FaCrosshairs size={20} color="#000" className="ml-2" />

                <input
                  type="text"
                  placeholder="Location"
                  className="flex-grow py-2 px-4 focus:outline-none w-4/5"
                />
                <FaFilter size={20} color="#000" />

                <button
                  className="bg-custom-blue text-white px-4 py-2 rounded ml-2 focus:outline-none"
                  onClick={() => Router.push("/patient/dentist-list")}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/images/doctor-2.png"
            alt="Image"
            className="w-full max-w-[500px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
