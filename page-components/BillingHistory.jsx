import React, { useMemo, useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from 'config';

const BillingHistory = () => {
  const { user } = useSelector((state) => state.auth);

  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    handleHistory();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Payment Invoice',
        accessor: 'number',
      },
      {
        Header: 'Amount',
        accessor: 'amount_paid',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  //   const [data, setData] = useState([]);
  const data = [
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 100,
      date: '2023-06-01',
      status: 'Paid',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 200,
      date: '2023-06-02',
      status: 'Pending',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 150,
      date: '2023-06-03',
      status: 'Paid',
    },

    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 100,
      date: '2023-06-01',
      status: 'Paid',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 200,
      date: '2023-06-02',
      status: 'Pending',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 150,
      date: '2023-06-03',
      status: 'Paid',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 100,
      date: '2023-06-01',
      status: 'Paid',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 200,
      date: '2023-06-02',
      status: 'Pending',
    },
    {
      invoice: 'Invoice#0098 - sep 2020',
      amount: 150,
      date: '2023-06-03',
      status: 'Paid',
    },
  ];

  const handleHistory = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/payments/${user?.customer_id}`, {
        options,
      })
      .then((res) => {
        console.log(res.data.invoicesData, 'res.data');
        // setLoader(false);
        if (res.status == 200) {
          setHistoryData(res.data.invoicesData);
        }
      })
      .catch((error) => {});
  };
  //   useEffect(() => {
  //     (async () => {
  //       const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
  //       setData(result.data);
  //     })();
  //   }, []);
  return (
    <>
      <div className="flex flex-col w-[90%] mx-auto mt-5">
        <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
          Billing History
        </h1>

        <p className="mt-2 text-[16px] font-light mb-5">
          See history of your payment plan
        </p>
      </div>

      <Table columns={columns} data={historyData} />
    </>
  );
};

export default BillingHistory;
