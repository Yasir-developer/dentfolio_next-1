import Image from 'next/image';
import React from 'react';
// import { FaLongArrowAltDown, FaStethoscope } from 'react-icons/fa';
// import Account from "../../public/images/Account.svg";
// import photo from "../../public/images/photo.svg";
// import doctor from "../../public/images/doctor.svg";
// import email from "../../public/images/email.svg";
// import message from "../../public/images/message.svg";

const PrivatePatients = () => {
  const steps = [
    {
      img_url: '/images/Account.svg',
      title: '1. CREATE YOUR ACCOUNT',
      description: 'Sign up and create your account.',
    },
    {
      type: '1',
      img_url: '/images/photos.svg',
      title: '2. CREATE CASES',
      description: 'Create Cases to show to potential patients.',
    },

    {
      img_url: '/images/doctor.svg',

      title: '3. LOCAL PATIENTS FIND YOU',
      description:
        'Local patients looking for a dentist visit the site and find you.',
    },
    {
      img_url: '/images/email.svg',
      type: '1',
      title: '4. SEND A EMAIL',
      description:
        'They send a contact form which will arrive to your email inbox.',
    },
    {
      img_url: '/images/message.svg',

      title: '5. YOU CAN DISCUSS VIA EMAIL',
      description:
        'You can discuss their needs via email and pass their details.',
    },
  ];

  return (
    <div className="lg:my-[100px] my-[50px] px-[30px] lg:px-0">
      <h1 className=" text-[26px] lg:text-4xl font-semibold lg:font-bold mb-4 text-black w-full mt-[20px] lg:mt-[0px] text-center">
        5 STEPS TO NEW{' '}
        <span className="text-[26px] lg:text-4xl font-semibold lg:font-bold font-poppins text-custom-blue">
          PRIVATE PATIENTS
        </span>
      </h1>
      <div className="relative lg:mt-[85px] mt-[15px]">
        <hr className="w-[90%] border-[#70707030] mt-0 mx-auto mb-[-85px] hidden md:block " />
        <div className="flex lg:flex-row flex-col justify-center items-center my-10">
          {steps.map((item, index) => {
            return (
              <div
                class="flex flex-col items-center lg:w-[20%] w-full min-h-[300px]  justify-start"
                key={index}
              >
                <img src={item.img_url} />

                <div
                  className={`my-2 py-2 px-5 w-[70%] rounded-[7px] min-h-[70px] flex flex-col justify-center ${
                    item.type == '1' ? 'bg-[#F5F5F5]' : 'bg-custom-blue'
                  }`}
                >
                  <p
                    className={`${
                      item.type == '1'
                        ? 'text-custom-blue text-center font-medium '
                        : 'text-[#F5F5F5] text-center font-medium '
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                <div className="w-[60%] mt-[15px] ">
                  <p className="">{item.description}</p>
                </div>
                {/* <div class="line"></div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivatePatients;
