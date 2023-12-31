import React from 'react';
import { FaMobileAlt, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';
// import * as FontAwesome from "react-icons/md";

const DashboardCard = ({ icontype, count, topic }) => {
  return (
    <div className="bg-white lg:w-[50%] mt-3 lg:mt-0 w-full px-3 rounded-[7px] py-2">
      <div className="flex flex-row justifiy-center items-center py-6">
        <div className="flex bg-[#EBFAF8] p-4 rounded-[36px] justifiy-center items-center">
          {icontype}
        </div>
        <div className="flex flex-col px-3">
          <p className="text-[30px] font-semibold">{count}</p>
          <p className="text-[14px] font-medium">{topic}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
