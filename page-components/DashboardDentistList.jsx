import Table from "@/components/Table/Table";
import React from "react";
import AdminDentistTable from "./AdminDentistTable";
import { FaCrosshairs, FaFilter, FaSearch, FaTrashAlt } from "react-icons/fa";

const DashboardDentistList = ({
  selectedTime,
  selectedTabOpt,
  onSelectedTab,
}) => {
  console.log(selectedTabOpt, "selectedTabOpt");
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Dentist Name",
        accessor: "dentist",
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "No Of Cases",
        accessor: "cases",
      },
      {
        Header: "Subscription Status",
        accessor: "subscription",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const RevenueColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Dentist Name",
        accessor: "dentist",
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Next Due Date",
        accessor: "due",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = [
    {
      id: "645",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Trial",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "646",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Premium",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "647",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Trial",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },

    {
      id: "648",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Trial",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "649",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Premium",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "650",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Premium",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "651",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Trial",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "652",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Premium",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
    {
      id: "653",
      dentist: "Dr. Kathy",
      email: "kathy.hill@mail.com",
      cases: 5,

      subscription: "Trial",
      action: <FaTrashAlt className="w-4 h-4 text-[#F46A6A]" />,
    },
  ];

  //   const [data, setData] = useState([]);
  const revenueData = [
    {
      id: "645",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Non Active",
    },
    {
      id: "646",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "647",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "648",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "649",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "650",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Non Active",
    },
    {
      id: "651",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "652",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Active",
    },
    {
      id: "653",
      dentist: selectedTime == "last24" ? "Dr. Kathy" : "Dr. Jane",
      email: "kathy.hill@mail.com",
      amount: "£99",

      due: "6/16/2023",
      status: "Non Active",
    },
  ];
  return (
    <div className="bg-white p-3 rounded-[7px] my-3 ">
      <div className="my-3 flex lg:flex-row flex-col">
        <div className="flex flex-col lg:w-[50%]">
          <p className="font-semibold text-[15px]">Dentist List</p>
          <p className="font-light text-[13px] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="w-full flex justify-end items-end">
          <div className="w-full lg:w-2/5 flex flex-row items-center rounded-[7px] my-10 lg:my-0 lg:ml-4 border border-[#858585]">
            {/* <div className="flex items-center p-4 w-full"> */}
            {/* <div className=" w-full flex items-center rounded-[5px]"> */}
            {/* <FaCrosshairs size={20} color="#000" className="ml-2" /> */}

            <input
              type="text"
              placeholder="Search"
              className="flex-grow py-2 px-4 focus:outline-none bg-transparent"
            />
            <FaSearch color="#000" className="w-6 h-6 pr-2" />

            {/* <button
                className="bg-custom-blue text-white px-4 py-2 rounded ml-2 focus:outline-none"
                onClick={() => Router.push("/patient/dentist-list")}
              >
                Search
              </button> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <AdminDentistTable
        columns={selectedTabOpt === "revenue" ? RevenueColumns : columns}
        data={selectedTabOpt === "revenue" ? revenueData : data}
      />
    </div>
  );
};

export default DashboardDentistList;
