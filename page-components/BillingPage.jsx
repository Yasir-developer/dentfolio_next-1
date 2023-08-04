import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import ElementDemos from '@/components/Stripe';
import StripeForm from '@/components/Stripe/StripeForm';
import StripeCard from '@/components/StripeCard/StripeCard';
// import PaymentCard from "@/components/paymentCard/paymentcard";
import Router from 'next/router';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FaCcMastercard, FaCcVisa, FaTimes } from 'react-icons/fa';
import BillingMethodForm from '../page-components/BillingMethodForm/BillingMethodForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { server } from 'config';
import { PaymentMethods, handleModal } from 'redux/actions/payment';
import { toast } from 'react-hot-toast';
// import { Visa } from "@/utils/cardSvgs";
const stripePromise = loadStripe(
  'pk_test_51NU3nUFH7jk2A82vTjlYco1pIAuL6ErOcBHh5p5n79GPhVSoBaENlQMi8bKFjluK0c37DcNtkCpGIbW9vCW06gnv00Q5Xtq7BH'
);

const BillingPage = (props) => {
  console.log(props, ';;;;;');
  const [startDate, setStartDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  // const [paymentMethods, setPaymentMethods] = useState([]);
  const { change, paymentMethods, paydata } = useSelector(
    (state) => state.payment
  );

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log(user.customer_id, '======');

  useEffect(() => {
    setLoader(true);
    const data = {
      id: user.customer_id,
    };
    if (!change) {
      dispatch(PaymentMethods(data));
    }
    setLoader(false);
  }, [change, dispatch]);

  useEffect(() => {
    if (paymentMethods) {
      console.log(paydata, 'paydata');
      // console.log(paymentMethods, 'paymentMethods');
      setData(paymentMethods);
    }
  }, [data, change, paymentMethods]);

  const showPaymentMethods = () => {
    console.log('showPaymentMethods running');

    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // axios
    //   .get(`${server}/api/paymentMethods/${user?.customer_id}`, {
    //     options,
    //   })
    //   .then((res) => {
    //     // setLoader(false);
    //     console.log(res.data.paymentMethods.data, 'res =======');
    //     // console.log(JSON.parse(res.data.cases[1].caseType), 'JSON.parse(');
    //     // setLoader(false);
    //     if (res.status == 200) {
    //       setPaymentMethods(res.data.paymentMethods.data);
    //       // setCases(res?.data?.cases);
    //       // setTypes(JSON.parse(res.data.cases.caseTypes));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, 'error');
    //   });
  };
  const BillingMethodFormModal = () => {
    return (
      // <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 z-[999]">
      //   <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[40%] w-[90%] relative lg:translate-x-[11%]">
      //     <div className="mx-5">
      //       <button
      //         className="absolute right-[20px] top-[20px]  "
      //         onClick={() => setShowModal(false)}
      //       >
      //         <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
      //       </button>
      //       <div className="py-5 flex w-[90%] rounded-[7px] flex-col justify-start mx-auto mb-8">
      //         <h2 className="font-medium text-[18px]">Card Details </h2>
      //         <div className="mt-5 flex flex-wrap gap-[20px] w-full">
      //           <AuthInput
      //             placeholder={'Name on Card'}
      //             className={'!w-[100%] lg:!w-full lg:!mb-0'}
      //           />
      //           <ReactDatePicker
      //             selected={startDate}
      //             onChange={(date) => setStartDate(date)}
      //             placeholderText="Expiry"
      //             wrapperClassName="!w-[100%] lg:!w-[30%]"
      //             className="focus:outline-none border border-custom-grey rounded-[7px] p-3 ml-0 !w-[100%] lg:!w-[full] h-[50px] items-center justify-center bg-custom-dashboard-bg "
      //             dateFormat="MM/yyyy"
      //             minDate={new Date()}
      //             showMonthYearPicker
      //             required
      //           />
      //           <AuthInput
      //             placeholder={'Card Number'}
      //             className={'!w-[100%] lg:!w-[100%]'}
      //           />
      //           <AuthInput
      //             placeholder={'CVV'}
      //             type={'password'}
      //             className={'!w-[100%] lg:!w-[100%]'}
      //             maxLength={4}
      //           />
      //           {/* <input
      //             type={'password'}
      //             placeholder={'CVV'}
      //             maxLength={4}
      //             className={`focus:outline-none border border-custom-grey rounded-[7px] lg:p-3 p-3 !w-[100%] lg:!w-[30%]  bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5 ml-0`}
      //           /> */}

      //           {/* <ElementDemos /> */}
      //         </div>
      //         <BlueButtons buttonText={'Save'} className={'mr-auto'} />
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-[999]">
        <div className="product">
          <div>
            {/* <InjectedCheckoutForm /> */}
            <Elements stripe={stripePromise}>
              {/* <PaymentElement /> */}

              <BillingMethodForm />
              {/* <AddressForm /> */}
            </Elements>
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteClick = async (paymentid, index) => {
    data.splice(index, 1);
    await axios.delete(`${server}/api/paymentMethods/${paymentid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    toast.success('Payment Method Removed Successfully');
    setData((prevCases) =>
      prevCases.filter((methodItem) => methodItem.id !== paymentid)
    );
    setLoader(false);
  };
  return (
    <>
      {change && BillingMethodFormModal()}
      <div className="items-center justify-center mx-auto">
        <div className="flex lg:flex-row flex-col  justify-between lg:items-center my-8 mx-auto w-[90%]">
          <div className="flex flex-col">
            <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
              Billing Method
            </h1>

            <p className="mt-2 text-[16px] font-light mb-5">
              Update your billing details and address
            </p>
          </div>

          <div class="flex gap-x-[20px]">
            <BlueButtons
              buttonText={'Billing History'}
              className={'px-[50px] text-[14px]'}
              onClick={(e) => {
                // e.preventDefault();
                Router.push({
                  pathname: '/dentist/billing-history',
                });
              }}
            />
            <BlueButtons
              buttonText={'Add New Billing Method'}
              className={'lg:px-[50px] px-[30px] text-[14px]'}
              onClick={() => dispatch(handleModal(true))}
            />
          </div>
        </div>

        {/* <DashboardFooter /> */}
        <div className="paymentMethodsContainer w-[90%] mx-auto ">
          {/* sadadasdas sada dsdsa */}
          {!loader ? (
            data?.map((item, index) => {
              console.log(item.card, 'iteette');
              return (
                <StripeCard
                  // abc={''}
                  text={item.card.default_source ? 'Primary' : 'Set as Primary'}
                  key={index}
                  cardId={item.id}
                  cardType={item.card.brand}
                  endingNumber={item.card.last4}
                  onDeleteClick={() => handleDeleteClick(item.id, index)}
                  // cardIcon={item.cardIcon}
                  isPrimary={item.card.default_source}
                />
              );
            })
          ) : (
            <div
              aria-label="Loading..."
              role="status"
              className="flex items-center justify-center"
            >
              <svg class="h-5 w-5 animate-spin" viewBox="3 3 18 18">
                <path
                  class="fill-indigo-200"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                ></path>
                <path
                  className="fill-[#0769cc]"
                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                ></path>
              </svg>
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BillingPage;
