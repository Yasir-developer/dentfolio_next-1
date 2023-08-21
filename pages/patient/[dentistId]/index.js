import { findUserById } from '@/api-lib/db';

import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import axios from 'axios';
import { server } from 'config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ncOpts } from '@/api-lib/nc';
import database from '@/api-lib/mongodb';
import nextConnect from 'next-connect';

const userPage = ({ profile, caseData }) => {
  console.log(profile, 'profile');
  console.log(caseData, 'caseData');
  const [loader, setLoader] = useState(true);

  const [cases, setCases] = useState([]);
  const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   showCases();
  // }, []);

  // const showCases = () => {
  //   console.log(profile?.profile?._id, 'profile.profile?._id');
  //   setLoader(true);

  //   const options = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   axios
  //     .get(`${server}/api/cases?id=${profile.profile?._id}`, {
  //       // id: profile.profile?._id,
  //       options,
  //     })
  //     .then((res) => {
  //       console.log(res, 'ressss');
  //       setLoader(false);

  //       if (res.status == 200) {
  //         setCases(res?.data?.cases);
  //       }
  //     })
  //     .catch((error) => {});
  // };
  return (
    <div>
      <DoctorBasicDetail data={profile} />
      <TreatmentProvide treatment={profile.treatment_type} />
      <PreviousCases case={caseData} id={profile._id} />
    </div>
  );
};

export async function getServerSideProps(context) {
  await nextConnect().use(database).run(context.req, context.res);

  // const res = await fetch(`${server}/api/`);
  console.log(context.query.dentistId, 'context context');

  const post = await findUserById(context.req.db, context.query.dentistId);
  let profile;

  const caseRes = await axios(
    `${server}/api/dentists/${context.query.dentistId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((res) => {
      // console.log(res.data, 'reas');
      profile = res?.data?.user;
    })
    .catch((err) => console.log(err, 'sdasdds'));
  let caseData;
  // const res = await axios(
  //   `${server}/api/cases?id=${context?.query?.dentistId}`,
  //   {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   }
  // ).then((res) => {
  //   console.log(res.data.case, 'dadaassd');
  //   caseData = res?.data?.cases;
  // });

  const dash_response = await fetch(
    `${server}/api/cases?id=${context?.query?.dentistId}`
  );
  const card_data = await dash_response.json();
  console.log(card_data, 'card_data');
  return {
    props: {
      profile: profile,
      caseData: card_data,
    },
  };
}

export default userPage;
