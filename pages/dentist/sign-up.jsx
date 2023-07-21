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

import { fetchUser } from 'redux/actions/auth';

import { useDispatch } from 'react-redux';
import { server } from 'config';
import axios from 'axios';
import { getAddressSuggestions, getAddressData } from '../../lib/googleMaps';

const Signup = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';

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
  const router = useRouter();
  // const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';

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
    setData(response);
    console.log(data, 'daasdsadsd');
    if (data) {
      setPostCode(data.postalCode);
      setCity(data.city);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(showAddress, data?.city, data?.postalCode, 'here');
    // return;
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
          streetName: streetName ? streetName : showAddress,
          city: city ? city : data?.city,
          postCode: postCode ? postCode : data?.postalCode,
        })
        .then((response) => {
          if (response.status == 201) {
            dispatch(fetchUser(response?.data?.user));

            toast.success('Your account has been created');
            router.replace('/dentist/view-profile');
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

  return (
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
                  placeholder={'First Name'}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <AuthInput
                  placeholder={'Last Name'}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <AuthInput
                  placeholder={'Email Address'}
                  type={'email'}
                  className={'w-[92.5%] lg:w-[45%]'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <AuthInput
                  placeholder={'Display Name'}
                  className={'w-[92.5%] lg:w-[45%]'}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
                <AuthInput
                  placeholder={'Password'}
                  ref={passwordRef}
                  type={'password'}
                  // className={"!w-[45%]"}
                  containerClassName={'!w-[45%]'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                  placeholder={'Speciality Title'}
                  // type={"password"}
                  // className={"!w-[45%]"}
                  containerClassName={'!w-[45%]'}
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  required
                />
                <AuthInput
                  placeholder={'Degree'}
                  // type={"password"}
                  // className={"!w-[45%]"}
                  containerClassName={'!w-[45%]'}
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />

                <AuthInput
                  placeholder={'GDC Number'}
                  value={gdcNo}
                  onChange={(e) => setGdcNo(e.target.value)}
                  required
                />
                <AuthInput
                  placeholder={'Practice Building number/ Name'}
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  required
                  className={'lg:!w-[45%] !w-[92.5%]'}
                />
                <div className="lg:w-[45%] z-[999] w-[92.5%] relative">
                  <AuthInput
                    placeholder={'Practice Street Name'}
                    value={showAddress}
                    onChange={handleInputChange}
                    // onChange={(e) => setStreetName(e.target.value)}
                    required
                    className={'!w-full'}
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
                  </div>
                </div>
                {/* {data && (
                  <>
                    {console.log(data.postalCode, 'ata.postalCode')}
                    <div>
                      <h2>Address Data:</h2>
                      <p>Address: {data.address}</p>
                      <p>City: {data.city}</p>
                      <p>Postal Code: {data.postalCode}</p>
                    </div>
                  </>
                )} */}
                {/* {data?.addressComponents?.map((component) => (
                  <>
                    {console.log(component, 'component')}
                    {component.types[0].include('types') ? (
                      <div key={component.long_name}>
                        <strong>{component.long_name}</strong>:{' '}
                        {component.long_name}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))} */}
                {/* <Autocomplete
                  apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                  onPlaceSelected={(place) => console.log(place)}
                  options={{
                    types: ['address'],
                    componentRestrictions: { country: 'ru' },
                  }}
                  defaultValue="Pakistan"
                /> */}
                <AuthInput
                  placeholder={'Practice City'}
                  value={city ? city : data?.city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <AuthInput
                  placeholder={'Practice Post Code'}
                  value={postCode ? postCode : data?.postalCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col mx-[20px] my-[40px]">
                <Checkbox
                  label=" I agree to the website terms & conditions
                  "
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
                  buttonText="Submit"
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
  );
};

export default Signup;
