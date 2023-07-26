import React, { useEffect, useState } from 'react';
// import caseOne from "../../../public/images/case2.png";
import Image from 'next/image';
import axios from 'axios';
import { server } from 'config';

const PreviousCases = () => {
  const [cases, setCases] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    showCases();
  }, []);

  const showCases = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/cases/`, {
        options,
      })
      .then((res) => {
        console.log(res.data.cases, 'res =======');
        // console.log(JSON.parse(res.data.cases[1].caseType), 'JSON.parse(');
        // setLoader(false);
        if (res.status == 200) {
          setCases(res.data.cases);
          // setTypes(JSON.parse(res.data.cases.caseTypes));
          console.log('first');
        }
      })
      .catch((error) => {});
  };
  const caseTypes = [
    {
      img_url: '/images/case2.png',
      name: 'Composite Bonding',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.',
      type: ['Aligners', 'Bridges', 'Implants', 'Root Canal Treatment'],
    },
    {
      img_url: '/images/case1.png',
      name: 'Composite Bonding',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.',
      type: ['Aligners', 'Root Canal Treatment', 'Bridges', 'Implants'],
    },
  ];

  return (
    <div className="sizingStyles">
      <h2 className="text-[25px] lg:text-[32px] text-black text-center font-medium mt-[70px]">
        MY PREVIOUS <span className=" text-custom-blue">CASES</span>
      </h2>
      <div className="mb-10">
        {/* <div> */}
        {cases?.length > 0 ? (
          cases.map((item, index) => {
            console.log(item, 'item');
            return (
              <div
                className="border rounded-[7px] border-[#F6EBEB] border-b flex flex-col-reverse lg:flex-row items-center px-3 mt-7"
                key={index}
              >
                <div className="flex flex-col my-3 gap-y-[3px] w-[30%]">
                  {/* return ( */}

                  <Image
                    src={item.cases_photo}
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full lg:w-auto"
                  />
                </div>

                <div className="flex flex-col lg:px-5 pt-5 pb-5 justify-center w-[70%]">
                  <h2 className="text-left text-[21px] text-custom-blue font-semibold">
                    {item?.case_title}
                    {/* Composite Bonding */}
                  </h2>
                  <div className="flex flex-col">
                    <p className="lg:text-left text-[12px] lg:text-[16px] font-normal">
                      {item?.description}
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur congue, sapien non efficitur sollicitudin, ex
                      risus semper diam, sed ornare libero urna ac leo sit amet
                      consectetur adipiscing elit Curabitur congue sapien non
                      efficitur sollicitudin. */}
                    </p>
                    <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                      {item?.caseType?.map((data, dataIndex) => (
                        <div
                          className="bg-custom-blue-light flex items-center justify-center h-8 px-3 rounded-[7px]"
                          key={dataIndex}
                        >
                          <p className="text-center text-custom-black text-[14px] font-semibold">
                            {data?.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No Cases found</p>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default PreviousCases;
