import React from "react";
import MonthlyPlan from "../MonthlyPlan/MonthlyPlan";
import { FaAngleDoubleRight } from "react-icons/fa";

const MembershipBenefits = () => {
  return (
    <div className="items-center mx-6 lg:mx-0">
      <h1 className="mt-10 text-[26px] lg:text-[32px] font-semibold">
        MEMBERSHIP BENEFITS
      </h1>
      <p className="text-[16px] lg:text-[18px] text-custom-blue font-medium mt-5">
        Get new patients!
      </p>
      <div className="flex mt-10 items-center gap-x-2">
        <FaAngleDoubleRight size={18} className="text-custom-blue " />{" "}
        <p className="text-[16px] lg:text-[18px] font-semibold">
          Stand out and get noticed by potential patients.
        </p>
      </div>

      <div className="flex mt-10 items-center gap-x-2">
        <FaAngleDoubleRight size={18} className="text-custom-blue " />{" "}
        <p className="text-[16px] lg:text-[18px] font-semibold">
          Attract new patient enquiries{" "}
        </p>
      </div>

      <div className="flex mt-10 items-center gap-x-2">
        <FaAngleDoubleRight size={18} className="text-custom-blue " />{" "}
        <p className="text-[16px] lg:text-[18px] font-semibold">
          Grow your private list{" "}
        </p>
      </div>
    </div>
  );
};

export default MembershipBenefits;
