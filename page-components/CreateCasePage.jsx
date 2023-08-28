import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import { formatBytes } from '@/lib/user';

import Router from 'next/router';
import { server } from '../config';
import React, { useRef, useState, useEffect } from 'react';

import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import Image from 'next/image';

const CreateCasePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [selectedOption, setSelectedOption] = useState('public');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loader, setLoader] = useState(false);
  const [imageFiles, setImageFiles] = useState(null);
  const [afterImageFiles, setAfterImageFiles] = useState(null);

  const [pickedImage, setPickedImage] = useState('');

  const [afterPickedImage, setAfterPickedImage] = useState('');
  const [tags, setTags] = useState([]);
  const uploadFileref = useRef(null);
  const afteruploadFileref = useRef(null);

  const options = [
    { value: 'Aligners', label: 'Aligners' },
    // { value: 'Bridges', label: 'Bridges' },
    { value: 'Composite Bonding', label: 'Composite Bonding' },
    { value: 'Crowns', label: 'Crowns ' },
    { value: 'Dentures', label: 'Dentures ' },
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

    // Add more options as needed
  ];

  // useEffect(() => {
  //   console.log(pickedImage, 'picked use');
  //   console.log(afterPickedImage, 'after picked use');
  // }, [pickedImage, afterPickedImage]);

  const handleChange = (tags) => {
    setTags(tags);
  };
  const onImageChange = (e) => {
    // const files = Array.from(e.target.files);
    const [file] = e.target.files;
    if (file) {
      setImageFiles(file);
      // console.log(formatBytes(file.size), "formatBytes(file.size)");
      if (parseFloat(formatBytes(file.size)) > 5000) {
        return toast.error('File can not be larger than 5 mb');
      }
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        // console.log('no file');
        return toast.error('Please select valid image.');
      }
      // setImgObj(file);
      // console.log(file, 'my files');
      setPickedImage(URL.createObjectURL(file));
      // console.log(pickedImage, 'pickedImage');
    }
  };
  const onAfterImageChange = (e) => {
    // const files = Array.from(e.target.files);
    const [file] = e.target.files;
    if (file) {
      setAfterImageFiles(file);
      // console.log(formatBytes(file.size), "formatBytes(file.size)");
      if (parseFloat(formatBytes(file.size)) > 5000) {
        return toast.error('File can not be larger than 5 mb');
      }
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        // console.log('no file');
        return toast.error('Please select valid image.');
      }
      // setImgObj(file);
      // console.log(file, 'my files');
      setAfterPickedImage(URL.createObjectURL(file));
      // console.log(pickedImage, 'pickedImage');
    }
  };

  const emptFields = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setPickedImage('');
    setAfterPickedImage('');
    setAfterImageFiles(null);
    setImageFiles(null);
  };
  const uploadFileHandler = () => {
    uploadFileref.current.click();
  };
  const afteruploadFileHandler = () => {
    afteruploadFileref.current.click();
  };

  const handleRadioBtn = (option) => {
    setSelectedOption(option);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const caseTypeJSON = JSON.stringify(tags);
    if (tags.length <= 0) {
      toast.error('Please select Case Type');
      return;
    } else if (pickedImage == '') {
      toast.error('Please select an Image');
      return;
    } else if (afterPickedImage == '') {
      toast.error('Please select an After treatment Image');
      return;
    }
    setLoader(true);
    const finalData = {
      title,
      description,
      tags,
      selectedOption,
    };
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    // console.log(finalData, 'final data');
    // console.log(`${server}/api/create-case/`);
    const formData = new FormData();
    formData.append('dentistId', user?._id);

    formData.append('title', title);
    formData.append('description', description);

    formData.append('tags', caseTypeJSON);
    formData.append('selectedOption', selectedOption);

    formData.append('before_cases_photo', imageFiles);
    formData.append('after_cases_photo', afterImageFiles);

    axios
      .post(`${server}/api/cases`, formData, options)
      .then((res) => {
        // console.log(res, 'job post response..');
        // return;
        if (res.status == 200) {
          setLoader(false);
          toast.success('Case Created Successfully');
          emptFields();
          // Router.replace('/dentist/view-profile');
        } else if (res.status == 400) {
          setLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="my-8 mx-auto w-[90%]">
        <div className="flex flex-col">
          <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
            Add Case
          </h1>

          <p className="mt-2 text-[16px] font-light mb-5">
            Upload a treatment case that you've done to show off your skills to
            potential patients.
          </p>
        </div>

        <form
          enctype="multipart/form-data"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="py-5 flex w-[100%] rounded-[7px] flex-col items-start justify-start ">
            <div className="w-[90%] flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-1 items-center justify-start">
              <AuthInput
                placeholder={'Case Title'}
                className={'w-full lg:!w-full'}
                containerClassName={'w-full lg:!w-[90%]'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Case Description"
                className="w-full lg:w-[90%] border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 focus:outline-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex lg:flex-row flex-col pt-5 lg:items-center justify-start items-start">
              <p className="lg:text-[18px] text-[16px] font-semibold">
                Case Visibility:
              </p>
              <div className="flex flex-row">
                <label className="text-[16px] font-normal">
                  <input
                    type="radio"
                    value="public"
                    className="ml-0 lg:ml-[15px] mr-[5px]"
                    checked={selectedOption === 'public'}
                    onChange={() => {
                      handleRadioBtn('public');
                    }}
                  />
                  Public
                </label>
                <div className="radio">
                  <label className="text-[16px] font-normal">
                    <input
                      type="radio"
                      value="private"
                      className="ml-[15px] mr-[5px]"
                      checked={selectedOption === 'private'}
                      onChange={() => handleRadioBtn('private')}
                    />
                    Private
                  </label>
                </div>
              </div>
            </div>

            <div className=" w-[75%] lg:!w-[45%] flex flex-col pt-5">
              <p className="text-[18px] font-semibold">Case Type:</p>
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                <div className="w-full">
                  <Select
                    value={tags}
                    onChange={handleChange}
                    options={options}
                    isClearable={false}
                    isSearchable
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-x-10">
              <div className="mt-10">
                <p className="text-[18px] font-semibold">
                  Before Upload Photo:
                </p>
                {pickedImage ? (
                  <div className="h-[300px] flex justify-center items-center">
                    <Image
                      src={pickedImage}
                      width={200}
                      height={200}
                      className="rounded-[7px]"
                      alt="logo"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <input
                  ref={uploadFileref}
                  onChange={(e) => onImageChange(e)}
                  type="file"
                  name="before_cases_photo"
                  className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                  placeholder="Upload Photos"
                />
                <button
                  type="button"
                  className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 mt-5"
                  onClick={() => uploadFileHandler()}
                >
                  <p className="text-left text-[16px] font-semibold">
                    Select Image
                  </p>
                </button>
              </div>

              <div className="mt-10">
                <p className="text-[18px] font-semibold">After Upload Photo:</p>
                {afterPickedImage ? (
                  <div className="h-[300px] flex justify-center items-center">
                    <Image
                      src={afterPickedImage}
                      width={200}
                      height={200}
                      className="rounded-[7px]"
                      alt="logo"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <input
                  ref={afteruploadFileref}
                  onChange={(e) => onAfterImageChange(e)}
                  type="file"
                  name="after_cases_photo"
                  className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                  placeholder="Upload Photos"
                />
                <button
                  type="button"
                  className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 mt-5"
                  onClick={() => afteruploadFileHandler()}
                >
                  <p className="text-left text-[16px] font-semibold">
                    Select Image
                  </p>
                </button>
              </div>
            </div>
            <BlueButtons
              loading={loader}
              buttonText={'Upload'}
              className={'bg-[#D4D4D4] rounded-[7px] mt-10'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCasePage;
