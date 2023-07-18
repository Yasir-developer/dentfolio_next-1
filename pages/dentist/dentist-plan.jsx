import React from "react";
import DentistMemberBanner from "@/components/DentistMemberBanner/DentistMemberBanner";
import PatientMonthlyPlan from "@/page-components/PatientMonthlyPlan";
// import { useSelector } from "react-redux";

const dentistplan = () => {
  // const { user } = useSelector((state) => state.auth);
  // console.log(user, "user data logout");
  return (
    <div>
      <DentistMemberBanner />
      <PatientMonthlyPlan />
    </div>
  );
};

export default dentistplan;
