import TimeFilter from '@/components/TimeFilter/TimeFilter';
import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardDentistList from './DashboardDentistList';
import axios from 'axios';
import { server } from 'config';

const AdminDentistPage = () => {
  const [selectedOption, setSelectedOption] = useState('last24');
  const [selectedTab, setSelectedTab] = useState('dentist');
  const [loader, setLoader] = useState(true);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    // Perform any additional logic based on the selected option
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
        // data={dentist}
      />
      {/* Rest of the page */}
    </div>
  );
};

export default AdminDentistPage;
