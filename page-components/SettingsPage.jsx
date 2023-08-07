import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import axios from 'axios';
import { server } from 'config';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdatedUser, fetchUser } from 'redux/actions/auth';
const SettingsPage = () => {
  const { user, updatedUser } = useSelector((state) => state.auth);
  console.log(updatedUser, 'updated');
  const dispatch = useDispatch();

  console.log(user, 'user.email');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);

  useEffect(() => {
    if (updatedUser) {
      console.log(updatedUser);
    }
  }, [updatedUser?.paymentVerified]);

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

  const handleSave = async (e) => {
    // e.preventDefault();

    await axios
      .patch(`${server}/api/subscription`, {
        id: user?._id,
        paymentVerified: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log(res, 'res after update');
        // setLoader(false);
        if (res.status == 200) {
          dispatch(fetchUpdatedUser(res.data.user));
          setStatusLoader(false);
          // toast.success('Subscription Removed');
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.data?.message);
      });
  };
  const removeSubscription = async (e) => {
    e.preventDefault();
    setStatusLoader(true);
    // console.log(user.subscrption_id, 'user.subscrption_id');
    // return;
    await axios
      .delete(`${server}/api/subscription`, {
        // method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        data: {
          subscriptionId: user.subscrption_id,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success('Subscription Removed Successfully');
          handleSave();
        } else {
          toast.success('Something went wrong');
        }
      })
      .catch((err) => {});

    // setLoader(false);
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

      <div className="flex w-[90%] rounded-[7px] flex-col justify-start mx-auto mb-8">
        <h2 className="font-medium text-[18px]">Subscription Status</h2>
        <div className="mt-5 lg:w-[30%] w-[90%]">
          <form onSubmit={(e) => removeSubscription(e)}>
            {/* < */}
            {user?.paymentVerified ? (
              <div className="flex items-center">
                <div className="p-2 bg-green-400 rounded-[7px] mx-5">
                  <p>Active</p>
                </div>

                <BlueButtons
                  buttonText={'Cancel Subscription'}
                  loading={loader}
                />
              </div>
            ) : (
              <div className="p-2 bg-red-400 rounded-[7px] mx-5">
                <p>Not Active</p>

                <BlueButtons buttonText={'Buy Subscription'} loading={loader} />
              </div>
            )}
          </form>
        </div>
      </div>
      {/* <DashboardFooter /> */}
    </div>
  );
};

export default SettingsPage;
