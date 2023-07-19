import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
// import { v2 as cloudinary } from "cloudinary";
// import { fetchUser } from '@/redux/actions/auth';
import axios from 'axios';
import Router from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { FaTrash, FaPlus } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import logoWhite from "../../public/images";

import { server } from '../config/index';
// import { TagsInput } from "react-tag-input-component";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Image from 'next/image';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'redux/actions/auth';
const EditProfilePage = () => {
  const [loader, setLoader] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [treatment, setTreatment] = useState([]);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');

  const [displayName, setDisplayName] = useState('');
  const [gdcNo, setGdcNo] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [courtesyTitle, setCourtesyTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selected, setSelected] = useState(['papaya']);
  const [imageFiles, setImageFiles] = useState(null);
  const [imageSecureUrl, setImageSecureUrl] = useState('');
  const [imageData, setImageData] = useState('');

  const [tags, setTags] = useState([]);
  // const { data: { user } = {}, mutate } = useCurrentUser();

  const dropdownRef = useRef(null);
  const uploadFileref = useRef(null);
  const lastRef = useRef();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user, 'user =======');
  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    const handleOutsideClick = (event) => {
      // console.log(event, "event");
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setSelectedOption(user?.courtesyTitle);
      setBuildingName(user?.buildingName);
      setStreetName(user?.streetName);
      setGdcNo(user?.gdcNo);
      setDisplayName(user?.displayName);
      setCity(user?.city);
      setPostCode(user?.postCode);
      setBio(user?.bio);
      setPhone(user?.phone ? user?.phone : '');
      setTags(user?.treatment_type);
      setUserName(user?.userName);
      setPickedImage(user?.profile_photo);
      // setI(user?.treatment_type);
    }
    console.log(tags, 'use effect tags');
  }, [user]);

  const handleChange = (tags) => {
    setTags(tags);
  };
  const handleSelectChange = (event) => {
    // console.log(event.target.value, "event");
    setSelectedOption(event.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoader(true);
  //   if (imageFiles) {
  //     const formdata = new FormData();
  //     formdata.append('file', imageFiles);
  //     formdata.append('upload_preset', 'vakxgj9w');
  //     // formdata.append("signature", "mkkk");
  //     formdata.append('api_key', '583939563285816');

  //     axios
  //       .post(
  //         `https://api.cloudinary.com/v1_1/dtnbj2pa5/auto/upload`,
  //         formdata
  //         // email,
  //         // password,
  //         // options,
  //       )
  //       .then((res) => {
  //         console.log(res, 'img response');
  //         setImageSecureUrl(res.data.secure_url);
  //         // const secureUrl = data.secure_url;
  //         handleSave(res?.data?.secure_url);

  //         setLoader(false);
  //       })
  //       // .then((data) => {

  //       // })
  //       .catch((error) => {
  //         setLoader(false);
  //         console.log(error, 'error error');
  //         // toast.error(error?.data?.message, {
  //         //   position: "top-center",
  //         //   autoClose: 2000,
  //         //   hideProgressBar: false,
  //         //   closeOnClick: true,
  //         //   pauseOnHover: true,
  //         //   draggable: true,
  //         //   progress: undefined,
  //         // });
  //       });
  //   } else {
  //     handleSave();
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const {
    //   firstName,
    //   lastName,
    //   phone,
    //   streetName,
    //   bio,
    //   displayName,
    //   speciality,
    //   degree,
    //   gdcNo,
    //   buildingName,
    //   postCode,

    //   city,

    //   image,
    // } = data;
    // console.log(data, "student profile date");
    // return
    try {
      setLoader(true); // setIsLoading(true);

      console.log(lastRef.current.value);
      console.log(firstName);

      // return;
      const formdata = new FormData();

      formdata.append('firstName', firstName ? firstName : '');
      // formdata.append("password", password ? password : "");
      formdata.append('phone', phone ? phone : '');
      formdata.append('lastName', lastRef.current.value);
      formdata.append('bio', bio);
      formdata.append('streetName', streetName);
      formdata.append('displayName', displayName);
      // formdata.append('speciality', speciality);
      // formdata.append('degree', degree);

      // formdata.append("education", educationJSON);
      // formdata.append("profileBio", profileBioJSON);
      // formdata.append("hourlyRate", hourlyRate ? hourlyRate : "");
      // formdata.append("profilePicture", image ? image : "");
      formdata.append('id', user._id);
      const response = await fetcher(`/api/user`, {
        method: 'PATCH',
        body: formdata,
      });
      console.log(response.body, 'patch');
      mutate({ user: response.user }, false);
      toast.success('Your profile has been updated');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoader(false);
      // setIsLoading(false);
    }
  };

  const handleSave = (e, secureUrl) => {
    e.preventDefault();
    const treatmentTypeJSON = JSON.stringify(tags);
    console.log(treatmentTypeJSON, 'treatmentTypeJSON');
    // return;
    console.log(imageFiles, 'imageFiles');
    // return;
    setLoader(true);
    const formData = new FormData();
    formData.append('id', user?._id);

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('userName', userName);
    formData.append('displayName', displayName);
    formData.append('gdcNo', gdcNo);
    formData.append('buildingName', buildingName);
    formData.append('streetName', streetName);
    formData.append('city', city);
    formData.append('postCode', postCode);
    formData.append('bio', bio);
    formData.append('phone', phone);
    formData.append('treatment_type', treatmentTypeJSON);
    formData.append('courtesyTitle', selectedOption);
    formData.append('profile_photo', imageFiles);

    // if (imageFiles) {
    //   formData.append('image', secureUrl);
    // } else {
    //   formData.append('image', pickedImage);
    // }

    axios
      .patch(`${server}/api/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
      })
      .then((res) => {
        console.log(res.data.user, 'res after update');
        setLoader(false);
        if (res.status === 200) {
          dispatch(fetchUser(res?.data?.user));
          toast.success('Profile Updated');
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.data?.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    // console.log(secureUrl, 'promise secure url');
    // // e.preventDefault();
    // console.log(tags, 'treatment');
    // // return;
    // setLoader(true);

    // // return;
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // axios
    //   .patch(`${server}/api/user`, {
    //     firstName,
    //     lastName,
    //     userName,
    //     displayName,
    //     gdcNo,
    //     buildingName,
    //     streetName,
    //     city,
    //     postCode,
    //     bio,
    //     phone,
    //     options,
    //     treatment_type: tags,
    //     courtesyTitle: selectedOption,

    //     ...(imageFiles ? { image: secureUrl } : { image: pickedImage }),
    //   })
    //   .then((res) => {
    //     console.log(res.data.user, 'res after updatae');
    //     setLoader(false);
    //     if (res.status == 200) {
    //       dispatch(fetchUser(res?.data?.user));
    //       setLoader(false);

    //       toast.success('Your Profile Update Successfully', {
    //         position: 'top-center',
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       // Router.replace("/dentist/view-profile");
    //     }
    //   })
    //   .catch((error) => {
    //     setLoader(false);
    //     toast.error(error?.data?.message, {
    //       position: 'top-center',
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   });
  };
  const uploadFileHandler = () => {
    console.log('hereeee');
    uploadFileref.current.click();
  };
  const onImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImageFiles(file);
      // console.log(formatBytes(file.size), "formatBytes(file.size)");
      // if (parseFloat(formatBytes(file.size)) > 5) return toast.error('File can not be larger than 5 mb')
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log('no file');
        return toast.error('Please select valid image.');
      }
      // setImgObj(file);
      console.log(file, 'my files');
      setPickedImage(URL.createObjectURL(file));
      console.log(pickedImage, 'pickedImage');
    }
  };

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
  return (
    <div className="items-center justify-center ">
      <div className="my-8 w-[100%] mx-auto">
        <div
          className="flex flex-row justify-between items-center w-[90%] mx-auto"
          //   style={{ margin: "10px" }}
        >
          <div className="flex flex-col">
            <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
              Profile
            </h1>

            <p className="mt-2 text-[16px] font-light mb-5">
              Personal Information
            </p>
          </div>
          <div>
            <BlueButtons
              buttonText={'Add Case'}
              className={'lg:px-[50px]'}
              onClick={() => Router.push('/dentist/create-case?tab=create')}
            />
          </div>
        </div>
        <div className="py-5 flex w-[90%] rounded-[7px] flex-col items-start justify-center mx-auto">
          <form
            onSubmit={
              (e) =>
                // onSubmit(e)
                handleSave(e)
              // handleSubmit(e);
              // handleSubmit(e);
            }
          >
            <div className="w-full flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-1 items-center">
              <div className="relative flex items-center border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 w-[45%] placeholder-slate-400 text-[16px] font-light mb-5">
                <select
                  className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg"
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
                placeholder={'User Name'}
                className={'order-2'}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <AuthInput
                placeholder={'First Name'}
                className={'order-3'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <AuthInput
                placeholder={'Last Name'}
                className={'order-4'}
                ref={lastRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <AuthInput
                placeholder={'Email Address'}
                className={'w-[92.5%] lg:w-[45%] order-5'}
                value={user?.email}
                disabled
              />
              <AuthInput
                placeholder={'Phone'}
                className={'w-[92.5%] lg:w-[45%] order-6'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <AuthInput
                placeholder={'Display Name'}
                className={'order-7'}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <AuthInput
                placeholder={'GDC Number'}
                className={'order-8'}
                value={gdcNo}
                onChange={(e) => setGdcNo(e.target.value)}
              />
              <AuthInput
                placeholder={'Practice Building number/ Name'}
                className={'order-9'}
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
              />
              <AuthInput
                placeholder={'Practice Street Name'}
                className={'order-10'}
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
              <AuthInput
                placeholder={'Practice City'}
                className={'order-11'}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <AuthInput
                placeholder={'Practice Post Code'}
                className={'order-12'}
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />

              <div className="lg:w-[45%] flex mt-5 lg:mt-0 mb-[72px]  justify-start items-start lg:order-[13] order-[14]">
                <input
                  onChange={(e) => onImageChange(e)}
                  ref={uploadFileref}
                  type="file"
                  className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg"
                  placeholder="Upload Profile Photo"
                />
                <button
                  type="button"
                  className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 hidden"
                  onClick={() => uploadFileHandler()}
                >
                  <p className="text-left text-[16px] font-semibold">
                    Upload Profile Photo
                  </p>
                </button>
              </div>

              <textarea
                placeholder="Bio"
                className="w-[92.5%] lg:text-[16px] text-[14px] lg:w-[45%] border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 focus:outline-none lg:order-[14] order-[13]"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="lg:w-[45%] flex flex-col mt-[-33px] justify-start items-start">
              {pickedImage ? (
                <Image
                  src={pickedImage}
                  width={105}
                  height={105}
                  className="rounded-[102.5px] max-w-[130px] lg:max-w-[205px]"
                />
              ) : (
                <></>
              )}
              <p className="text-[18px] font-semibold">Treatment Type:</p>
              <div>
                <TagsInput
                  value={tags}
                  onChange={handleChange}
                  inputProps={{
                    className: 'fonts-poppins',
                  }}
                />
              </div>

              {/* <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                {treatment.map((data, dataIndex) => (
                  <div
                    className="bg-custom-blue-light flex items-center justify-center h-10 px-5 rounded-[7px] grid-cols-2"
                    key={dataIndex}
                  >
                    <p className="text-center text-custom-black text-[14px] font-semibold">
                      {data.type}
                    </p>
                    <FaTrash className="w-5 h-5 pl-[10px]" />
                  </div>
                ))}
                <div className="flex items-center justify-center h-10 px-3 py-3 rounded-[7px] bg-[#EBFAF8]">
                  <p className="text-center text-custom-black text-[14px] font-semibold">
                    Add More
                  </p>
                  <FaPlus className="w-5 h-5 pl-[10px] " />
                </div>
              </div> */}
            </div>
            <div>
              <BlueButtons
                buttonText={'Save'}
                className={'mt-6 lg:px-[50px]'}
                loading={loader}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
