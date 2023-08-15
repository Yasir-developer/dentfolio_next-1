import Table from '@/components/Table/Table';
import React, { useEffect, useState } from 'react';
import AdminDentistTable from './AdminDentistTable';
import { FaCrosshairs, FaFilter, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { server } from 'config';
import axios from 'axios';

const DashboardDentistList = ({
  selectedTime,
  selectedTabOpt,
  dentistdata,
  onSelectedTab,
}) => {
  console.log(dentistdata, 'dadaasasas');
  const [dentist, setDentist] = useState([]);
  // useEffect(() => {
  //   handleOverview();
  // }, []);
  // const handleOverview = () => {
  //   // setLoader(true);

  //   const options = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   axios
  //     .get(`${server}/api/dentists`, {
  //       options,
  //     })
  //     .then((res) => {
  //       console.log(res, 'responsess');
  //       // setLoader(false);

  //       if (res.status == 200) {
  //         setDentist(res?.data?.dentists);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error, 'error');
  //     });
  // };
  // console.log(selectedTabOpt, "selectedTabOpt");
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        id: 'index',
        // accessor: i + 1,
        Cell: ({ row, flatRows }) => {
          return flatRows.indexOf(row) + 1;
        },
      },
      {
        Header: 'Dentist Name',
        accessor: 'displayName',
      },
      {
        Header: 'Email Address',
        accessor: 'email',
      },
      {
        Header: 'Creation Date',
        accessor: 'create_at',
      },
      {
        Header: 'Subscription Status',
        accessor: 'paymentVerified',
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const RevenueColumns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Dentist Name',
        accessor: 'dentist',
      },
      {
        Header: 'Email Address',
        accessor: 'email',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Next Due Date',
        accessor: 'due',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const data = [
    {
      id: '645',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Trial',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '646',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Premium',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '647',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Trial',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },

    {
      id: '648',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Trial',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '649',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Premium',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '650',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Premium',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '651',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Trial',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '652',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Premium',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: '653',
      dentist: 'Dr. Kathy',
      email: 'kathy.hill@mail.com',
      cases: 5,

      subscription: 'Trial',
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
  ];

  //   const [data, setData] = useState([]);
  const revenueData = [
    {
      id: '645',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Non Active',
    },
    {
      id: '646',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '647',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '648',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '649',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '650',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Non Active',
    },
    {
      id: '651',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '652',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Active',
    },
    {
      id: '653',
      dentist: selectedTime == 'last24' ? 'Dr. Kathy' : 'Dr. Jane',
      email: 'kathy.hill@mail.com',
      amount: '£99',

      due: '6/16/2023',
      status: 'Non Active',
    },
  ];

  const myIndexedData = dentist.map((el, index) => ({ index, ...el })); //immutable

  return (
    <div className="bg-white p-3 rounded-[7px] my-3 ">
      {/* <div className="w-full flex justify-end items-end">
          <div className="w-full lg:w-2/5 flex flex-row items-center rounded-[7px] my-10 lg:my-0 lg:ml-4 border border-[#858585]">


            <input
              type="text"
              placeholder="Search"
              className="flex-grow py-2 px-4 focus:outline-none bg-transparent"
            />
            <FaSearch color="#000" className="w-6 h-6 pr-2" />

          </div>
        </div> */}
      {/* </div> */}

      <AdminDentistTable
        columns={selectedTabOpt === 'revenue' ? RevenueColumns : columns}
        data={selectedTabOpt === 'revenue' ? revenueData : dentistdata}
      />
    </div>
  );
};

export default DashboardDentistList;
