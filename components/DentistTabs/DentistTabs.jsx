// "use client";
import { useEffect, useState } from "react";
import {
  FaIdCard,
  FaUser,
  FaFileAlt,
  FaEdit,
  FaCog,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import EditCasePage from "@/page-components/EditCasePage";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import ViewProfilePage from "@/page-components/ViewProfilePage";
import CreateCasePage from "@/page-components/CreateCasePage";
import BlueButtons from "../Buttons/BlueButtons";
import SettingsPage from "@/page-components/SettingsPage";
import Link from "next/link";
import { useRouter } from "next/router";
import EditProfilePage from "@/page-components/EditProfilePage";
import Billing from "@/page-components/BillingPage";
import BillingHistory from "@/page-components/BillingHistory";
const DentistTabs = (props) => {
  console.log(props, "props");
  const router = useRouter();
  // console.log(router, "routrer.quey");
  const [activeTab, setActiveTab] = useState("editProfile");
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuHandler = () => {
    setToggleMenu(!toggleMenu);
    console.log(toggleMenu, "toggleMenu");

    if (!toggleMenu) {
      document.querySelector("body").classList.toggle("bodyStyle");
    } else {
      document.querySelector("body").classList.remove("bodyStyle");
    }
  };

  return (
    <div className="flex flex-wrap h-full">
      {/* Menu Panel */}
      <DashboardHeader menuToggler={menuHandler} />
      <div
        className="bodyContainer flex w-full"
        style={{
          height: "calc(100% - 80px)",
        }}
      >
        <div
          className={`${
            toggleMenu
              ? "bg-gradient-radial from-[#0372E2] to-[#0B5FB4]  h-full w-[60%] lg:block lg:w-[18%] lg:absolute  lg:z-[999] z-[9999] fixed lg:top-0 bottom-0 top-[80px]"
              : "bg-gradient-radial from-[#0372E2] to-[#0B5FB4] hidden w-0 lg:block lg:w-[18%] z-[999]"
          }`}
        >
          <nav className="p-2 ">
            <ul>
              <Link
                href={{
                  pathname: "/dentist/view-profile",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");
                }}
                passHref
              >
                <li
                  className={`py-3 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[80%] ${
                    router?.pathname !== "/dentist/view-profile" && "text-white"
                  } ${
                    router?.pathname === "/dentist/view-profile" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px]"
                  }`}
                >
                  <FaUser className="w-4 h-4 mx-2" />
                  View My Profile
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/dentist/edit-profile",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");
                  setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={`py-2 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[70%] ${
                    router?.pathname !== "/dentist/edit-profile" && "text-white"
                  } ${
                    router?.pathname === "/dentist/edit-profile" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px]"
                  }`}
                >
                  <FaIdCard className="w-4 h-4 mx-2" />
                  Edit My Profile
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/dentist/create-case",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={` cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[70%]  ${
                    router?.pathname !== "/dentist/create-case" &&
                    "text-white text-[16px] font-semibold py-3"
                  } ${
                    router?.pathname === "/dentist/create-case" &&
                    "bg-white text-custom-blue rounded-[5px]  py-3"
                  }`}
                >
                  <FaFileAlt className="w-4 h-4 mx-2" />
                  Create Case
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/dentist/edit-case",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  setToggleMenu(false);
                }}
              >
                <li
                  className={`cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[70%] ${
                    router?.pathname !== "/dentist/edit-case" &&
                    "text-white text-[16px] font-semibold w-[60%] py-3"
                  } ${
                    router?.pathname === "/dentist/edit-case" &&
                    "bg-white text-custom-blue rounded-[5px] py-3"
                  }`}
                >
                  <FaEdit className="w-4 h-4 mx-2" />
                  Edit Case
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/dentist/billing",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  setToggleMenu(false);
                }}
              >
                <li
                  className={`py-3 cursor-pointer flex flex-row items-center ml-2 text-[16px] my-3 font-semibold w-[70%] ${
                    router?.pathname !== "/dentist/billing" && "text-white"
                  } ${
                    router?.pathname === "/dentist/billing" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px] py-3"
                  }`}
                >
                  <FaFileInvoiceDollar className="w-4 h-4 mx-2" />
                  Billing
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/dentist/settings",
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  setToggleMenu(false);
                }}
              >
                <li
                  className={`py-3 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold w-[70%] ${
                    router?.pathname !== "/dentist/settings" && "text-white"
                  } ${
                    router?.pathname === "/dentist/settings" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px] py-3"
                  }`}
                >
                  <FaCog className="w-4 h-4 mx-2" />
                  Settings
                </li>
              </Link>
            </ul>
          </nav>
          <BlueButtons
            className={
              "bg-white fixed my-[40px] mx-[20px] !text-custom-blue px-[50px] text-[16px] font-medium"
            }
            buttonText={"Sign Out"}
            onClick={() => router.push("/dentist/dentist-plan")}
          />
        </div>
        <div className=" lg:w-[85%] w-full flex flex-col justify-between">
          <div className="lg:contentContainer pb-[72px] lg:overflow-y-scroll lg:h-full">
            {router?.pathname === "/dentist/edit-profile" && (
              <EditProfilePage />
            )}

            {router?.pathname === "/dentist/view-profile" && (
              <ViewProfilePage />
            )}
            {router?.pathname === "/dentist/create-case" && <CreateCasePage />}
            {router?.pathname === "/dentist/edit-case" && <EditCasePage />}

            {router?.pathname === "/dentist/billing" && <Billing />}
            {router?.pathname === "/dentist/billing-history" && (
              <BillingHistory />
            )}

            {router?.pathname === "/dentist/settings" && <SettingsPage />}
          </div>
          <div className="footerContainer static lg:bottom-0 lg:w-full lg:left-0 z-[999]">
            <DashboardFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistTabs;
