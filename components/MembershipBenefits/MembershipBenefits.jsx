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
          <p className="text-[14px] lg:text-[16px] font-semibold">
            Stand out and get noticed by potential patients.
          </p>
        </div>

        <div className="flex mt-5 items-center gap-x-2">
          <Image src={userplus} alt="logo" />

          <p className="text-[14px] lg:text-[16px] font-semibold">
            Attract new patient enquiries{' '}
          </p>
        </div>

        <div className="flex mt-5 items-center gap-x-2">
          <Image src={file} alt="logo" />
          <p className="text-[14px] lg:text-[16px] font-semibold">
            Grow your private list{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;
