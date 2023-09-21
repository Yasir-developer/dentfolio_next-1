// import { ncOpts } from '@/api-lib/nc';
import { getSession } from '@/api-lib/middlewares/session';

import DentistTabs from '@/components/DentistTabs/DentistTabs';
import DoctorBasicDetail from '@/components/DoctorBasicDetail/DoctorBasicDetail';
import PreviousCases from '@/components/PreviousCases/PreviousCases';
import TreatmentProvide from '@/components/TreatmentProvide/TreatmentProvide';
import ViewProfilePage from '@/page-components/ViewProfilePage';
import { FaMapMarkerAlt, FaTimes, FaWindowClose } from 'react-icons/fa';

// import getSession from '@/api-lib/middlewares/session';
// import nc from 'next-connect';
// import { database } from '@/api-lib/middlewares';

import axios from 'axios';
import nextConnect from 'next-connect';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from '@/page-components/Checkout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const viewprofile = ({ data }) => {
  const { user, modal } = useSelector((state) => state.auth);

  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  useEffect(() => {
    console.log(modal, 'modal');
    if (modal == true) {
      setPaymentModalShow(true);
    }
  }, [modal]);

  const options = { mode: 'billing' };

  const paymentForm = (e) => {
    return (
      <div className="loginModal">
        <FaWindowClose
          className="text-right ml-auto w-5 h-5 cursor-pointer"
          onClick={() => {
            dispatch(paymentModal(false));
            // dispatch(handleModal(false));
          }}
        />

        <div>
          {/* <InjectedCheckoutForm /> */}
          <Elements stripe={stripePromise} option={options}>
            {/* <PaymentElement /> */}

            <CheckoutForm />
            {/* <AddressForm /> */}
          </Elements>
        </div>
      </div>
    );
  };
  return (
    <div className="dentistBodyStyles">
      {modal ? (
        <div className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[9999]">
          {paymentForm()}
        </div>
      ) : (
        <></>
      )}
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
