import Table from '@/components/Table/Table';
import React, { useEffect, useState } from 'react';
import AdminDentistTable from './AdminDentistTable';
import { FaCrosshairs, FaFilter, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { server } from 'config';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-hot-toast';

const DashboardDentistList = ({
  selectedTime,
  selectedTabOpt,
  dentistdata,
  onSelectedTab,
}) => {
  console.log(dentistdata, 'dadaasasas');
  const [dentist, setDentist] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [row, setRow] = useState('');

  console.log(dataa, 'dadaasdsa');

  useEffect(() => {
    setDataa(dentistdata);
    // handleOverview();
  }, [dentistdata]);
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
        Cell: ({ row }) => (
          // console.log(row, 'all row'),
          <p>{moment(row.original.create_at).format('MM/DD/YYYY')}</p>
        ),
        // <div
        //   className="cursor-pointer"
        //   onClick={() => {
        //     const rowIndex = row.index;
        //     handleDeleteRow(rowIndex);
        //   }}
        // >
        //   <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />
        // </div>
      },
      {
        Header: 'Subscription Status',
        accessor: 'paymentVerified',
      },
      {
        Header: 'Action',
        id: 'delete',
        accessor: (str) => 'delete',

        Cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setDeleteId(row.original._id);
              console.log(row.original._id, 'row.original._id');
              setIsModalOpen(true);
              const rowIndex = row.index;
              console.log(rowIndex, 'rowIndex');
              setRow(rowIndex);

              // handleDeleteRow(rowIndex);
            }}
          >
            <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />
          </div>
        ),
      },
    ],
    [dataa]
  );

  const handleDeleteRow = (rowIndex) => {
    const newData = [...dataa];
    newData.splice(rowIndex, 1);
    setDataa(newData);
  };
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

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal when canceled
  };

  const confirmDelete = async () => {
    handleDeleteRow(row);
    // setIsModalOpen(false); // Close the modal when confirmed
    handleDeleteClick();
    setIsModalOpen(false);
  };

  const handleDeleteClick = async () => {
    // data.splice(index, 1);
    await axios
      .delete(`${server}/api/users/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success('User Deleted Successfully');
        }
      });

    // setData((prevCases) =>
    //   prevCases.filter((methodItem) => methodItem.id !== paymentid)
    // );
    // setLoader(false);
  };
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75 z-[999]">
          <div className="bg-white p-8 rounded shadow-lg">
            <p>Do you want to delete this user?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-custom-blue text-white rounded hover:bg-sky-500"
                onClick={confirmDelete} // Call confirmDelete when confirmed
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={cancelDelete} // Call cancelDelete when canceled
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminDentistTable
        columns={selectedTabOpt === 'revenue' ? RevenueColumns : columns}
        data={selectedTabOpt === 'revenue' ? revenueData : dataa}
      />
    </div>
  );
};

export default DashboardDentistList;
