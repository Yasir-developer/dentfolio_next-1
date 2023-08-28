import React from 'react';
import MonthlyPlan from '../MonthlyPlan/MonthlyPlan';
import users from '../../public/images/users.svg';
import userplus from '../../public/images/userplus.svg';
import file from '../../public/images/file.svg';

import { FaAngleDoubleRight } from 'react-icons/fa';
import Image from 'next/image';

const MembershipBenefits = () => {
  return (
    <div className="items-center mx-5 my-5 lg:my-0 lg:mx-0 lg:w-[45%] w-[90%] bg-[#F5F5F5] rounded-[7px]">
      <div className="bg-black w-full rounded-[7px] px-8 py-4">
        <h1 className="text-[26px] lg:text-[32px] font-semibold text-white">
          MEMBERSHIP BENEFITS
        </h1>
        <p className="text-[16px] lg:text-[20px] text-white font-normal">
          Get new patients!
        </p>
      </div>
      <div className="bg-[#F5F5F5] px-5 py-5 rounded-[7px]">
        <div className="flex items-center mt-3 gap-x-2 ">
          <Image src={users} alt="logo" />
          {/* <FaAngleDoubleRight size={18} className="text-custom-blue " />{' '} */}
          <p className="text-[14px] lg:text-[16px] font-normal">
            <span className="text-[14px] lg:text-[16px] font-semibold">
              Increased Exposure:{' '}
            </span>
            Showcase your dental work to a wider audience. Gain visibility and
            attract potential patients actively searching for cosmetic dentistry
            services in your area.{' '}
          </p>
        </div>

        <div className="flex mt-5 items-center gap-x-2">
          <Image src={userplus} alt="logo" />

          <p className="text-[14px] lg:text-[16px] font-normal">
            <span className="text-[14px] lg:text-[16px] font-semibold">
              New Patient Opportunities:{' '}
            </span>
            Receive enquiries directly from patients interested in your
            services.
          </p>
        </div>

        <div className="flex mt-5 items-center gap-x-2">
          <Image src={file} alt="logo" />
          <p className="text-[14px] lg:text-[16px] font-normal">
            <span className="text-[14px] lg:text-[16px] font-semibold">
              Practice Growth:{' '}
            </span>
            Expand your clientele and boost your practice's revenue. With
            Dentfolio’s targeted marketing, you can tap into a growing market
            and increase your private income.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;
