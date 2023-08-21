import React, { useEffect, useState } from 'react';
// import caseOne from "../../../public/images/case2.png";
import Image from 'next/image';
import axios from 'axios';
import { server } from 'config';
import EditCaseCard from '@/components/EditCaseCard/EditCaseCard';
import { useSelector } from 'react-redux';

const PreviousCases = ({ id }) => {
  console.log(id, '------');
  const { profile } = useSelector((state) => state.dentist);
  const { user } = useSelector((state) => state.auth);
  console.log(user, 'user user');
  console.log(profile, 'profile');
  const [loader, setLoader] = useState(true);

  const [cases, setCases] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    showCases();
  }, []);

  const showCases = () => {
    setLoader(true);

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/cases?id=${user?._id ? user?._id : id}`, {
        id: profile?.id,
        options,
      })
      .then((res) => {
        setLoader(false);

        if (res.status == 200) {
          setCases(res?.data?.cases);
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
      <div
        className="flex flex-col m-x:!max-h-full lg:flex-wrap mb-10 max-w-[1140px] mx-auto min-h-[500px]"
        style={{
          maxHeight: (cases?.length * 800) / 2,
        }}
      >
        {/* <div> */}
        {!loader ? (
          cases?.length > 0 ? (
            cases.map((item, index) => {
              return (
                <EditCaseCard
                  key={index}
                  casesData={item}
                  id={item._id}
                  name={item.case_title}
                  description={item.description}
                  className={`flex-child flex-masonry-child flex-masonry-child-${
                    index + 1
                  }`}
                  // img_url={
                  //   item?.cases_photo != null
                  //     ? item?.cases_photo
                  //     : '/images/case2.png'
                  // }
                  img_url={item.before_cases_photo}
                  img_url_two={item.after_cases_photo}
                  types={item.caseType}
                  onDeleteClick={() => handleDeleteClick(item._id, index)}
                  // fetchCases={getCases}
                  showModalProp={() => showModalHandler(item)}
                  hideEdit={true}
                  hideDelete={true}
                />
                // <div
                //   className="border rounded-[7px] border-[#F6EBEB] border-b flex flex-col-reverse lg:flex-row items-center px-3 mt-7"
                //   key={index}
                // >
                //   <div className="flex flex-col my-3 gap-y-[3px] w-[15%]">
                //     {/* return ( */}
                //     {item?.cases_photo != null ?
                //     <Image
                //       src={item?.cases_photo}
                //       alt="logo"
                //       width={0}
                //       height={0}
                //       sizes="100vw"
                //       className="w-full my-3"
                //     />:
                //     <Image
                //       src={'/images/case2.png'}
                //       alt="logo"
                //       width={0}
                //       height={0}
                //       sizes="100vw"
                //       className="w-full my-3"
                //     />
                //   }
                //   </div>

                //   <div className="flex flex-col lg:px-5 pt-5 pb-5 justify-center w-[85%]">
                //     <h2 className="text-left text-[21px] text-custom-blue font-semibold">
                //       {item?.case_title}
                //       {/* Composite Bonding */}
                //     </h2>
                //     <div className="flex flex-col">
                //       <p className="lg:text-left text-[12px] lg:text-[16px] font-normal">
                //         {item?.description}
                //         {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                //       Curabitur congue, sapien non efficitur sollicitudin, ex
                //       risus semper diam, sed ornare libero urna ac leo sit amet
                //       consectetur adipiscing elit Curabitur congue sapien non
                //       efficitur sollicitudin. */}
                //       </p>
                //       <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                //         {item?.caseType?.map((data, dataIndex) => (
                //           <div
                //             className="bg-custom-blue-light flex items-center justify-center h-8 px-3 rounded-[7px]"
                //             key={dataIndex}
                //           >
                //             <p className="text-center text-custom-black lg:text-[14px] text-[11px] font-semibold">
                //               {data?.label}
                //             </p>
                //           </div>
                //         ))}
                //       </div>
                //     </div>
                //   </div>
                // </div>
              );
            })
          ) : (
            <div className="w-full">
              <p className="text-center my-5">No Cases found</p>
            </div>
          )
        ) : (
          <div className="w-full">
            {' '}
            <div aria-label="Loading..." role="status">
              <svg
                class="h-[100px] w-[100px] animate-spin mx-auto"
                viewBox="3 3 18 18"
              >
                <path
                  className="fill-indigo-200"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                ></path>
                <path
                  className="fill-[#0769cc]"
                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                ></path>
              </svg>
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default PreviousCases;
