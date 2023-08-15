import TimeFilter from '@/components/TimeFilter/TimeFilter';
import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardDentistList from './DashboardDentistList';
import axios from 'axios';
import { server } from 'config';

const AdminDentistPage = () => {
  const [selectedOption, setSelectedOption] = useState('Last 24 hours');
  const [selectedTab, setSelectedTab] = useState('dentist');
  const [loader, setLoader] = useState(true);
  const [dentist, setDentist] = useState([]);

  useEffect(() => {
    contactMe();
  }, [selectedOption]);

  const handleSelectOption = (option) => {
    console.log(option, 'option');
    // e.preventefault();
    setSelectedOption(option);
    // if(option){

    // }
    // contactMe(e);
    // Perform any additional logic based on the selected option
  };

  const contactMe = (e) => {
    // e.preventDefault();
    // if (name && phone && email || description) {
    // setContactLoader(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`${server}/api/dentists/time/${selectedOption}`, {
        options,
      })
      .then((res) => {
        // return;
        if (res.status == 200) {
          console.log(res, 'response data');
          // setContactLoader(false);
          setDentist(res?.data?.dentists);
        } else if (res.status == 400) {
        }
      })
      .catch((error) => {
        // toast.success(error?.response?.data?.message);
        // setContactLoader(false);
        console.log(error, 'erroorrr lst mon');
      });
    // } else {
    //   toast.error('All fields are required to Continue');
    // }
  };
  return (
    <div className="w-[90%] mx-auto my-9 justify-center items-center">
      {/* Other content */}
      <TimeFilter
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
      />

      {/* <DashboardCard /> */}
      <DashboardDentistList
        // onSelectedTab={handleSelectTab}
        selectedTabOpt={selectedTab}
        dentistdata={dentist}
      />
      {/* Rest of the page */}
    </div>
  );
};

export default AdminDentistPage;
