import DashboardFooter from "@/components/DashboardFooter/DashboardFooter";
import EditCaseCard from "@/components/EditCaseCard/EditCaseCard";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Image from "next/image";
import { server } from '../config';
import { FaTimes } from "react-icons/fa";
import AuthInput from "@/components/Inputs/AuthInput";

const EditCasePage = () => {
  const caseTypes = [
    {
      cases_photo: ["/images/case2.png"],
      case_title: "Composite Bonding",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      caseType: ["Aligners", "Bridges", "Implants", "Root Canal Treatment"],
    },
    {
      cases_photo: ["/images/case1.png"],
      case_title: "Bonding",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      caseType: ["Aligners", "Root Canal Treatment", "Bridges", "Implants"],
    },
  ];
  const [cases, setCases] = useState(caseTypes)
  const [showModal, setShowModal] = useState(false)
  const [caseObj, setCaseObj] = useState({})
  useEffect(() => {
    getCases()
  },[]);
  
  const showModalHandler = (itemObj) => {
    console.log('working');
    console.log(showModal, 'showModal');

    setShowModal(true);
    setCaseObj(itemObj)
  };

  const getCases = () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${server}/api/cases`)
      .then(function (response) {
        // handle success
        console.log(response, 'getCase');
        setCases(response.data.cases)
      })
      .catch(function (error) {
        console.log(error, 'get Error');
      })
  }
  const conversationModal = (item) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-[9999]">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative">
          <div className="mx-5">
            <button
              className="absolute right-[20px] top-[20px]  "
              onClick={() => setShowModal(false)}
            >
              <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
            </button>
            <div className="py-5 flex flex-row items-center ">
              <div>
                <h2 className="text-custom-blue font-semibold text-[21px]">
                  Update Case
                </h2>
              </div>
            </div>
            <form className="pt-5">
              <AuthInput
                placeholder={'Title'}
                className="border border-custom-grey rounded-[7px] lg:mt-0 w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                value={item.case_title}
              />

              <textarea
                id="conversation"
                placeholder="Case Description"
                className="inputStyles w-full mt-0"
                rows="4"
              >{item.description}</textarea>

              <button
                type="submit"
                className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 mt-5 mb-7 px-[45px] rounded lg:justify-end text-sm"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Send
              </button>
            </form>
          </div>
          {/* Form fields and buttons */}
        </div>
      </div>
    );
  };



  return (
    <>
    {showModal && conversationModal(caseObj)}
      <div className="items-center justify-center">
        <div className="lg:my-8 my-5 mx-auto w-[90%]">
          <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
            Edit Case
          </h1>

          <p className="mt-2 text-[16px] font-light mb-5">Update Information</p>
        </div>
        <div className="lg:py-5 py-2 flex w-[90%] border-custom-grey rounded-[7px] flex-col items-center justify-start mx-auto mb-8">
          {cases.map((item, index) => (
            <EditCaseCard
              key={index}
              id={item._id}
              name={item.case_title}
              description={item.description}
              img_url={item.cases_photo}
              types={item.caseType}
              showModalProp={()=>showModalHandler(item)}
            />
          ))}
        </div>
        {/* <DashboardFooter /> */}
      </div>
    </>
  );
};

export default EditCasePage;
