// import { ncOpts } from '@/api-lib/nc';
import { getSession } from '@/api-lib/middlewares/session';

import DentistTabs from '@/components/DentistTabs/DentistTabs';
import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import ViewProfilePage from '@/page-components/ViewProfilePage';
// import getSession from '@/api-lib/middlewares/session';
// import nc from 'next-connect';
// import { database } from '@/api-lib/middlewares';

import axios from 'axios';
import nextConnect from 'next-connect';
import React, { useEffect, useState } from 'react';
// import { server } from "../../../config";
// import { connectToDatabase } from "../../db";
// import { ObjectId } from "mongodb";
// import { getSession } from "../../../api-lib/middlewares/session";
// import { getSession } from "next-auth/client";
// import { getSession, useSession } from "next-auth/react";

const viewprofile = ({ data }) => {
  return (
    <div className="dentistBodyStyles">
      <DentistTabs>
        {/* <EditCasePage /> */}
        {/* <h1>Edit case</h1> */}

        <ViewProfilePage />
      </DentistTabs>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  // await nextConnect().use(database).run(context.req, context.res);
  const MySession = await getSession(req, res);
  console.log(MySession, 'MySessions');

  return { props: {} };
}

export default viewprofile;
