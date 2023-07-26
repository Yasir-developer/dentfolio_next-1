import BlueButtons from '@/components/Buttons/BlueButtons';
import AuthInput from '@/components/Inputs/AuthInput';
import Router from 'next/router';
import { server } from '../config';
import React, { useRef, useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const CreateCasePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [selectedOption, setSelectedOption] = useState('public');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loader, setLoader] = useState(false);
  const [imageFiles, setImageFiles] = useState(null);
  const [pickedImage, setPickedImage] = useState([]);

  const [tags, setTags] = useState([]);
  const uploadFileref = useRef(null);

 

  const options = [
    { value: 'Aligners', label: 'Aligners' },
    { value: 'Bridges', label: 'Bridges' },
    { value: 'Composite Bonding', label: 'Composite Bonding' },
    { value: 'Crowns', label: 'Crowns ' },
    { value: 'Dentures', label: 'Dentures ' },
    { value: 'Implants', label: 'Implants ' },
    { value: 'Invisalign', label: 'Invisalign ' },
    { value: 'Onlays', label: 'Onlays' },
    { value: 'Orthodontics', label: 'Orthodontics' },
    { value: 'Periodontal Treatment', label: 'Periodontal Treatment' },
    { value: 'Restorations', label: 'Restorations' },
    { value: ' Root canal treatment', label: ' Root canal treatment' },
    { value: 'Smile Makeover', label: 'Smile Makeover' },
    { value: 'Veneers', label: 'Veneers' },
    { value: 'Whitening', label: 'Whitening' },

    // Add more options as needed
  ];

  const handleChange = (tags) => {
    setTags(tags);
  };
  const onImageChange = (e) => {
    // const files = Array.from(e.target.files);
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


    // if (files) {
    //   setImageFiles(files);
    //   console.log(imageFiles, 'kdskskdsa');
    //   // console.log(formatBytes(file.size), "formatBytes(file.size)");
    //   // if (parseFloat(formatBytes(file.size)) > 5) return toast.error('File can not be larger than 5 mb')
    //   // if (!files.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    //   //   console.log('no file');
    //   //   return toast.error('Please select valid image.');
    //   // }
    //   // setImgObj(file);
    //   console.log(files, 'my files');
    //   const urls = files.map((file) => URL.createObjectURL(file));
    //   console.log(urls, 'urls ---');
    //   setPickedImage(urls);
    //   // setPickedImage(URL.createObjectURL(files));
    //   console.log(pickedImage, 'pickedImage');
    // }
  };

  const emptFields = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setPickedImage([]);
    setImageFiles([]);
  };
  const uploadFileHandler = () => {
    uploadFileref.current.click();
  };

  const handleRadioBtn = (option) => {
    setSelectedOption(option);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const caseTypeJSON = JSON.stringify(tags);

    console.log(title, 'Title');
    console.log(description, 'description');
    console.log(tags, 'tags');
    console.log(selectedOption, 'selectedOption');
    console.log(imageFiles, 'imageFiles imageFiles');
    // const sweeterArray = imageFiles.forEach((sweetItem) => {
    //   console.log(sweetItem, 'sweetItem');
    //   return sweetItem;
    // });

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
    console.log(finalData, 'final data');
    // console.log(`${server}/api/create-case/`);
    const formData = new FormData();
    formData.append('dentistId', user?._id);

    formData.append('title', title);
    formData.append('description', description);

    formData.append('tags', caseTypeJSON);
    formData.append('selectedOption', selectedOption);
    formData.append('cases_photo', imageFiles);

    // formData.append(
    //   'cases_photo',
    //   // sweeterArray
    //   imageFiles.forEach((sweetItem) => {
    //     return sweetItem;
    //   })
    // );

    // imageFiles.forEach((file, index) => {
    //   console.log(file, 'file ==============');
    //   formData.append('cases_photo', file);
    // });

    // console.log(imageFiles, 'formData');
    axios
      .post(`${server}/api/cases`, formData, options)
      .then((res) => {
        console.log(res, 'job post response..');
        // return;
        if (res.status == 200) {
          setLoader(false);
          toast.success('Case Created Successfully');
          emptFields();
          // Router.replace('/dentist/view-profile');
        } else if (res.status == 400) {
          setLoader(false);
          // toast.error(res.errors[0], {
          //   position: 'top-center',
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  // const notify = () => toast('Wow so easy!');

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="my-8 mx-auto w-[90%]">
        {/* <div
          className="flex flex-row justify-between"
          //   style={{ margin: "10px" }}
        > */}
        <div className="flex flex-col">
          <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
            Add Case
          </h1>

          <p className="mt-2 text-[16px] font-light mb-5">
            Upload a treatment case that you've done to show off your skills to
            potential patients.
          </p>
        </div>
        {/* <div>
            <BlueButtons buttonText={"Add Case"} className={"px-[50px]"} />
          </div> */}
        {/* </div> */}
        <form
          enctype="multipart/form-data"
          onSubmit={(e) => {
            // e.preventDefault();
            submitHandler(e);
            // Router.push("/dentist/create-case");
          }}
          // enctype="multipart/form-data"
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
                {/* <div className="px-5"> */}
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
                {/* </div> */}
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

            <div className="lg:w-[45%] flex flex-col pt-5">
              <p className="text-[18px] font-semibold">Case Type:</p>
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                <div className="w-full">
                <Select
                  value={tags}
                  onChange={handleChange}
                  // onChange={handleSelectChange}
                  options={options}
                  isClearable
                  isSearchable
                  isMulti
                />
                  {/* <TagsInput
                    value={tags}
                    onChange={handleChange}
                    inputProps={{
                      className: 'fonts-poppins',
                    }}
                  /> */}
                </div>
                {/* {treatmentType.map((data, dataIndex) => (
                  <div
                    className="bg-custom-blue-light flex items-center justify-center h-10 px-5 rounded-[7px] grid-cols-2"
                    key={dataIndex}
                  >
                    <p className="text-center text-custom-black text-[14px] font-semibold">
                      {data.type}
                    </p>
                    <FaTrash className="w-5 h-5 pl-[10px]" />
                  </div>
                ))} */}
                {/* <div className="flex items-center justify-center h-10 px-3 py-3 rounded-[7px] bg-[#EBFAF8]">
                  <p className="text-center text-custom-black text-[14px] font-semibold">
                    Add More
                  </p>
                  <FaPlus className="w-5 h-5 pl-[10px] " />
                </div> */}
              </div>
            </div>

            <div className="mt-10">
              <p className="text-[18px] font-semibold">Upload Photos:</p>
              <input
                ref={uploadFileref}
                onChange={(e) => onImageChange(e)}
                type="file"
                className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                placeholder="Upload Photos"
              />
              <button
                type="button"
                className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 mt-5"
                onClick={() => uploadFileHandler()}
              >
                <p className="text-left text-[16px] font-semibold">
                  Select Images
                </p>
              </button>
            </div>

            <BlueButtons
              loading={loader}
              buttonText={'Save'}
              className={'bg-[#D4D4D4] rounded-[7px] mt-10'}
              // onClick={() => notify}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCasePage;
