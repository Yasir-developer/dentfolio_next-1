import Image from "next/image";
import React from "react";
import footer from "../../../public/images/footerLogo.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  return (
    // <footer className="bg-footer-blue">
    //   <div className="max-w-[1140px] px-[100px] mx-auto pb-[70px]">
    //     <div className="flex flex-col items-center justify-center pt-[70px]  ">
    //       <Image src={footer} />

    //       <hr className="justify-center items-center w-full border-[#70707030] my-10"></hr>
    //     </div>
    //     <div className="justify-between	flex flex-row">
    //       <p className="text-white font-normal">
    //         © Copyright 2023 Dentfolio. All Rights Reserved.
    //       </p>
    //       <div className="flex gap-2 pr-2">
    //         <p className="text-white">Follow us on:</p>
    //         <div className="border border-white rounded-[20px] p-[5px]">
    //           <FaFacebookF
    //             style={{
    //               color: "#fff",
    //               width: "12px",
    //               height: "12px",
    //             }}
    //           />{" "}
    //         </div>
    //         <div className="border border-white rounded-[20px] p-[5px]">
    //           <FaTwitter
    //             style={{
    //               color: "#fff",
    //               width: "12px",
    //               height: "12px",
    //             }}
    //           />{" "}
    //         </div>
    //         <div className="border border-white rounded-[20px] p-[5px]">
    //           <FaInstagram
    //             style={{
    //               color: "#fff",
    //               width: "12px",
    //               height: "12px",
    //             }}
    //           />{" "}
    //         </div>

    //         <div className="border border-white rounded-[20px] p-[5px]">
    //           <FaLinkedin
    //             style={{
    //               color: "#fff",
    //               width: "12px",
    //               height: "12px",
    //             }}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* < */}
    //   {/* <div className='order bw-[200px] justify-center'></div> */}
    // </footer>
    <>
      {router.pathname !== "/dentist/login" &&
      router.pathname !== "/dentist/sign-up" &&
      router.pathname !== "/dentist/edit-case" &&
      router.pathname !== "/dentist/view-profile" &&
      router.pathname !== "/dentist/create-case" &&
      router.pathname !== "/dentist/edit-profile" &&
      router.pathname !== "/dentist/forgot-password" &&
      router.pathname !== "/admin/overview" &&
      router.pathname !== "/dentist/billing" &&
      router.pathname !== "/dentist/billing-history" &&
      router.pathname !== "/dentist/settings" &&
      router.pathname !== "/admin/overview" &&
      router.pathname !== "/admin/dentist" &&
      router.pathname !== "/admin/revenue" &&
      router.pathname !== "/admin/settings" ? (
        <footer className="bg-footer-blue absolute w-full">
          <div className="max-w-[1140px] px-[20px] sm:px-[100px] mx-auto lg:pt-[0px] lg:pb-[20px] pt-[50px] pb-[50px] sm:pb-[70px]">
            <div className="flex flex-col items-center justify-center lg:pt-[50px] sm:pt-[70px]">
              <Link href="/">
                <Image src={footer} />
              </Link>
              <hr className="w-full border-[#70707030] my-10" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-white font-normal">
                © 2023 Dentfolio. All Rights Reserved.
              </p>

              <div className="flex gap-2 mb-4 sm:mb-0 items-center justify-center">
                <p className="text-white m-[5px]">Follow us on:</p>
                <div className="border border-white rounded-full p-[5px]">
                  <FaFacebookF
                    className="text-white"
                    // style={{
                    //   color: "#fff",
                    //   width: "10px",
                    //   height: "10px",
                    // }}
                  />
                </div>
                <div className="border border-white rounded-full p-[5px]">
                  <FaTwitter
                    className="text-white
                  
                "
                  />
                </div>
                <div className="border border-white rounded-full p-[5px]">
                  <FaInstagram className="text-white" />
                </div>
                <div className="border border-white rounded-full p-[5px]">
                  <FaLinkedin className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;
