import BlueButtons from "@/components/Buttons/BlueButtons";
import AuthInput from "@/components/Inputs/AuthInput";
import Router from "next/router";
import { server } from '../config';
import React, { useRef, useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';

const CreateCasePage = () => {
  const treatmentType = [
    {
      type: "Aligners",
    },
    {
      type: "Aligners",
    },
    {
      type: "Aligners",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("public");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caseType, setCaseType] = useState(treatmentType);
  const [loader, setLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const uploadFileref = useRef(null);

  useEffect(() => {
    console.log(tags)
  },[tags]);

  const handleChange = (tags) => {
    setTags(tags);
  };

  const uploadFileHandler = () => {
    uploadFileref.current.click();
  };

  const handleRadioBtn = (option) => {
    setSelectedOption(option);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title, 'Title')
    console.log(description, 'description')
    console.log(tags, 'tags')
    console.log(selectedOption, 'selectedOption')
    setLoader(true);
    const finalData = {
      title,
      description,
      tags,
      selectedOption
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(finalData, "final data");
    console.log(`${server}/api/create-case/`)

    axios
      .post(`${server}/api/cases`, finalData, options)
      .then((res) => {
        console.log(res, "job post response..");
        // return;
        if (res.status == 201) {
          setLoader(false);
          toast.success("Case Created Successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          Router.replace("/dentist/view-profile");
        } else if (res.status == 400) {
          setLoader(false);
          toast.error(res.errors[0], {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error)
        if (error?.response?.data?.errors && error.response.data.errors.length > 0) {
          toast.error(error?.response?.data?.errors[0], {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if(error?.response?.data?.message) {
          // setLoader(false);
          toast.error(error?.response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else{
          toast.error(error?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const notify = () => toast("Wow so easy!");

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
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(e)
            // Router.push("/dentist/create-case");
          }}
        >
          <div className="py-5 flex w-[100%] rounded-[7px] flex-col items-start justify-start ">
            <div className="w-[90%] flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-1 items-center justify-start">
              <AuthInput
                placeholder={"Case Title"}
                className={"w-full lg:!w-[90%]"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Case Description"
                className="w-full lg:w-[90%] border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 focus:outline-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                    checked={selectedOption === "public"}
                    onChange={() => handleRadioBtn("public")}
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
                      checked={selectedOption === "private"}
                      onChange={() => handleRadioBtn("private")}
                    />
                    Private
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:w-[45%] flex flex-col pt-5">
              <p className="text-[18px] font-semibold">Case Type:</p>
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
                <div className='w-full'>
                  <TagsInput
                    value={tags}
                    onChange={handleChange}
                    inputProps={{
                      className: 'fonts-poppins',
                    }}
                  />
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
                type="file"
                className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                placeholder="Upload Photos"
              />
              <button
                className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 mt-5"
                onClick={() => uploadFileHandler()}
              >
                <p className="text-left text-[16px] font-semibold">
                  Select Images
                </p>
              </button>
            </div>

            <BlueButtons
              buttonText={"Save"}
              className={"bg-[#D4D4D4] rounded-[7px] mt-10"}
              onClick={() => notify}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCasePage;
