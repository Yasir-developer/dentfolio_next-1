import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import BlueButtons from '../Buttons/BlueButtons';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import { server } from 'config';

const EditCaseCard = ({
  img_url,
  name,
  description,
  id,
  types,
  showModalProp,
  onDeleteClick,
  caseData,
  fetchCases,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    const handleOutsideClick = (event) => {
      // console.log(event, "event");
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteClick = async () => {
    // Call the onDeleteClick prop passed from CasesList to handle the delete
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsModalOpen(false); // Close the modal when confirmed
    onDeleteClick();
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal when canceled
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        {/* <div> */}
        <div
          className="border rounded-[7px] border-[#F6EBEB] relative flex lg:flex-row flex-col-reverse px-3 mt-7"
          key={id}
        >
          <div className="flex flex-col my-3 gap-y-[3px] w-[15%]">
            <Image
              src={img_url ? img_url : '/images/case2.png'}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full my-3"
            />
          </div>

          <div className="flex flex-wrap lg:px-5 pt-5 pb-5 items-start justify-center w-[85%] flex-col gap-y-3">
            <h2 className="lg;text-center lg:text-left text-[21px] text-custom-blue font-semibold my-2 lg:w-full w-[90%]">
              {name}
            </h2>
            <div>
              <div className="flex" ref={dropdownRef}>
                {/* <div className="flex items-center justify-center px-2 rounded-l-md cursor-pointer"> */}
                <FaEllipsisV
                  onClick={() => toggleDropdown()}
                  className="static w-[5%] lg:absolute lg:right-0 lg:top-0 lg:w-[18px] lg:h-[18px] font-black lg:mx-[3px] lg:mb-[3px] lg:mt-[5px] cursor-pointer"
                />
                {isDropdownOpen && (
                  <div class="absolute top-[30px] right-[5px] w-48 bg-white rounded-lg shadow-xl cursor-pointer">
                    <p
                      class="block px-4 py-2 text-gray-800 hover:bg-custom-blue hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(); // Router.push('/dentist/settings');
                      }}
                    >
                      Delete Case
                    </p>
                    {/* <a
                        href="#"
                        class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                      >
                        Support
                      </a> */}
                    {/* </div> */}
                  </div>
                )}
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg">
                    <p>Do you want to delete this case?</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="px-4 py-2 mr-2 bg-custom-blue text-white rounded hover:bg-sky-500"
                        onClick={confirmDelete} // Call confirmDelete when confirmed
                      >
                        Confirm
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={cancelDelete} // Call cancelDelete when canceled
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-left text-[12px] lg:text-[16px] font-light w-full">
              {description}
            </p>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 lg:gap-x-5 mt-3">
              {types?.map((data, dataIndex) => (
                <div
                  className="bg-custom-blue-light flex items-center justify-center h-8 px-3 rounded-[7px]"
                  key={dataIndex}
                >
                  <p className="text-center text-custom-black text-[14px] font-semibold">
                    {data.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="justify-start w-full">
              <BlueButtons
                buttonText={'Edit'}
                className={'mx-auto my-2 '}
                onClick={() => showModalProp()}
              />
            </div>
          </div>
          {/* <FaEllipsisV
            style={{
              margin: "3px",
              marginTop: "5px",
              color: "#000",
              width: "18px",
              height: "18px",
            }}
          /> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EditCaseCard;
