import BlueButtons from "@/components/Buttons/BlueButtons";
import AuthInput from "@/components/Inputs/AuthInput";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const CreateCasePage = () => {
  const [selectedOption, setSelectedOption] = useState("public");
  const uploadFileref = useRef(null);

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

  const uploadFileHandler = () => {
    uploadFileref.current.click();
  };

  const handleRadioBtn = (option) => {
    setSelectedOption(option);
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
            Router.push("/dentist/create-case");
          }}
        >
          <div className="py-5 flex w-[100%] rounded-[7px] flex-col items-start justify-start ">
            <div className="w-[90%] flex flex-wrap gap-x-2 lg:gap-x-7 gap-y-1 items-center justify-start">
              <AuthInput
                placeholder={"Case Title"}
                className={"w-full lg:!w-[90%]"}
              />
              <textarea
                placeholder="Case Description"
                className="w-full lg:w-[90%] border bg-custom-dashboard-bg border-custom-grey rounded-[7px] p-3 focus:outline-none"
                rows={4}
              ></textarea>
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
                {treatmentType.map((data, dataIndex) => (
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
