import DashboardFooter from "@/components/DashboardFooter/DashboardFooter";
import EditCaseCard from "@/components/EditCaseCard/EditCaseCard";
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Image from "next/image";
import { server } from '../config';
import { FaTimes } from "react-icons/fa";
import AuthInput from "@/components/Inputs/AuthInput";
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import BlueButtons from "@/components/Buttons/BlueButtons";

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
  const { user } = useSelector((state) => state.auth);
  const [cases, setCases] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [caseObj, setCaseObj] = useState({})
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [imageFiles, setImageFiles] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(null);
  const uploadFileref = useRef(null);
  useEffect(() => {
    getCases()
  },[]);

 
  const handleChange = (tags) => {
    setTags(tags);
  };
  const handleRadioBtn = (option) => {
    setSelectedOption(option);
  };

  const uploadFileHandler = () => {
    uploadFileref.current.click();
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
  };
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
  
  const showModalHandler = (itemObj) => {
    console.log('working');
    console.log(showModal, 'showModal');

    setShowModal(true);
    setCaseObj(itemObj)
    setTags(itemObj.caseType)
    setDescription(itemObj.description)
    setTitle(itemObj.case_title)
    setSelectedOption(itemObj.visibility ? 'public' : 'private')
    setPickedImage(itemObj.cases_photo);
    setId(itemObj._id)
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setCaseObj({})
    setTags([])
    setDescription()
    setTitle()
    setSelectedOption()
    setPickedImage(null);
    setId(null)
  }

  const updateHandler = () => {
    const finalData = {
      id,
      title,
      description,
      tags,
      selectedOption,
      imageFiles
    };
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('dentistId', user?._id);

    formData.append('title', title);
    formData.append('description', description);

    formData.append('tags', JSON.stringify(tags));
    formData.append('selectedOption', selectedOption);
    imageFiles ? formData.append('cases_photo', imageFiles) : '';
    console.log(finalData)
    axios
      .patch(`${server}/api/cases`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
      })
      .then((res) => {
        // console.log(res.data.user, 'res after update');
        setLoader(false);
        if (res.status === 200) {
          console.log(res)
          // dispatch(fetchUser(res?.data?.user));
          toast.success('Profile Updated');
          setShowModal(false);
          setCaseObj({})
          setTags([])
          setImageFiles(null)
          setPickedImage(null)
          getCases()
        }
      })
      .catch((error) => {
        console.log(error)
        setLoader(false);
        toast.error(error?.data?.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    
    
  }

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
              onClick={() => closeModalHandler()}
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
            <form 
            onSubmit={(e) => {
              e.preventDefault()
              updateHandler()
            }}
            className="pt-5">
              <AuthInput
                placeholder={'Title'}
                className="border border-custom-grey rounded-[7px] lg:mt-0 w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                id="conversation"
                placeholder="Case Description"
                className="inputStyles w-full mt-0"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
              >{description}</textarea>

              <div className="flex lg:flex-row flex-col my-5 lg:items-center justify-start items-start">
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
              </div>
              <div className="mt-10">
                <p className="text-[18px] font-semibold">Upload Photo:</p>
                {pickedImage ? (
                  <Image
                    src={pickedImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-w-[130px] w-full h-full"
                  />
                ) : (
                  <></>
                )}
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
                    Select Image
                  </p>
                </button>
              </div>
              <BlueButtons buttonText={"Send"} loading={loader} />
              {/* <button
                type="submit"
                className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 mt-5 mb-7 px-[45px] rounded lg:justify-end text-sm"
                // onClick={() => {
                //   updateHandler();
                // }}
              >
                Send
              </button> */}
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
