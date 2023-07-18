import TimeFilter from "@/components/TimeFilter/TimeFilter";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardDentistList from "./DashboardDentistList";

const AdminDentistPage = () => {
  const [selectedOption, setSelectedOption] = useState("last24");
  const [selectedTab, setSelectedTab] = useState("dentist");

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
      />
      {/* Rest of the page */}
    </div>
  );
};

export default AdminDentistPage;
