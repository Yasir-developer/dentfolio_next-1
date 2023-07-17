// "use client";
import { useEffect, useState } from "react";
import {
  FaIdCard,
  FaUser,
  FaFileAlt,
  FaEdit,
  FaCog,
  FaFileInvoiceDollar,
  FaUserMd,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

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
import OverviewPage from "@/page-components/OverviewPage";
import AdminDentistPage from "@/page-components/AdminDentistPage";
import RevenuePage from "@/page-components/RevenuePage";

const AdminTabs = (props) => {
  console.log(props, "props");
  const router = useRouter();
  // console.log(router, "routrer.quey");
  const [activeTab, setActiveTab] = useState("editProfile");
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuHandler = () => {
    setToggleMenu(!toggleMenu);

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
                  pathname: "/admin/overview",
                  // query: { tab: "overview" },
                }}
                onClick={() => {
                  setToggleMenu(false);
                  document.querySelector("body").classList.remove("bodyStyle");

                  // setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={`py-3 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[80%] text-custom-blue  ${
                    router?.pathname !== "/admin/overview" && "text-white"
                  } ${
                    router?.pathname === "/admin/overview" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px]"
                  }`}
                  // onClick={(e) => {
                  //   setActiveTab("viewProfile");
                  // }}
                >
                  <BsGridFill
                    className={`w-4 h-4 mx-2 ${
                      router?.pathname === "/admin/overview" &&
                      "text-custom-blue "
                    }`}
                  />
                  Overview
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/admin/dentist",
                  // query: { tab: "dentist" },
                }}
                onClick={() => {
                  setToggleMenu(false);
                  document.querySelector("body").classList.remove("bodyStyle");

                  // setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={`py-2 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[70%] ${
                    router?.pathname !== "/admin/dentist" && "text-white"
                  } ${
                    router?.pathname === "/admin/dentist" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px]"
                  }`}
                  // onClick={(e) => {
                  //   setActiveTab("editProfile");
                  // }}
                >
                  <FaUserMd className="w-4 h-4 mx-2" />
                  Dentist
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/admin/revenue",
                  // query: { tab: "revenue" },
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  // setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={` cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold my-3 w-[70%]  ${
                    router?.pathname !== "/admin/revenue" &&
                    "text-white text-[16px] font-semibold py-3"
                  } ${
                    router?.pathname === "/admin/revenue" &&
                    "bg-white text-custom-blue rounded-[5px]  py-3"
                  }`}
                  // onClick={(e) => {
                  //   setActiveTab("createCase");
                  // }}
                >
                  <FaMoneyBillWaveAlt className="w-4 h-4 mx-2" />
                  Revenue
                </li>
              </Link>

              <Link
                href={{
                  pathname: "/admin/settings",
                  // query: { tab: "settings" },
                }}
                onClick={() => {
                  document.querySelector("body").classList.remove("bodyStyle");

                  // setToggleMenu(false);
                }}
                passHref
              >
                <li
                  className={`py-3 cursor-pointer flex flex-row items-center ml-2 text-[16px] font-semibold w-[70%] ${
                    router?.pathname !== "/admin/settings" && "text-white"
                  } ${
                    router?.pathname === "/admin/settings" &&
                    "bg-white text-custom-blue rounded-[5px] w-[150px] py-3"
                  }`}
                  // onClick={(e) => setActiveTab("settings")}
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
        <div className="bg-gray-100 lg:w-[85%] w-full flex flex-col justify-between">
          <div className="lg:contentContainer bg-gray-100 pb-[72px] lg:overflow-y-scroll lg:h-full">
            {router?.pathname === "/admin/overview" && <OverviewPage />}

            {router?.pathname === "/admin/dentist" && <AdminDentistPage />}
            {router?.pathname === "/admin/revenue" && <RevenuePage />}
            {/* {router?.pathname === "edit" && <EditCasePage />}

            {router?.pathname === "billing" && <Billing />}
            {router?.query?.tab === "bill" && <BillingHistory />} */}

            {router?.pathname === "/admin/settings" && <SettingsPage />}
          </div>
          <div className="footerContainer fixed bottom-0 w-full left-0 z-[999]">
            <DashboardFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTabs;
