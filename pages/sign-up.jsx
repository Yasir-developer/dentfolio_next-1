import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../public/images/loginLogo.svg';
import logoWhite from '../public/images/logoWhite.png';
import logotwo from '../public/images/logo.png';
import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import Router, { useRouter } from 'next/router';
import Checkbox from '@/components/Checkbox/Checkbox';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import GoogleAutocomplete from 'react-google-autocomplete';

import { fetchUser } from 'redux/actions/auth';

import { useDispatch, useSelector } from 'react-redux';
import { server } from 'config';
import axios from 'axios';
import { getAddressSuggestions, getAddressData } from '../lib/googleMaps';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from '@/page-components/Checkout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import EmailModal from '@/components/EmailModal/EmailModal';

const Signup = () => {
  const { user, modal } = useSelector((state) => state.auth);
  console.log(modal, 'modal;;lll');
  useEffect(() => {
    if (user) {
      console.log(user, 'useruser');
    }
  }, [user]);

  useEffect(() => {
    if (modal == true) {
      setPaymentModalShow(true);
    }
  }, [modal]);

  const stripePromise = loadStripe(
    'pk_test_51NU3nUFH7jk2A82vTjlYco1pIAuL6ErOcBHh5p5n79GPhVSoBaENlQMi8bKFjluK0c37DcNtkCpGIbW9vCW06gnv00Q5Xtq7BH'
  );

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();

  // console.log(server, "server");
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [gdcNo, setGdcNo] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  // const [speciality, setSpeciality] = useState('');
  // const [degree, setDegree] = useState('');
  const [emailModalshow, setEmailModalShow] = useState(false);
  const [showAddress, setShowAddress] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const courtesyData = [
    {
      id: 1,
      type: 'Dr',
      value: 'Dr',
    },
    {
      id: 2,
      type: 'Mr',
      value: 'Mr',
    },
    {
      id: 3,
      type: 'Mrs',
      value: 'Mrs',
    },

    {
      id: 4,
      type: 'Miss',
      value: 'Miss',
    },
    {
      id: 5,
      type: 'Ms',
      value: 'Ms',
    },
  ];
  const router = useRouter();
  const handleSelectChange = (event) => {
    // console.log(event.target.value, "event");
    setSelectedOption(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (termsAccepted && privacyAccepted) {
      setLoader(true);

      axios
        .post(`${server}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          email: email,
          password: password,
          firstName,
          lastName,
          courtesyTitle: selectedOption,

          // speciality,
          // degree,
          displayName,
          gdcNo,
          buildingName,
          streetName: showAddress,
          city: city,
          postCode: postCode,
          latitude: latitude,
          longitude: longitude,
          role: 0,
        })
        .then((response) => {
          if (response.status == 201) {
            setUserData(response?.data?.user);
            dispatch(fetchUser(response?.data?.user));
            console.log(user, 'user after signup');
            if (response?.data?.user?.role == 0) {
              toast.success(
                'Your account has been created. Please verify Email to continue complete payment process'
              );
              veriifyEmail(response?.data?.user);
              setEmailModalShow(true);
              setLoader(false);
              // emailRef.current.openEmailModal();
              // setPaymentModalShow(true); // router.replace('/dentist/view-profile');
            } else {
              Router.replace('/admin/overview');
            }
          }
        })
        .catch((error) => {
          console.log(error, 'error');
          if (error?.response?.data) {
            toast.error(error?.response?.data?.error?.message);
          }
          setLoader(false);
          // console.log(e, 'erororor');
        });
    } else {
      toast.error(
        'Please Check all the Marks and Accept Terms & Conditions to continue'
      );
    }
  };

  const veriifyEmail = async (user) => {
    // console.log(user, "user in verify email");
    try {
      const response = await fetch(
        `/api/user/email/verify?id=${user._id}&email=${user.email}&firstName=${user.firstName}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      // console.log(response, "response for email verify");
      // emailRef.current.openEmailModal();
    } catch (e) {
      toast.error(e.message);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
    // if(termsAccepted){

    // }
  };

  const handlePrivacyChange = () => {
    setPrivacyAccepted(!privacyAccepted);
  };
  const options = { mode: 'billing' };

  const paymentForm = (e) => {
    return (
      <div className="product">
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
  const handleClose = () => {
    setEmailModalShow(false);
  };
  const EmailModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[999]">
        <div className="bg-white p-8 rounded shadow-lg">
          <p>Email Confirmation Sent</p>

          <p>An Email Confirmation Has Been Sent To The Address Provided.</p>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 mr-2 bg-custom-blue text-white rounded hover:bg-sky-500"
              onClick={() => handleClose()}
              // onClick={confirmDelete} // Call confirmDelete when confirmed
            >
              OK
            </button>
            {/* <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            // onClick={cancelDelete} // Call cancelDelete when canceled
          >
            Cancel
          </button> */}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {emailModalshow && EmailModal()}
      {paymentModalShow && (
        <div className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[9999]">
          {paymentForm()}
        </div>
      )}
      <div className="lg:w-full h-full flex flex-col lg:flex-row bg-[#F9FBFC] max-h-[100vh] 4xl:min-h-[100vh] ">
        <div className="lg:w-[40%] lg:py-[0px] py-[30px]  bg-gradient-radial from-[#0372E2] to-[#0B5FB4] justify-center flex items-center text-center">
          <Image src={logo} alt="logo" className="mx-auto hidden lg:block" />

          <Image src={logoWhite} className="mx-auto lg:hidden" />
        </div>
        <div className="lg:w-[60%] flex flex-col justify-between rounded-[7px] overflow-y-scroll">
          <div className="flex flex-col items-center justify-center m-5 4xl:h-full">
            <div className="w-[100%] m-auto bg-transparent flex flex-col justify-around">
              <Image
                className="mx-auto hidden lg:block lg:mt-[20px]"
                src={logotwo}
                alt="logo"
              />

              <h2 className="my-8 text-center font-semibold text-[32px] md:text-4xl text-custom-black">
                Sign Up
              </h2>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="w-full flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-5 justify-center">
                  <div className="w-[92.5%] lg:w-[45%] text-[16px] font-light">
                    <select
                      className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] p-3  rounded-[7px] text-[14px] bg-custom-dashboard-bg border border-custom-grey"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      {courtesyData?.map((item, index) => {
                        return (
                          <>
                            <option
                              value={item.value}
                              key={index}
                              // onChange={(item) => setCourtesyTitle(item.type)}
                            >
                              {item.type}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <AuthInput
                    ref={emailRef}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    placeholder={'First Name'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <AuthInput
                    placeholder={'Last Name'}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />

                  <AuthInput
                    placeholder={'Email Address'}
                    type={'email'}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <AuthInput
                    placeholder={'Display Name'}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                  <AuthInput
                    placeholder={'Password'}
                    ref={passwordRef}
                    type={'password'}
                    // className={"!w-[45%]"}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <AuthInput
                    placeholder={'Speciality Title'}
                    // type={"password"}
                    // className={"!w-[45%]"}
                    containerClassName={'w-[45%]'}
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    required
                  /> */}
                  {/* <AuthInput
                    placeholder={'Degree'}
                    // type={"password"}
                    // className={"!w-[45%]"}
                    containerClassName={'w-[45%]'}
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  /> */}

                  <AuthInput
                    placeholder={'GDC Number'}
                    value={gdcNo}
                    onChange={(e) => setGdcNo(e.target.value)}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    required
                  />

                  <div className="z-[998] w-[92.5%] lg:w-[45%] relative">
                    <GoogleAutocomplete
                      apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                      // className="flex-grow py-2 px-4 focus:outline-none w-4/5"
                      className="focus:outline-none border w-full border-custom-grey rounded-[7px] p-3 bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5"
                      // style={{ width: '100%', height: 50 }}
                      onPlaceSelected={(place) => {
                        // console.log(place, 'place selectedval');
                        setLatitude(place?.geometry?.location?.lat());
                        setLongitude(place?.geometry?.location?.lng());
                        setShowAddress(place?.formatted_address);
                        const addressComponents =
                          place?.address_components || [];
                        const postal_code = addressComponents?.find(
                          (component) => component.types.includes('postal_code')
                        );
                        setPostCode(postal_code?.long_name);
                        // console.log(postal_code, 'postal_code');

                        // console.log(locality, 'locality');
                        const localityTwo = addressComponents?.find(
                          (component) => component.types.includes('locality')
                        );
                        setCity(localityTwo?.long_name);
                        const locality = addressComponents?.find((component) =>
                          component.types.includes('postal_town')
                        );
                        setCity(
                          locality?.long_name
                            ? locality?.long_name
                            : localityTwo?.long_name
                        );
                      }}
                      // onChange={() => setCity('')}
                      placeholder="Practice Building number/ Name"
                      options={{
                        types: ['geocode', 'establishment'],
                      }}
                      // defaultValue={address}
                    />
                  </div>
                  <AuthInput
                    placeholder={'Practice City'}
                    value={city}
                    // onChange={(e) => setBuildingName(e.target.value)}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                  />

                  {/* <AuthInput
                    placeholder={'Practice City'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    containerClassName={'w-[45%]'}
                    required
                  /> */}
                  <AuthInput
                    placeholder={'Practice Post Code'}
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    containerClassName={'w-[92.5%] lg:w-[45%]'}
                    required
                  />
                </div>

                <div className="flex flex-col mx-[20px] my-[40px]">
                  {/* <Link href={'#'} passHref> */}
                  <Checkbox
                    label=" I agree to the website terms & conditions"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                    // onClick={()=> Router.push()}
                  />
                  {/* </Link> */}
                  <Checkbox
                    label="I have valid consent from my patients to republish/use/share photographs uploaded to Dentfolio"
                    checked={privacyAccepted}
                    onChange={handlePrivacyChange}
                  />
                </div>

                <div className="mt-5 flex flex-col items-center justify-center">
                  <BlueButtons
                    loading={loader}
                    buttonText="Continue to Payment"
                    className="px-[50px] cursor-pointer"
                  />

                  <div className="py-4 px-6 text-center">
                    <p className="text-sm text-[#858585]">
                      Already have an account?{' '}
                      <a
                        href="#"
                        className="text-custom-blue underline"
                        onClick={() => Router.push('/login')}
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
