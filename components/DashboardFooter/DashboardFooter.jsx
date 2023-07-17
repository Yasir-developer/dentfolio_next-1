import React from "react";
import logoWhite from "../../../public/images/logoWhite.png";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
const DashboardFooter = () => {
  return (
    <div className="w-full flex bg-white  border-t border-b border-[#70707038]">
      <div className="gap-y-2 w-[90%] mx-auto lg:w-full flex flex-col-reverse lg:flex-row justify-between items-center py-[20px] bg-white">
        <p className="lg:px-[60px] text-[14px]">
          © Copyright 2023 Dentfolio. All Rights Reserved.
        </p>
        <div className="flex gap-x-10 lg:gap-x-3 lg:mr-[50px]">
          <Link href={"#"} passHref className="text-[14px]">
            Terms Of Services
          </Link>
          <Link href={"#"} passHref className="text-[14px]">
            Privacy Policy
          </Link>
          {/* <p className="text-[14px]">Privacy Policy</p> */}
        </div>

        {/* <div className="flex flex-row items-center justify-center px-5 ">
          <Image
            src={"/images/profileImg.png"}
            alt="logo"
            width={51}
            height={51}
            sizes="100vw"
            className="rounded-[25.5px]"
          />

          <h2 className="text-custom-blue text-[16px] font-semibold px-2">
            Dylan Taylor
          </h2>
          <FaAngleDown
            style={{
              color: "#919191",
              width: "20px",
              height: "20px",
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardFooter;
