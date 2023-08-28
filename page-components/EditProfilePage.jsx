import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
// import { v2 as cloudinary } from "cloudinary";
// import { fetchUser } from '@/redux/actions/auth';
import axios from 'axios';
import Router from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import GoogleAutocomplete from 'react-google-autocomplete';

import Select from 'react-select';

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
import { getAddressData, getAddressSuggestions } from '@/lib/googleMaps';
const EditProfilePage = () => {
  const [loader, setLoader] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState('');

  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);
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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [tags, setTags] = useState([]);
  // const [speciality, setSpeciality] = useState('');
  // const [degree, setDegree] = useState('');

  // const { data: { user } = {}, mutate } = useCurrentUser();

  const dropdownRef = useRef(null);
  const uploadFileref = useRef(null);
  const lastRef = useRef();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log(user, s'user =======');
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
    // console.log(user, 'city');
    if (user) {
      console.log(user, 'user in use EFFECT');
      // console.log(user.city, 'user,city');
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setSelectedOption(user?.courtesyTitle);
      setBuildingName(user?.buildingName);
      setStreetName(user?.streetName);
      setLatitude(parseFloat(user?.latitude));
      setLongitude(parseFloat(user?.longitude));
      // setCourtesyTitle(user?.courtesyTitle)
      // setSpeciality(user?.speciality);
      // setDegree(user?.degree);
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
    // console.log(tags, 'use effect tags');
  }, [user]);

  const options = [
    { value: 'Aligners', label: 'Aligners' },
    // { value: 'Bridges', label: 'Bridges' },
    { value: 'Composite Bonding', label: 'Composite Bonding' },
    // { value: 'Crowns', label: 'Crowns ' },
    // { value: 'Dentures', label: 'Dentures ' },
    { value: 'Implants', label: 'Implants ' },
    // { value: 'Invisalign', label: 'Invisalign ' },
    // { value: 'Onlays', label: 'Onlays' },
    // { value: 'Orthodontics', label: 'Orthodontics' },
    // { value: 'Periodontal Treatment', label: 'Periodontal Treatment' },
    // { value: 'Restorations', label: 'Restorations' },
    // { value: ' Root canal treatment', label: ' Root canal treatment' },
    // { value: 'Smile Makeover', label: 'Smile Makeover' },
    { value: 'Veneers', label: 'Veneers' },
    { value: 'Whitening', label: 'Whitening' },
    { value: 'Sedation', label: 'Sedation' },

    // Add more options as needed
  ];

  const handleChange = (tags) => {
    setTags(tags);
  };
  const handleSelectChange = (event) => {
    // console.log(event.target.value, "event");
    setSelectedOption(event.target.value);
  };

  const handleSave = (e, secureUrl) => {
    e.preventDefault();
    // console.log(data?.location?.location?.lat, 'data?.location?.location?.lat');
    // return;

    // return;
    const treatmentTypeJSON = JSON.stringify(tags);
    // const loactionjson = JSON.stringify(tags);

    // return;
    setLoader(true);
    // console.log(imageFiles, 'imageFilesimageFilesimageFiles');
    const formData = new FormData();
    formData.append('id', user?._id);

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('userName', userName);
    // formData.append('displayName', displayName);
    formData.append('gdcNo', gdcNo);
    formData.append('buildingName', buildingName);
    formData.append('streetName', showAddress ? showAddress : streetName);
    formData.append(
      'location',
      JSON.stringify([
        longitude ? longitude : user?.longitude,
        latitude ? latitude : user?.latitude,
      ])
    );

    formData.append('latitude', latitude ? latitude : user?.latitude);
    formData.append(
      'longitude',

      longitude ? longitude : user?.longitude
    );
    formData.append('city', city);

    formData.append('postCode', postCode);
    // formData.append('speciality', speciality);
    // formData.append('degree', degree);

    formData.append('bio', bio);
    formData.append('phone', phone);
    formData.append('treatment_type', treatmentTypeJSON);
    formData.append('courtesyTitle', selectedOption);
    formData.append('profile_photo', imageFiles);

    axios
      .patch(`${server}/api/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
      })
      .then((res) => {
        // console.log(res.data.user, 'res after update');
        setLoader(false);
        if (res.status === 200) {
          dispatch(fetchUser(res?.data?.user));
          toast.success('Profile Updated');
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.data?.message);
      });
  };
  const uploadFileHandler = () => {
    // console.log('hereeee');
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
      // console.log(file, 'my files');
      setPickedImage(URL.createObjectURL(file));
      // console.log(psickedImage, 'pickedImage');
    }
  };

  // const handleSelectChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  // };

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
              onClick={() => Router.push('/dentist/create-case')}
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
            <div className="w-full flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-1">
              <div className="lg:w-[45%] flex flex-col gap-y-5 mt-5 lg:mt-0 justify-start items-start">
                <div>
                  <p>Profile Photo</p>
                  {pickedImage ? (
                    <Image
                      src={pickedImage}
                      width={105}
                      height={105}
                      className="rounded-[102.5px] max-w-[130px] lg:max-w-[205px]"
                      alt="logo"
                    />
                  ) : (
                    <></>
                  )}
                </div>
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
              <div className="w-[45%] text-[16px] font-light">
                <p className="font-normal">Courtesy Title</p>

                <select
                  className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] p-3  rounded-[7px] text-[14px] bg-custom-dashboard-bg border border-custom-grey"
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
                containerClassName={'w-[45%]'}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                label="User Name"
                // required
              />
              <AuthInput
                placeholder={'First Name'}
                className={'order-3'}
                containerClassName={'w-[45%]'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                label="First Name"
              />
              <AuthInput
                placeholder={'Last Name'}
                className={'order-4'}
                containerClassName={'w-[45%]'}
                // ref={lastRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                label="Last Name"
              />
              <AuthInput
                placeholder={'Email Address'}
                className={'order-6'}
                containerClassName={'w-[92.5%] lg:w-[45%]'}
                value={user?.email}
                disabled
                label="Email"
              />
              <AuthInput
                placeholder={'Phone'}
                className={'order-6'}
                containerClassName={'w-[92.5%] lg:w-[45%]'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone Number"

                // required
              />

              {/* <AuthInput
                placeholder={'Speciality Title'}
                className={'order-6'}
                containerClassName={'w-[92.5%] lg:w-[45%]'}
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                label="Speciality Title"

                // required
              /> */}

              {/* <AuthInput
                placeholder={'Degree'}
                className={'order-6'}
                containerClassName={'w-[92.5%] lg:w-[45%]'}
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                label="Degree"

                // required
              /> */}
              {/* <AuthInput
                placeholder={'Display Name'}
                className={'order-7'}
                containerClassName={'w-[45%]'}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                label="Display Name"
                required
              /> */}
              <AuthInput
                placeholder={'GDC Number'}
                className={'order-8'}
                containerClassName={'w-[45%]'}
                value={gdcNo}
                onChange={(e) => setGdcNo(e.target.value)}
                label="GDC No"
                required
              />

              <div className="w-[45%] relative">
                {/* <AuthInput
                  placeholder={'Practice Street Name'}
                  className={'order-10'}
                  containerClassName={'w-full'}
                  value={showAddress ? showAddress : streetName}
                  // onChange={(e) => setStreetName(e.target.value)}
                  onChange={handleInputChange}
                  label="Street Name"
                  required
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
                              handleAddressSelect(suggestion[1], suggestion[0]);
                            }}
                          >
                            {suggestion[0]}
                          </li>
                        </>
                      ))}
                    </ul>
                  )}
                </div> */}
                <p>Building Name</p>
                <GoogleAutocomplete
                  apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                  // className="flex-grow py-2 px-4 focus:outline-none w-4/5"
                  className=" order-10 focus:outline-none border w-full border-custom-grey rounded-[7px] p-3 bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5"
                  // style={{ width: '100%', height: 50 }}
                  onPlaceSelected={(place) => {
                    // console.log(place, 'place selectedval');
                    setLatitude(place?.geometry?.location?.lat());
                    setLongitude(place?.geometry?.location?.lng());
                    setShowAddress(place?.formatted_address);
                    const addressComponents = place?.address_components || [];
                    const postal_code = addressComponents?.find((component) =>
                      component.types.includes('postal_code')
                    );
                    setPostCode(postal_code?.long_name);
                    // console.log(postal_code, 'postal_code');

                    // console.log(locality, 'locality');
                    const localityTwo = addressComponents?.find((component) =>
                      component.types.includes('locality')
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
                  placeholder="Practice City"
                  options={{
                    types: ['geocode', 'establishment'],
                  }}
                  defaultValue={streetName}
                />
              </div>

              <AuthInput
                placeholder={'Practice City'}
                className={'order-9'}
                containerClassName={'w-[45%]'}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                label="City"
              />

              {/* <AuthInput
                placeholder={'Practice City'}
                className={'order-11'}
                containerClassName={'w-[45%]'}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                label="City"
                required
              /> */}
              <AuthInput
                placeholder={'Practice Post Code'}
                className={'order-12'}
                containerClassName={'w-[45%]'}
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                label="Postal Code"
                required
              />

              {/* <div> */}
              <div className="order-[13] w-[92.5%] lg:w-[45%]">
                <p>Bio</p>
                <textarea
                  placeholder="Bio"
                  className=" lg:text-[16px] text-[14px] w-full border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 focus:outline-none lg:order-[14] "
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              {/* </div> */}

              <div className="lg:w-[45%] flex flex-col justify-start items-start">
                <p>Type of treatments you offer</p>

                <div className="w-full">
                  <Select
                    value={tags}
                    onChange={handleChange}
                    // onChange={handleSelectChange}
                    options={options}
                    isClearable={false}
                    isSearchable
                    isMulti
                  />
                </div>
              </div>
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
