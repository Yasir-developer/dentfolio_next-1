import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../public/images/loginLogo.svg';
import logoWhite from '../../public/images/logoWhite.png';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import BlueButtons from '@/components/Buttons/BlueButtons';
import Router from 'next/router';
import AuthInput from '@/components/Inputs/AuthInput';
import { server } from 'config';
import { fetchUser } from 'redux/actions/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
// import { server } from '../../../config';
// import { toast } from 'react-toastify';
// import { fetchUser } from '@/redux/actions/auth';
// import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    // console.log(email, password);
    // Send a POST request to the login API endpoint
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

          // toast.success('Login Successfully', {
          //   position: 'top-center',
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          Router.replace('/dentist/view-profile');
        }
      })
      .catch((error) => {
        console.log(error, 'sign in error');
        if (error.response.status == 401) {
          toast.error('Email or Password is incorrect');
          setLoader(false);
        }
        // toast.error(error?.data?.message, {
        //   position: 'top-center',
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };
  return (
    <div className="lg:w-full flex flex-col lg:flex-row h-screen bg-[#F9FBFC]">
      <div className="lg:w-full lg:py-[0px] py-[30px] bg-gradient-radial from-[#0372E2] to-[#0B5FB4] justify-center flex items-center text-center">
        <Image src={logo} alt="logo" className="mx-auto hidden lg:block" />

        <Image src={logoWhite} className="mx-auto lg:hidden" />
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AuthInput
                  type={'password'}
                  className={''}
                  value={password}
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
              href="#"
              className="text-blue-600 underline"
              onClick={() => Router.push('/dentist/sign-up')}
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
