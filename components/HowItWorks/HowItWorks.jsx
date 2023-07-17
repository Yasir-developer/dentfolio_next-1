import Image from "next/image";
import React from "react";
import upArrow from "../../../public/images/up.svg";
import downArrow from "../../../public/images/down.svg";
import dental from "../../../public/images/dental.png";
import satisfied from "../../../public/images/satisfied.png";
import cellular from "../../../public/images/cellular.png";

const HowItWorks = () => {
  return (
    // <div className="mb-[100px] mt-[100px] sizingStyles">
    //   <div className="flex items-center  w-full justify-center">
    //     <h1 className="mb-4 text-black text-[32px] font-semibold">
    //       HOW IT <span className=" font-semibold text-custom-blue">WORKS</span>{" "}
    //     </h1>
    //   </div>
    //   <div className="flex-row">
    //     <div className="flex items-center justify-center mt-[50px] gap-x-[10px]">
    //       <div className="bg-[#EBFAF8] px-5 font-poppins relative rounded-[7px] w-[30%] min-h-[250px]">
    //         <div className="w-[80%] flex flex-col justify-around min-h-[200px]">
    //           <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
    //             FIND DENTISTS NEAR YOU
    //           </h1>
    //           <p className="text-[14px] font-extralight">
    //             Discover local dentists in your area and choose the perfect one
    //             for your dental needs.
    //           </p>

    //           <p className="text-[14px]  underline decoration-solid text-custom-blue font-poppins font-semibold">
    //             Find Dentist
    //           </p>
    //         </div>

    //         <div className="absolute bottom-0 right-0">
    //           <Image
    //             src={satisfied}
    //             alt="logo"
    //             className="max-h-[160px] w-auto"
    //           />
    //         </div>
    //       </div>
    //       <Image src={upArrow} alt="logo" className="max-w-[50px]" />

    //       <div className="bg-[#F7CBBF] px-5 font-poppins relative rounded-[7px] w-[30%] min-h-[250px]">
    //         <div className="flex w-[80%] flex-col justify-around min-h-[200px]">
    //           <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
    //             EXPLORE DENTAL WORK
    //           </h1>
    //           <p className=" text-[14px] font-extralight">
    //             Discover impressive dental work through a collection of photos
    //             showcasing exceptional treatments.
    //           </p>

    //           <p className="text-[14px] underline decoration-solid text-custom-blue font-poppins font-semibold">
    //             Find Dentist
    //           </p>
    //         </div>

    //         <div className="absolute bottom-0 right-0">
    //           <Image src={dental} alt="logo" className="max-h-[160px] w-auto" />
    //         </div>
    //       </div>
    //       <Image src={downArrow} alt="logo" className="max-w-[50px]" />

    //       <div className="bg-[#DCE8FA] px-5 font-poppins relative rounded-[7px] w-[30%] min-h-[250px]">
    //         <div className="flex flex-col justify-around w-[80%] min-h-[200px]">
    //           <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
    //             CONTACT YOUR DENTAL
    //           </h1>
    //           <p className=" text-[14px] font-extralight">
    //             Contact Your Dental: Find a local dentist and schedule
    //             appointments easily with our convenient online platform
    //           </p>

    //           <p className="text-[14px] underline decoration-solid text-custom-blue font-poppins font-semibold">
    //             Find Dentist
    //           </p>
    //         </div>

    //         <div className="absolute bottom-0 right-0">
    //           <Image
    //             src={cellular}
    //             alt="logo"
    //             className="max-h-[160px] w-auto"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="lg:mb-[100px] lg:mt-[50pxpx] mt-[50px]   mb-[50px] sizingStyles">
      <div className="flex items-center w-full justify-center">
        <h1 className="lg:mb-10 mb-5 text-black lg:text-[32px] text-[26px] font-semibold">
          HOW IT <span className="font-semibold text-custom-blue">WORKS</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-x-[10px] m">
        <div className="bg-[#EBFAF8] px-5 font-poppins relative rounded-[7px] w-full md:w-[30%] mb-[50px] lg:my-[0px] min-h-[250px] md:mb-0">
          <div className="w-[80%] flex flex-col justify-around min-h-[200px]">
            <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
              FIND DENTISTS NEAR YOU
            </h1>
            <p className="text-[14px] font-normal">
              Discover local dentists in your area and choose the perfect one
              for your dental needs.
            </p>
            <a
              className="text-[14px] hover:underline decoration-solid text-custom-blue font-poppins font-semibold"
              href="#"
            >
              Find Dentist
            </a>
          </div>
          <div className="absolute bottom-0 right-0">
            <Image
              src={satisfied}
              alt="logo"
              className="max-h-[160px] w-auto"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <Image src={upArrow} alt="logo" className="max-w-[50px]" />
        </div>
        <div className="bg-[#F7CBBF] px-5 font-poppins relative rounded-[7px] w-full md:w-[30%] mb-[50px] min-h-[250px] md:mb-0">
          <div className="flex w-[80%] flex-col justify-around min-h-[200px]">
            <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
              EXPLORE DENTAL WORK
            </h1>
            <p className="text-[14px] font-normal">
              Discover impressive dental work through a collection of photos
              showcasing exceptional treatments.
            </p>
            <a
              className="text-[14px] hover:underline decoration-solid text-custom-blue font-poppins font-semibold"
              href="#"
            >
              Find Dentist
            </a>
          </div>
          <div className="absolute bottom-0 right-0">
            <Image src={dental} alt="logo" className="max-h-[160px] w-auto" />
          </div>
        </div>
        <div className="hidden md:block">
          <Image src={downArrow} alt="logo" className="max-w-[50px]" />
        </div>
        <div className="bg-[#DCE8FA] px-5 font-poppins relative rounded-[7px] w-full md:w-[30%] min-h-[250px]">
          <div className="flex flex-col justify-around w-[80%] min-h-[200px]">
            <h1 className="font-semibold text-[18px] mt-5 mb-2 text-custom-blue">
              CONTACT YOUR DENTAL
            </h1>
            <p className="text-[14px] font-normal">
              Contact Your Dental: Find a local dentist and schedule
              appointments easily with our convenient online platform.
            </p>
            <a
              className="text-[14px] hover:underline decoration-solid text-custom-blue font-poppins font-semibold"
              href="#"
            >
              Find Dentist
            </a>
          </div>
          <div className="absolute bottom-0 right-0">
            <Image src={cellular} alt="logo" className="max-h-[160px] w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
