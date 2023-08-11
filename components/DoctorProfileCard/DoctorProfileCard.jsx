import Image from 'next/image';
import React, { useState } from 'react';
import location from '../../public/images/location.svg';
import Router from 'next/router';
import BlueButtons from '../Buttons/BlueButtons';
import { FaTimes } from 'react-icons/fa';
import profile from '../../public/images/profile1.jpeg';
import AuthInput from '../Inputs/AuthInput';
import checkCircle from '../../public/images/check-circle2.svg';
import { useDispatch } from 'react-redux';
import { dentistProfile } from 'redux/actions/dentist';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { server } from 'config';

const DoctorProfileCard = ({ data }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [contactLoader, setContactLoader] = useState(false);

  const contactMe = (e) => {
    e.preventDefault();
    // if (name && phone && email || description) {
    setContactLoader(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`${server}/api/patient`, {
        dentistId: modalData._id,
        patient_name: name,
        phone_no: phone,
        patient_email: email,
        description,

        options,
      })
      .then((res) => {
        // return;
        if (res.status == 200) {
          setContactLoader(false);
          toast.success('Your Response has been sent to the Dentist');
          setModalData({});
          setName('');
          setPhone('');
          setEmail('');
          setDescription('');
          setShowModal(false);
          setShowThankYouModal(true);
        } else if (res.status == 400) {
        }
      })
      .catch((error) => {
        toast.success(error?.response?.data?.message);
        setContactLoader(false);
        console.log(error, 'erroorrr');
      });
    // } else {
    //   toast.error('All fields are required to Continue');
    // }
  };

  const thankYouModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 ">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative max-w-[900px]">
          <button
            className="absolute right-[20px] top-[20px]  "
            onClick={() => setShowThankYouModal(false)}
          >
            <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
          </button>
          <div className="flex items-center justify-center mt-[50px] ">
            <Image src={checkCircle} alt="logo" />
          </div>
          <h1 className="text-custom-black text-center text-[34px] font-semibold mt-2">
            THANK YOU
          </h1>

          <p className="text-custom-black text-center text-[16px] font-normal mt-2 mb-[50px]">
            Your message has been successfully sent to the dentist. They will
            contact you shortly via email or phone.
          </p>

          {/* Form fields and buttons */}
        </div>
      </div>
    );
  };

  const conversationModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 ">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative">
          <div className="mx-5">
            <button
              className="absolute right-[20px] top-[20px]  "
              onClick={() => setShowModal(false)}
            >
              <FaTimes className="text-[#616161] w-[18px] h-[18px] cursor-pointer" />
            </button>
            <div className="py-5 flex flex-row items-center ">
              <div className="items-center pb-2">
                <Image
                  src={
                    modalData.profile_photo ? modalData.profile_photo : profile
                  }
                  alt="profile image"
                  width={67}
                  height={66}
                />
              </div>
              <div className="mx-5">
                <h2 className="text-custom-blue font-semibold text-[21px]">
                  {modalData.displayName}
                </h2>
                <div className="flex flex-col">
                  <h3 className="text-custom-black text-[15px]">
                    {modalData.speciality}
                  </h3>
                </div>
              </div>
            </div>
            <form onSubmit={(e) => contactMe(e)}>
              <div className="lg:mb-4 mb-0 gap-x-2 flex lg:flex-row flex-col justify-center lg:items-center">
                {/* <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="inputStyles"
                /> */}
                <AuthInput
                  placeholder={'Full Name'}
                  className="border border-custom-grey rounded-[7px] lg:mt-0 lg:w-[100%] w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  containerClassName="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <AuthInput
                  placeholder={'Phone Number'}
                  className="border border-custom-grey rounded-[7px] lg:mt-0 lg:w-[100%] w-full py-3  text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  type={'number'}
                  containerClassName="w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  // pattern
                  required
                />
                {/* <input
                  type="tel"
                  id="phone"
                  className="inputStyles"
                  placeholder="Phone Number"
                /> */}
                <AuthInput
                  placeholder={'Email Address'}
                  className="border border-custom-grey rounded-[7px] lg:w-[100%] lg:mt-0 w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  type={'email'}
                  containerClassName="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <input
                  type="email"
                  id="email"
                  className="inputStyles"
                  placeholder="Email Address"
                /> */}
              </div>
              <textarea
                id="conversation"
                placeholder="Start a conversation"
                className="inputStyles w-full mt-0"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <BlueButtons
                loading={contactLoader}
                // type="submit"
                className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 mt-5 mb-7 px-[45px] rounded lg:justify-end text-sm"
                // onClick={() => {
                //   setShowModal(false);
                //   setShowThankYouModal(true);
                // }}
                buttonText={'Send'}
              />
              {/* Send */}
              {/* </button> */}
            </form>
          </div>
          {/* Form fields and buttons */}
        </div>
      </div>
    );
  };

  const handleViewProfile = (e, item) => {
    e.preventDefault();
    console.log(item, 'item');
  };
  return (
    <div>
      {showModal && conversationModal()}
      {showThankYouModal && thankYouModal()}
      {data?.length > 0 ? (
        data?.map((item, index) => {
          console.log(item, 'itemmm');
          return (
            <div
              className="flex flex-col py-8 border-b border-[#70707030] "
              key={index}
            >
              <div className="mb-4 sm:mb-0 sm:mr-7 flex-shrink-0 flex flex-row items-center">
                <Image
                  src={item?.profile_photo ? item?.profile_photo : profile}
                  // width={163}
                  // height={163}
                  alt="dentist profile image"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className=" w-[115px] h-[115px] lg:w-[173px] lg:h-[173px] lg:rounded-[86.5px] rounded-[57.5px] "
                  // className="rounded-[86.5px] sm:w-[115px] sm:h-[115px]"
                />

                <div className="sm:ml-7">
                  <div className="flex flex-col  items-start p-[20px]">
                    <h2 className="text-custom-blue font-semibold text-[18px] lg:text-[21px]">
                      {item.displayName}
                    </h2>
                    <div className="flex mt-3">
                      <Image src={location} alt="logo" />
                      <h2 className="px-1 text-xs sm:text-sm font-medium">
                        {item.city} {item.postCode}
                      </h2>
                    </div>
                    <p className="px-1 text-base sm:text-lg font-normal hidden lg:block lg:my-5">
                      {item.bio}
                    </p>
                  </div>
                </div>
              </div>
              <p className="px-1 text-base sm:text-lg font-normal lg:hidden">
                {item.bio}
              </p>

              {/* <div className="flex flex-col sm:flex-row sm:items-center flex-grow">
              <div className="mt-4 sm:mt-0"> */}

              <div className="flex mt-4 lg:w-[100%] w-[100%] lg:justify-center justify-between !ml-0 lg:ml-[20%] ">
                {/* <button className="bg-custom-blue lg:font-medium font-medium  sm:text-lg w-[50%] lg:w-auto text-[14px] py-2 px-[30px] sm:px-[60px] mt-2 sm:mt-0 mr-2 sm:mr-4 text-white rounded-[7px]">
                Contact Me
              </button> */}
                <BlueButtons
                  className={
                    'lg:font-medium font-medium sm:text-[16px] w-[50%] lg:w-[20%] text-[14px] py-[0] !px-[0px] sm:px-[60px] text-white rounded-[7px] mt-2 sm:mt-0 mr-2 sm:mr-4'
                  }
                  buttonText={'Contact Me'}
                  onClick={() => {
                    setModalData(item);
                    setShowModal(true);
                  }}
                />
                <Link
                  href={`/patient/${item._id}`}
                  passHref
                  className="w-[85%]"
                >
                  <BlueButtons
                    className={
                      'lg:font-medium font-medium sm:text-[16px] w-[50%] lg:w-[20%] text-[14px] py-[2] !px-[0px] sm:px-[60px] !text-black rounded-[7px] mt-2 sm:mt-0 mr-2 sm:mr-4 bg-transparent border border-black '
                    }
                    buttonText={'View Profile'}
                    // onClick={(e) => handleViewProfile(e, item)}
                  />
                </Link>
                {/* <button
                onClick={() => Router.push("/patient/profile-page")}
                className="bg-transparent border border-[#252525] lg:font-medium font-medium text-base w-[50%] lg:w-auto sm:text-lg py-3 px-[30px] sm:px-[60px] mt-2 sm:mt-0 text-[#252525] rounded-[7px]"
              >
                View Profile
              </button> */}
              </div>
              {/* </div>
            </div> */}
            </div>
          );
        })
      ) : (
        <p>Sorry No Dentist found in this location</p>
      )}
    </div>
  );
};

export default DoctorProfileCard;
