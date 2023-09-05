import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../public/images/loginLogo.svg';
import logoWhite from '../public/images/logoWhite.png';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import BlueButtons from '@/components/Buttons/BlueButtons';
import Router from 'next/router';
import AuthInput from '@/components/Inputs/AuthInput';
import { server } from 'config';
import { fetchUser } from 'redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from '@/page-components/Checkout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const Login = () => {
  const dispatch = useDispatch();
  const { user, modal } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [emailModalshow, setEmailModalShow] = useState(false);

  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  useEffect(() => {
    if (user) {
      console.log(user, 'user use effect');
    }
  }, [user]);
  useEffect(() => {
    if (modal == true) {
      setPaymentModalShow(true);
    }
  }, [modal]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    let data = {
      email,
      password,
    };
    // console.log(data, "data");

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${server}/api/auth`, {
        email,
        password,
        options,
      })
      .then((res) => {
        setLoader(false);
        if (res.status == 200) {
          dispatch(fetchUser(res?.data?.user));
          setLoader(false);
          // console.log(user, '------------------');

          if (res?.data?.user?.role == 1) {
            Router.replace('/admin/overview');
          } else if (res?.data?.user?.emailVerified) {
            Router.replace('/dentist/view-profile');
          } else {
            veriifyEmail(res?.data?.user);
            setEmailModalShow(true);
          }
        }
      })
      .catch((error) => {
        console.log(error, 'sign in error');
        // if (error.response.status == 401) {
        toast.error('Email or Password is incorrect');
        setLoader(false);
      });
  };

  const EmailModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[999]">
        <div className="bg-white p-8 rounded shadow-lg">
          <p className="text-[20px] text-custom-blue py-3">
            Your Email is not Verified
          </p>

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
  const veriifyEmail = async (user) => {
    // console.log(user, "user in verify email");
    try {
      const response = await fetch(
        `/api/user/email/loginVerify?id=${user._id}&email=${user.email}&firstName=${user.firstName}`,
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
  return (
    <div className="lg:w-full flex flex-col lg:flex-row h-screen bg-[#F9FBFC]">
      {emailModalshow && EmailModal()}
      {paymentModalShow && (
        <div className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[9999]">
          {paymentForm()}
        </div>
      )}
      <div className="lg:w-full lg:py-[0px] py-[30px] bg-gradient-radial from-[#0372E2] to-[#0B5FB4] justify-center flex items-center text-center">
        <Image src={logo} alt="logo" className="mx-auto hidden lg:block" />

        <Image src={logoWhite} alt="logo" className="mx-auto lg:hidden" />
        {/* <Image src={logo} alt="logo" className="hidden" /> */}
      </div>
      <div className="lg:w-full md:w-3/5 flex flex-col justify-between h-[90%] my-[20px] lg:my-auto mx-[5%] md:mx-[100px] rounded-[7px]">
        <div className="flex flex-col items-center justify-center w-full">
          <div className=" w-[100%] lg:w-4/5 md:px-[20px] m-auto bg-transparent">
            <img
              className="mx-auto hidden lg:block lg:mt-[20px]"
              src="/images/logo.png"
              alt=""
            />

            <h2 className="my-8 text-center font-semibold text-[32px] md:text-4xl text-custom-black">
              Sign In
            </h2>

            <form
              onSubmit={(e) => {
                // e.preventDefault();
                handleSubmit(e);
                // Router.replace("/dentist/view-profile");
              }}
            >
              <div className="w-full flex flex-col items-center">
                <AuthInput
                  placeholder={'Email Address'}
                  className={'w-full'}
                  containerClassName={'!w-full'}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AuthInput
                  type={'password'}
                  className={''}
                  value={password}
                  containerClassName={'!w-full'}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex justify-end w-full">
                  <p className="text-right text-sm font-medium cursor-pointer">
                    Forgot Password
                  </p>
                </div>
                <div className="mt-5">
                  <BlueButtons
                    loading={loader}
                    buttonText="Login"
                    className="px-[50px]"
                    type="submit"
                  />
                </div>
              </div>
            </form>
            {/* </form> */}
          </div>
        </div>

        <div className="py-4 px-6 text-center">
          <p className="text-sm text-[#858585]">
            Don't have an account?{' '}
            <a
              // href="#"
              className="text-blue-600 underline cursor-pointer"
              onClick={() => Router.push('/sign-up')}
            >
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
