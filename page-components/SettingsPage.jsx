import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import StripeCard from '@/components/StripeCard/StripeCard';
import axios from 'axios';
import { server } from 'config';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdatedUser, fetchUser } from 'redux/actions/auth';
const SettingsPage = () => {
  const { user, updatedUser } = useSelector((state) => state.auth);
  const { paymentMethods } = useSelector((state) => state.payment);
  console.log(updatedUser, 'updated');
  const dispatch = useDispatch();

  console.log(user, 'user.email');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [payLoader, setPayLoader] = useState(false);
  // const [cancelLoader, setCancelLoader] = useState(false);

  const [statusLoader, setStatusLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentVerifiedStatus, setPaymentVerified] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    console.log(paymentMethods, 'paymentMethods');
  });

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

  const handleSave = (e) => {
    // e.preventDefault();

    axios
      .patch(`${server}/api/subscription`, {
        id: user?._id,
        paymentVerified: paymentVerifiedStatus,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        // console.log(res, 'res after update');
        // setLoader(false);
        if (res.status == 200) {
          console.log(res.data.user, 'res.data.user');
          dispatch(fetchUser(res.data.user));
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
          subscriptionId: user?.subscrption_id,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          handleSave();
          // fetchUser(res.data.user)
          setStatusLoader(false);
          toast.success('Subscription Removed Successfully');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong');

        setStatusLoader(false);
      });

    // setLoader(false);
  };
  const handleCheckboxChange = (item) => {
    setSelectedItem(item);
  };
  const showPaymentModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-[999]">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[40%] w-[90%] relative lg:translate-x-[11%]">
          <div className="mx-5">
            <button
              className="absolute right-[20px] top-[20px]  "
              onClick={() => setShowModal(false)}
            >
              <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
            </button>
            <div className="py-5 flex w-[90%] rounded-[7px] flex-col justify-start mx-auto mb-8">
              <h2 className="font-medium text-[18px]">Billing Methods </h2>
              {/* <form onSubmit={(e) => buySubscription(e)}> */}
              <div>
                {paymentMethods.map((item, index) => (
                  <div className="flex items-center">
                    <div className="p-5">
                      <input
                        type="checkbox"
                        checked={selectedItem === item}
                        onChange={() => handleCheckboxChange(item)}
                        // onClick={console.log(selectedItem, 'all item')}
                      />
                      {/* <label>{item}</label> */}
                    </div>
                    <StripeCard
                      key={index}
                      cardId={item.id}
                      cardType={item.card.brand}
                      endingNumber={item.card.last4}
                      hideRemove={true}
                      // onDeleteClick={() => handleDeleteClick(item.id, index)}
                      // cardIcon={item.cardIcon}
                      // isPrimary={item.card.default_source}
                      // disabled={item.card.default_source ? 'Primary' : null}
                    />

                    {/* <div key={index}> */}
                    {/* <input
                      type="checkbox"
                      // checked={selectedItem === item}
                      // onChange={() => handleCheckboxChange(item)}
                    />
                    <label>{item}</label> */}
                    {/* </div> */}
                  </div>
                  // <div>asdassa</div>
                ))}
              </div>
              {/* </form> */}

              {/* <div className="mt-5 flex flex-wrap gap-[20px] w-full">
                <AuthInput
                  placeholder={'Name on Card'}
                  className={'!w-[100%] lg:!w-full lg:!mb-0'}
                />
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Expiry"
                  wrapperClassName="!w-[100%] lg:!w-[30%]"
                  className="focus:outline-none border border-custom-grey rounded-[7px] p-3 ml-0 !w-[100%] lg:!w-[full] h-[50px] items-center justify-center bg-custom-dashboard-bg "
                  dateFormat="MM/yyyy"
                  minDate={new Date()}
                  showMonthYearPicker
                  required
                />
                <AuthInput
                  placeholder={'Card Number'}
                  className={'!w-[100%] lg:!w-[100%]'}
                />
                <AuthInput
                  placeholder={'CVV'}
                  type={'password'}
                  className={'!w-[100%] lg:!w-[100%]'}
                  maxLength={4}
                />
        
              </div> */}
              <BlueButtons
                buttonText={'Pay'}
                loading={payLoader}
                disabled={payLoader}
                className={'mr-auto'}
                onClick={(e) => {
                  buySubscription(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  // const checkCards=()=>{

  // }
  const handleChange = () => {
    if (paymentMethods.length > 0) {
      setPaymentVerified(true);
      setShowModal(true);
    } else {
      toast.error('Add Billing Method to Continue');
      Router.push('/dentist/billing');
    }
  };

  const buySubscription = (e) => {
    e.preventDefault();
    if (selectedItem) {
      setPayLoader(true);
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios
        .post(`${server}/api/subscription`, {
          dentistId: user._id,
          name: user.firstName,
          email: user.email,
          subscrption_type: 'renew',
          customer_id: user.customer_id,
          payment_id: selectedItem.id,
          // token: result.token.id,
          options,
        })
        .then((res) => {
          console.log(res, 'subscription post response');
          // return;
          if (res.status == 200) {
            // dispatch(fetchUser(res?.data?.user));
            handleSave();

            setPayLoader(false);
            toast.success('Subscription Buy Successful');
            setShowModal(false);
            //   emptFields();
            // Router.replace('/dentist/view-profile');
          } else if (res.status == 400) {
          }
        })
        .catch((error) => {
          setPayLoader(false);
          console.log(error, 'erroorrr');
        });
    } else {
      toast.error('Please Select Billing Method to Continue');
    }
  };
  return (
    <div className="items-center justify-center ">
      {showModal && showPaymentModal()}
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
          {/* < */}
          {user?.paymentVerified ? (
            <form onSubmit={(e) => removeSubscription(e)}>
              <div className="flex items-center">
                <div className="p-2 bg-green-400 rounded-[7px] mr-5">
                  <p>Active</p>
                </div>

                <BlueButtons
                  buttonText={'Cancel Subscription'}
                  loading={statusLoader}
                  onClick={() => setPaymentVerified(false)}
                />
              </div>
            </form>
          ) : (
            <div className="flex items-center">
              <div className="p-2 bg-red-400 rounded-[7px] mr-5">
                <p>Not Active</p>
              </div>
              <BlueButtons
                buttonText={'Buy Subscription'}
                // loading={loader}
                onClick={() => {
                  handleChange();
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* <DashboardFooter /> */}
    </div>
  );
};

export default SettingsPage;
