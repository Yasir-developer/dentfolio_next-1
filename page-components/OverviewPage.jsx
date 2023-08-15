import TimeFilter from '@/components/TimeFilter/TimeFilter';
import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardDentistList from './DashboardDentistList';
import { FaMobileAlt, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';
import { server } from 'config';
import axios from 'axios';

const OverviewPage = () => {
  const [selectedOption, setSelectedOption] = useState('Last 24 hours');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dentistCount, setDentistCount] = useState();
  const [dentist, setDentist] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    handleCardsData();
    contactMe();
  }, [selectedOption]);

  const contactMe = (e) => {
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

  const handleSelectOption = (option) => {
    setSelectedOption(option);

    // Perform any additional logic based on the selected option
  };
  const handleCardsData = () => {
    setLoader(true);

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/dashboard/admin`, {
        options,
      })
      .then((res) => {
        console.log(res, 'res');
        setLoader(false);

        if (res.status == 200) {
          setDentistCount(res?.data);
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };
  const cardData = [
    {
      count: dentistCount?.dentists,
      iconType: (
        <FaUserMd className="w-[28px] h-[33px] text-custom-blue text-center" />
      ),
      topic: 'Total Dentist Sign Up',
    },
    // {
    //   count: "£212,189",

    //   iconType: (
    //     <FaMoneyBillWave className="w-[28px] h-[33px] text-custom-blue text-center" />
    //   ),

    //   topic: "Total Revenue",
    // },
    {
      count: dentistCount?.subscribedDentists,

      iconType: (
        <FaMobileAlt className="w-[28px] h-[33px] text-custom-blue text-center" />
      ),
      topic: 'Dentist Subscribed',
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
        selectedTime={selectedOption}
        // onSelectedTab={handleSelectTab}
        selectedTabOpt={selectedTab}
        dentistdata={dentist}
      />
      {/* Rest of the page */}
    </div>
  );
};

export default OverviewPage;
