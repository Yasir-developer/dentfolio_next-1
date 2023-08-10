import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import axios from 'axios';
import { server } from 'config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const profilepage = () => {
  const { profile } = useSelector((state) => state.dentist);
  const { user } = useSelector((state) => state.auth);

  // console.log(profile, 'profile');
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
        id: user?._id,
        options,
      })
      .then((res) => {
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
      <DoctorBasicDetail data={profile} />
      <TreatmentProvide treatment={profile.treatment_type} />
      <PreviousCases case={cases} />
    </div>
  );
};

export async function getServerSideProps(context) {
  // const res = await fetch(`${server}/api/`);
  console.log(context.params, 'context');
  // const post = await findDentistById(db, context.params.postId);

  // console.log(
  //   `${server}/api/teachers/popular`,
  //   "`${server}/api/teachers/popular`"
  // );
  // const data = await res.json();

  return {
    props: {},
  };
}

export default profilepage;
