import TimeFilter from "@/components/TimeFilter/TimeFilter";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardDentistList from "./DashboardDentistList";
import { FaMobileAlt, FaMoneyBillWave, FaUserMd } from "react-icons/fa";

const RevenuePage = () => {
  const [selectedOption, setSelectedOption] = useState("last24");
  const [selectedTab, setSelectedTab] = useState("revenue");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    // Perform any additional logic based on the selected option
  };

  const handleSelectTab = (option) => {
    setSelectedTab(option);
    // Perform any additional logic based on the selected option
  };

  const cardData = [
    {
      count: "1564",
      iconType: (
        <FaUserMd className="w-[28px] h-[33px] text-custom-blue text-center" />
      ),
      topic: "Total Revenue",
    },
    {
      count: "£212,189",

      iconType: (
        <FaMoneyBillWave className="w-[28px] h-[33px] text-custom-blue text-center" />
      ),

      topic: "Subscription Expired",
    },
    {
      count: "56",

      iconType: (
        <FaMobileAlt className="w-[28px] h-[33px] text-custom-blue text-center" />
      ),
      topic: "Renewal Subscription",
    },
  ];
  return (
    <div className="w-[90%] mx-auto my-9 justify-center items-center">
      {/* Other content */}
      <TimeFilter
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
      />
      <div className="flex lg:flex-row flex-col gap-x-20 py-6">
        {" "}
        {cardData.map((item, index) => {
          return (
            <DashboardCard
              icontype={item.iconType}
              count={item.count}
              topic={item.topic}
              key={index}
            />
          );
        })}
      </div>
      <DashboardDentistList
        // onSelectedTab={handleSelectTab}
        selectedTabOpt={selectedTab}
      />
      {/* Rest of the page */}
    </div>
  );
};

export default RevenuePage;
