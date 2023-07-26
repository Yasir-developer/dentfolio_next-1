import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import axios from 'axios';
import { server } from 'config';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user.email, 'user.email');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      toast.error('Password and Confirm Password should be same');
    } else {
      setLoader(true);

      const data = {
        email: user.email,
        password,
      };

      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios
        .post(`${server}/api/changePassword/${user._id}`, data, options)
        .then((res) => {
          console.log(res, 'password response..');
          // return;
          if (res.status == 200) {
            setLoader(false);
            toast.success('Password updated Successfully');
            // emptFields();
            // Router.replace('/dentist/view-profile');
          } else if (res.status == 400) {
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
        });
    }
  };
  return (
    <div className="items-center justify-center ">
      <div className=" my-8 mx-auto w-[90%]">
        <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
          Settings
        </h1>

        <p className="mt-2 text-[16px] font-light mb-5">Update Information</p>
      </div>

      <div className="py-5 flex w-[90%] rounded-[7px] flex-col justify-start mx-auto mb-8">
        <h2 className="font-medium text-[18px]">Reset Password </h2>
        {/* <p className="font-medium text-[16px] my-3">New Password </p> */}
        <div className="mt-5 lg:w-[30%] w-[90%]">
          <form onSubmit={(e) => changePassword(e)}>
            {/* <div className="relative flex items-center bg-custom-dashboard-bg border border-custom-grey rounded-[7px] p-3 lg:w-[30%] w-[90%] placeholder-slate-400 text-[16px] font-light mb-5"> */}
            <AuthInput
              type={'password'}
              className={''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'New Password'}
            />

            {/* <div className="relative flex items-center bg-custom-dashboard-bg border border-custom-grey rounded-[7px] p-3 lg:w-[30%]  w-[90%] placeholder-slate-400 text-[16px] font-light mb-5"> */}
            <AuthInput
              type={'password'}
              className={''}
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={'Confirm New Password'}
            />

            <BlueButtons buttonText={'Save'} loading={loader} />
          </form>
        </div>
      </div>
      {/* <DashboardFooter /> */}
    </div>
  );
};

export default SettingsPage;
