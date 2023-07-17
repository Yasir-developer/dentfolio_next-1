import React from "react";
import checkCircle from "../../../public/images/check-circle.svg";
import Image from "next/image";
import Slider from "react-slick";

const TreatmentProvide = (props) => {
  console.log(props, "props.treatmentData");
  const settings = {
    className: "customSlider",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
    ],
  };
  const treatmentArray = [
    {
      type: "Oral Examination",
    },
    {
      type: "Teeth Alignments",
    },
    {
      type: "Teeth Straightening",
    },
    {
      type: "Root Canal",
    },
  ];
  return (
    <div className="my-5 sizingStyles">
      <h2 className="text-[25px] lg:text-[32px] text-black text-center font-medium">
        <span className=" text-custom-blue">TREATMENT</span> I PROVIDE
      </h2>
      <div className="mt-7 lg:gap-x-5 gap-y-5 flex flex-col lg:flex-row items-center">
        {/* <Slider {...settings}> */}
        {props?.treatmentData?.map((item, index) => {
          return (
            <div
              className="min-h-[180px] lg:min-h-full !w-[90%] bg-custom-blue-light items-center justify-center py-7 text-center rounded-[7px]"
              key={index}
            >
              <Image src={checkCircle} alt="logo" className="mx-auto" />

              <p className="text-custom-black text-[18px] font-semibold mt-3">
                {item.type}
              </p>
            </div>
          );
        })}
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default TreatmentProvide;
