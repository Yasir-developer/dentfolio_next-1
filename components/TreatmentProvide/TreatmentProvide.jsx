import React from 'react';
import checkCircle from '../../public/images/check-circle.svg';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const TreatmentProvide = (props) => {
  // console.log(props, '======');
  const settings = {
    className: 'customSlider',
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
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
      type: 'Oral Examination',
    },
    {
      type: 'Teeth Alignments',
    },
    {
      type: 'Teeth Straightening',
    },
    {
      type: 'Root Canal',
    },
    {
      type: 'Root Canal',
    },
    {
      type: 'Root Canal',
    },
    {
      type: 'Root Canal',
    },
  ];
  return (
    <div className="my-5 sizingStyles">
      {props.treatment.length > 0 ? (
        <h2 className="text-[25px] lg:text-[32px] text-black text-center font-medium">
          <span className=" text-custom-blue">TREATMENT</span> I PROVIDE
        </h2>
      ) : (
        <></>
      )}

      {props.treatment.length > 0 ? (
        <div className="mt-7 gap-x-5">
          <Slider {...settings}>
            {props?.treatment?.map((item, index) => {
              return (
                <div>
                  <div
                    className="min-h-[180px] lg:min-h-full !w-[90%] bg-custom-blue-light items-center justify-center py-7 text-center rounded-[7px]"
                    key={index}
                  >
                    <Image src={checkCircle} alt="logo" className="mx-auto" />

                    <p className="text-custom-black text-[18px] font-semibold mt-3">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <></>
        // <p className="text-center">No Treatment Found</p>
      )}
    </div>
  );
};

export default TreatmentProvide;
