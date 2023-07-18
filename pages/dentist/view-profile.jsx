// import { ncOpts } from '@/api-lib/nc';
import DentistTabs from '@/components/DentistTabs/DentistTabs';
import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import ViewProfilePage from '@/page-components/ViewProfilePage';
// import getSession from '@/api-lib/middlewares/session';
// import nc from 'next-connect';
// import { database } from '@/api-lib/middlewares';

import axios from 'axios';
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

export default viewprofile;
