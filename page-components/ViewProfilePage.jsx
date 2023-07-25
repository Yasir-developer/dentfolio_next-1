import DashboardTreatment from '@/components/DashboardTreatment/DashboardTreatment';
import DentistTabs from '@/components/DentistTabs/DentistTabs';
import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { server } from "../../config";
import { useSelector } from 'react-redux';

const ViewProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [treatment, setTreatment] = useState([]);
  const [casesData, setCasesData] = useState([]);

  const [loader, setLoader] = useState(true);

  const { user } = useSelector((state) => state.auth);

  const handleProfile = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/dentists/${user?._id}`, {
        options,
      })
      .then((res) => {
        console.log(res?.data?.user, 'res =======');
        // setLoader(false);
        if (res.status == 200) {
          setProfile(res?.data?.user);
          setTreatment(res?.data?.user?.treatment_type);
          setCasesData(res?.data?.user?.previous_case);
          setLoader(false);
        }
      })
      .catch((error) => {});
  };
  return (
    <div className="w-[90%] mx-auto">
      {/* <DentistTabs> */}
      {/* <EditCasePage /> */}
      {/* <h1>Edit case</h1> */}
      <div className="">
        {!loader ? (
          <div
            aria-label="Loading..."
            role="status"
            className="justify-center items-center text-center"
          >
            <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-indigo-200"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-custom-blue"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <DoctorBasicDetail data={user} />
            <DashboardTreatment treatmentData={user?.treatment_type} />
            {/* <TreatmentProvide /> */}
            <PreviousCases cases={casesData} />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProfilePage;
