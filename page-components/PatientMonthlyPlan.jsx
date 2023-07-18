import MembershipBenefits from "@/components/MembershipBenefits/MembershipBenefits";
import MonthlyPlan from "@/components/MonthlyPlan/MonthlyPlan";
import React from "react";

const PatientMonthlyPlan = () => {
  return (
    <div className="flex w-full lg:flex-row flex-col justify-center gap-x-[100px] my-10">
      <MonthlyPlan />
      <MembershipBenefits />
    </div>
  );
};

export default PatientMonthlyPlan;
