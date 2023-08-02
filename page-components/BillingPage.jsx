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
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from 'config';
// import { Visa } from "@/utils/cardSvgs";
const stripePromise = loadStripe(
  'pk_test_51NU3nUFH7jk2A82vTjlYco1pIAuL6ErOcBHh5p5n79GPhVSoBaENlQMi8bKFjluK0c37DcNtkCpGIbW9vCW06gnv00Q5Xtq7BH'
);

const BillingPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const { user } = useSelector((state) => state.auth);
  console.log(user, '======');
  useEffect(() => {
    showPaymentMethods();
  }, []);
  const handleClick = (num) => {
    console.log('argument from Child: ', num);
    // 👇️ take the parameter passed from the Child component
    setShowModal(num);
  };
  const CardsData = [
    {
      cardType: 'Visa',
      endingNumber: '1234',
      cardIcon: '/images/visa.svg',
      isPrimary: true,
    },
    {
      cardType: 'MasterCard',
      endingNumber: '9876',
      cardIcon: '/images/mastercard.svg',
      isPrimary: false,
    },
  ];

  const showPaymentMethods = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/paymentMethods/${user?.customer_id}`, {
        options,
      })
      .then((res) => {
        // setLoader(false);
        console.log(res.data.paymentMethods.data, 'res =======');
        // console.log(JSON.parse(res.data.cases[1].caseType), 'JSON.parse(');
        // setLoader(false);
        if (res.status == 200) {
          setPaymentMethods(res.data.paymentMethods.data);
          // setCases(res?.data?.cases);
          // setTypes(JSON.parse(res.data.cases.caseTypes));
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
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

              <BillingMethodForm handleClick={handleClick} />
              {/* <AddressForm /> */}
            </Elements>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {showModal && BillingMethodFormModal()}
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
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>

        {/* <div className="py-5 flex w-[90%] rounded-[7px] flex-col justify-start mx-auto mb-8">
          <h2 className="font-medium text-[18px]">Card Details </h2>
          <div className="mt-5 flex flex-col">
            <div className="flex flex-col lg:flex-row">
              <AuthInput
                placeholder={"Name on Card"}
                className={"!w-[100%] lg:!w-[25%] "}
              />
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Expiry"
                wrapperClassName="!w-[100%] lg:!w-[15%]"
                className="focus:outline-none border border-custom-grey rounded-[7px] p-3 ml-0 !w-[100%] lg:!w-[full] lg:ml-3 h-[50px] items-center justify-center bg-custom-dashboard-bg "
                dateFormat="MM/yyyy"
                minDate={new Date()}
                showMonthYearPicker
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-0 mt-5">
              <AuthInput
                placeholder={"Card Number"}
                className={"!w-[100%] lg:!w-[25%] "}
              />

              <input
                type={"password"}
                placeholder={"CVV"}

                maxLength={4}
                className={`focus:outline-none border border-custom-grey rounded-[7px] lg:p-3 p-3 !w-[100%] lg:!w-[15%]  bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5 lg:ml-3 ml-0`}
              />
            </div>
          </div>
          <BlueButtons buttonText={"Save"} className={"mr-auto"} />
        </div> */}

        {/* <DashboardFooter /> */}
        <div className="paymentMethodsContainer w-[90%] mx-auto ">
          {/* sadadasdas sada dsdsa */}
          {/* <PaymentCard
            // cardIcon={Visa()}
            cardType={"Visa"}
            endingNumber={"1234"}
            isPrimary={true}
          /> */}
          {paymentMethods?.map((item, index) => {
            return (
              <StripeCard
                key={index}
                cardType={item.card.brand}
                endingNumber={item.card.last4}
                // cardIcon={item.cardIcon}
                // isPrimary={item.isPrimary}
              />
            );
          })}

          {/* <StripeCard
            cardType={"Visa"}
            endingNumber={"1234"}
            cardIcon={Visa()}
            isPrimary={true}
          /> */}
        </div>
      </div>
    </>
  );
};

export default BillingPage;
