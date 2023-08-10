import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../public/images/loginLogo.svg';
import logoWhite from '../../public/images/logoWhite.png';

import { FaEye } from 'react-icons/fa';
import BlueButtons from '@/components/Buttons/BlueButtons';
import Router from 'next/router';
import AuthInput from '@/components/Inputs/AuthInput';
const Forgotpassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="lg:w-full flex flex-col lg:flex-row h-screen bg-[#F9FBFC]">
      <div className="lg:w-full lg:py-[0px] py-[30px] bg-gradient-radial from-[#0372E2] to-[#0B5FB4] justify-center flex items-center text-center">
        <Image src={logo} alt="logo" className="mx-auto hidden lg:block" />

        <Image src={logoWhite} alt="logo" className="mx-auto lg:hidden" />
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
              Forgot Password
            </h2>

            <form>
              <div className="w-full flex flex-col items-center">
                <AuthInput
                  placeholder={'Enter Email'}
                  className={'w-full'}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="mt-5">
                  <BlueButtons
                    buttonText="Submit"
                    className="px-[50px]"
                    type="submit"
                    // onSubmit={() =>
                    //   Router.push("/dentist/edit-profile?tab=edit-profile")
                    // }
                    // onClick={() =>
                    //   Router.replace("/dentist/view-profile?tab=view")
                    // }
                  />
                </div>
              </div>
            </form>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
