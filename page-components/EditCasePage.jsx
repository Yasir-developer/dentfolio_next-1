import DashboardFooter from "@/components/DashboardFooter/DashboardFooter";
import EditCaseCard from "@/components/EditCaseCard/EditCaseCard";
import React, { useEffect } from "react";
import axios from 'axios';
import { server } from '../config';

const EditCasePage = () => {
  useEffect(() => {
    getCases()
  },[]);
  const caseTypes = [
    {
      img_url: "/images/case2.png",
      name: "Composite Bonding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      type: ["Aligners", "Bridges", "Implants", "Root Canal Treatment"],
    },
    {
      img_url: "/images/case1.png",
      name: " Bonding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue, sapien non efficitur sollicitudin, ex risus semper diam, sed ornare libero urna ac leo sit amet consectetur adipiscing elit Curabitur congue sapien non efficitur sollicitudin.",
      type: ["Aligners", "Root Canal Treatment", "Bridges", "Implants"],
    },
  ];

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
      })
      .catch(function (error) {
        console.log(error, 'get Error');
      })
  }




  return (
    <div className="items-center justify-center">
      <div className="lg:my-8 my-5 mx-auto w-[90%]">
        <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
          Edit Case
        </h1>

        <p className="mt-2 text-[16px] font-light mb-5">Update Information</p>
      </div>
      <div className="lg:py-5 py-2 flex w-[90%] border-custom-grey rounded-[7px] flex-col items-center justify-start mx-auto mb-8">
        {caseTypes.map((item, index) => (
          <EditCaseCard
            key={index}
            id={index}
            name={item.name}
            description={item.description}
            img_url={item.img_url}
          />
        ))}
      </div>
      {/* <DashboardFooter /> */}
    </div>
  );
};

export default EditCasePage;
