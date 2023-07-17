import React from "react";
import caseOne from "../../../public/images/case2.png";
import Image from "next/image";

const PreviousCases = () => {
  const caseTypes = [
    {
      img_url: "/images/case2.png",
      name: "Composite Bonding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      type: ["Aligners", "Bridges", "Implants", "Root Canal Treatment"],
    },
    {
      img_url: "/images/case1.png",
      name: "Composite Bonding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      type: ["Aligners", "Root Canal Treatment", "Bridges", "Implants"],
    },
  ];
  return (
    <div className="sizingStyles">
      <h2 className="text-[25px] lg:text-[32px] text-black text-center font-medium mt-[70px]">
        MY PREVIOUS <span className=" text-custom-blue">CASES</span>
      </h2>
      <div className="mb-10">
        {/* <div> */}
        {caseTypes.map((item, index) => {
          return (
            <div
              className="border rounded-[7px] border-[#F6EBEB] border-b flex flex-col-reverse lg:flex-row items-center px-3 mt-7"
              key={index}
            >
              <Image
                src={item.img_url}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full max-w-[300px] lg:w-auto lg:h-[170px] my-3"
              />

              <div className="flex flex-col lg:px-5 pt-5 pb-5 justify-center">
                <h2 className="text-left text-[21px] text-custom-blue font-semibold">
                  Composite Bonding
                </h2>
                <div className="flex flex-col">
                  <p className="lg:text-left text-[12px] lg:text-[16px] font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur congue, sapien non efficitur sollicitudin, ex
                    risus semper diam, sed ornare libero urna ac leo sit amet
                    consectetur adipiscing elit Curabitur congue sapien non
                    efficitur sollicitudin.
                  </p>
                  <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                    {item.type.map((data, dataIndex) => (
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* </div> */}
    </div>
  );
};

export default PreviousCases;
