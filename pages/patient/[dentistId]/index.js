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

const userPage = (profile) => {
  console.log(profile.profile._id, 'postingg');
  // const { profile } = useSelector((state) => state.dentist);
  const { user } = useSelector((state) => state.auth);
  const { dentist } = useSelector((state) => state.dentist);

  console.log(dentist, 'profile');
  const [loader, setLoader] = useState(true);

  const [cases, setCases] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    showCases();
  }, []);

  const showCases = () => {
    setLoader(true);

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/cases`, {
        id: profile.profile?._id,
        options,
      })
      .then((res) => {
        console.log(res.data, 'ressss');
        setLoader(false);
        // console.log(res.data.cases, 'res =======');
        // console.log(JSON.parse(res.data.cases[1].caseType), 'JSON.parse(');
        // setLoader(false);
        if (res.status == 200) {
          setCases(res?.data?.cases);
          // setTypes(JSON.parse(res.data.cases.caseTypes));
          console.log('first');
        }
      })
      .catch((error) => {});
  };
  return (
    <div>
      <DoctorBasicDetail data={profile.profile} />
      <TreatmentProvide treatment={profile.profile.treatment_type} />
      <PreviousCases case={cases} />
    </div>
  );
};

export async function getServerSideProps(context) {
  await nextConnect().use(database).run(context.req, context.res);

  // const res = await fetch(`${server}/api/`);
  console.log(context.query.dentistId, 'context context');
  // const handler = nc(ncOpts);
  // handler.use(database);
  // return db;
  const post = await findUserById(context.req.db, context.query.dentistId);
  let profile;
  const res = await axios(`${server}/api/dentists/${context.query.dentistId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    console.log(res.data, 'reas');
    profile = res?.data?.user;
  });
  // const data = await res.json();
  // console.log(res.json(), 'post post');

  // console.log(
  //   `${server}/api/teachers/popular`,
  //   "`${server}/api/teachers/popular`"
  // );
  // const data = await res.json();

  return {
    props: {
      profile: profile,
    },
  };
}

export default userPage;