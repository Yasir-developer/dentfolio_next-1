import Image from "next/image";
import React from "react";
import BlueButtons from "../Buttons/BlueButtons";
import { FaEllipsisV } from "react-icons/fa";

const EditCaseCard = ({ img_url, name, description, id, types, showModalProp }) => {
  return (
    <div className="w-full">
      <div className="mb-10">
        {/* <div> */}
        <div
          className="border rounded-[7px] border-[#F6EBEB] relative flex lg:flex-row flex-col-reverse px-3 mt-7"
          key={id}
        >
          <div className="flex flex-col my-3 gap-y-[3px]">
              {(img_url && img_url.length > 1) ? 
              (img_url.map((img,imgIndex) => {
                return (
                    imgIndex <= 1 ? 
                    <Image
                      src={img}
                      alt="logo"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full max-h-[85px] lg:w-auto"
                    />
                    : ''
                  )
                
              })) : (

                <Image
                  src={'/images/case2.png'}
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full max-w-[300px] lg:w-auto lg:h-[170px] my-3"
                />
              )
            }
              
          </div>

          <div className="flex flex-wrap lg:px-5 pt-5 pb-5 items-center lg:items-start">
            <h2 className="lg;text-center lg:text-left text-[21px] text-custom-blue font-semibold my-2 lg:w-full w-[90%]">
              {name}
            </h2>
            <FaEllipsisV className="static w-[5%] lg:absolute lg:right-0 lg:top-0 lg:w-[18px] lg:h-[18px] font-black lg:mx-[3px] lg:mb-[3px] lg:mt-[5px]" />

            <p className="text-left text-[12px] lg:text-[16px] font-light w-full">
              {description}
            </p>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
              {types?.map((data, dataIndex) => (
                <div
                  className="bg-custom-blue-light flex items-center justify-center h-8 px-3 rounded-[7px]"
                  key={dataIndex}
                >
                  <p className="text-center text-custom-black text-[14px] font-semibold">
                    {data}
                  </p>
                </div>
              ))}
            </div>
            <div className="justify-start w-full">
              <BlueButtons buttonText={"Edit"} className={"mx-auto my-2 "} onClick={() => showModalProp()} />
            </div>
          </div>
          {/* <FaEllipsisV
            style={{
              margin: "3px",
              marginTop: "5px",
              color: "#000",
              width: "18px",
              height: "18px",
            }}
          /> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EditCaseCard;
