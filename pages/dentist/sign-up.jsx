import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../public/images/loginLogo.svg';
import logoWhite from '../../public/images/logoWhite.png';
import logotwo from '../../public/images/logo.png';
import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import Router, { useRouter } from 'next/router';
import Checkbox from '@/components/Checkbox/Checkbox';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import GoogleAutocomplete from 'react-google-autocomplete';

import { fetchUser } from 'redux/actions/auth';

import { useDispatch } from 'react-redux';
import { server } from 'config';
import axios from 'axios';
import { getAddressSuggestions, getAddressData } from '../../lib/googleMaps';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from '@/page-components/Checkout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const Signup = () => {
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
  const [data, setData] = useState(null);
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
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');

  const [showAddress, setShowAddress] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const router = useRouter();

  const handleInputChange = async (e) => {
    const input = e.target.value;

    setData({});
    // data.city = '';
    setAddress(input);
    setShowAddress(input);
    if (input) {
      const suggestions = await getAddressSuggestions(input);
      console.log(suggestions, 'suggestion');
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddressSelect = async (selectedAddress, addressShow) => {
    console.log(selectedAddress, 'addressShow');

    // setShowAddress
    setShowAddress(addressShow);
    setAddress(selectedAddress);
    setSuggestions([]);

    const response = await getAddressData(selectedAddress, addressShow);
    // .then(
    //   (response) => {
    //     console.log(response, 'response');
    //     setLatitude(response.location.location.lat);
    //     setLongitude(response.location.location.long);
    //   }
    // );
    setData(response);
    console.log(data, 'daasdsadsd');
    if (data) {
      setPostCode(data.postalCode);
      setCity(data.city);
    }
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
          speciality,
          degree,
          displayName,
          gdcNo,
          buildingName,
          streetName: showAddress,
          city: city,
          postCode: postCode,
          latitude: latitude,
          longitude: longitude,
        })
        .then((response) => {
          if (response.status == 201) {
            dispatch(fetchUser(response?.data?.user));

            toast.success(
              'Your account has been created. To continue please complete payment process'
            );
            setPaymentModalShow(true); // router.replace('/dentist/view-profile');
          }
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            toast.error(error?.response?.data?.error.message);
          }
          setLoader(false);
          // console.log(e, 'erororor');
        });
    } else {
      toast.error(
        'Please Check all the Marks and Accept Terms & condition to continue'
      );
    }
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handlePrivacyChange = () => {
    setPrivacyAccepted(!privacyAccepted);
  };
  const options = { mode: 'shipping' };

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
  return (
    <>
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
              />

              <h2 className="my-8 text-center font-semibold text-[32px] md:text-4xl text-custom-black">
                Sign Up
              </h2>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="w-full flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-2 items-center justify-center">
                  <AuthInput
                    ref={emailRef}
                    containerClassName={'w-[45%]'}
                    placeholder={'First Name'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <AuthInput
                    placeholder={'Last Name'}
                    containerClassName={'w-[45%]'}
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
                    containerClassName={'w-[45%]'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <AuthInput
                    placeholder={'Speciality Title'}
                    // type={"password"}
                    // className={"!w-[45%]"}
                    containerClassName={'w-[45%]'}
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    required
                  />
                  <AuthInput
                    placeholder={'Degree'}
                    // type={"password"}
                    // className={"!w-[45%]"}
                    containerClassName={'w-[45%]'}
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />

                  <AuthInput
                    placeholder={'GDC Number'}
                    value={gdcNo}
                    onChange={(e) => setGdcNo(e.target.value)}
                    containerClassName={'w-[45%]'}
                    required
                  />
                  <AuthInput
                    placeholder={'Practice Building number/ Name'}
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    required
                    containerClassName={'w-[45%]'}
                  />
                  <div className="z-[999] w-[45%] relative">
                    {/* <AuthInput
                      placeholder={'Practice Street Name'}
                      value={showAddress}
                      onChange={handleInputChange}
                      // onChange={(e) => setStreetName(e.target.value)}
                      required
                      className={'!w-full'}
                      containerClassName={'w-full'}
                    />

                    <div class="absolute right-100 bg-white shadow-xl w-full top-[50px] mt-0 pt-0 rounded-[7px] pb-0">
                      {suggestions.length > 0 && (
                        <ul className="mt-0 rounded-[7px] p-[10px] space-y-2 bg-white border border-gray-300 w-full rounded-b-md shadow-md">
                          {suggestions.map((suggestion, index) => (
                            <>
                              {console.log(suggestion, 'dsassdsadsdsa')}
                              <li
                                className="hover:bg-gray-100 p-1"
                                key={index}
                                onClick={() => {
                                  handleAddressSelect(
                                    suggestion[1],
                                    suggestion[0]
                                  );
                                }}
                              >
                                {suggestion[0]}
                              </li>
                            </>
                          ))}
                        </ul>
                      )}
                    </div> */}

                    <GoogleAutocomplete
                      apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                      // className="flex-grow py-2 px-4 focus:outline-none w-4/5"
                      className="focus:outline-none border w-full border-custom-grey rounded-[7px] p-3 bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5"
                      // style={{ width: '100%', height: 50 }}
                      onPlaceSelected={(place) => {
                        console.log(place, 'place selectedval');
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
                      placeholder="Location"
                      options={{
                        types: ['geocode', 'establishment'],
                      }}
                      // defaultValue={address}
                    />
                  </div>

                  <AuthInput
                    placeholder={'Practice City'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    containerClassName={'w-[45%]'}
                    required
                  />
                  <AuthInput
                    placeholder={'Practice Post Code'}
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    containerClassName={'w-[45%]'}
                    required
                  />
                </div>

                <div className="flex flex-col mx-[20px] my-[40px]">
                  <Checkbox
                    label=" I agree to the website terms & conditions"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                  />
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
                        onClick={() => Router.push('/dentist/login')}
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
