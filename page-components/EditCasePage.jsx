import DashboardFooter from '@/components/DashboardFooter/DashboardFooter';
import EditCaseCard from '@/components/EditCaseCard/EditCaseCard';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { server } from '../config';
import { FaTimes } from 'react-icons/fa';
import AuthInput from '@/components/Inputs/AuthInput';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import BlueButtons from '@/components/Buttons/BlueButtons';
import { saveFiles } from 'redux/actions/cases';

const EditCasePage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [cases, setCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [caseObj, setCaseObj] = useState({});
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [imageFiles, setImageFiles] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const [afterPickedImage, setAfterPickedImage] = useState(null);
  const [afterImageFiles, setAfterImageFiles] = useState(null);

  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const [id, setId] = useState(null);
  const uploadFileref = useRef(null);
  const afteruploadFileref = useRef(null);

  useEffect(() => {
    getCases();
  }, []);

  const handleChange = (tags) => {
    setTags(tags);
  };
  const handleRadioBtn = (option) => {
    setSelectedOption(option);
  };

  const uploadFileHandler = () => {
    uploadFileref.current.click();
  };

  const afteruploadFileHandler = () => {
    afteruploadFileref.current.click();
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImageFiles(file);
      dispatch(saveFiles(file));
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log('no file');
        return toast.error('Please select valid image.');
      }
      // setImgObj(file);
      // console.log(file, 'my files');
      setPickedImage(URL.createObjectURL(file));
      // console.log(pickedImage, 'pickedImage');
    }
  };

  const onAfterImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setAfterImageFiles(file);
      // dispatch(saveFiles(file));
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log('no file');
        return toast.error('Please select valid image.');
      }
      // setImgObj(file);
      // console.log(file, 'my files');
      setAfterPickedImage(URL.createObjectURL(file));
      // console.log(pickedImage, 'pickedImage');
    }
  };
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

  const showModalHandler = (itemObj) => {
    console.log(itemObj, 'itemObj =======');
    setShowModal(true);
    setCaseObj(itemObj);
    setTags(itemObj.caseType);
    setDescription(itemObj.description);
    setTitle(itemObj.case_title);
    setSelectedOption(itemObj.visibility ? 'public' : 'private');
    setPickedImage(itemObj.before_cases_photo);
    setAfterPickedImage(itemObj.after_cases_photo);
    setId(itemObj._id);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setCaseObj({});
    setTags([]);
    setDescription();
    setTitle();
    setSelectedOption();
    setPickedImage(null);
    setId(null);
  };

  const updateHandler = () => {
    // console.log(imageFiles, pickedImage, '----------');
    if (!imageFiles && !pickedImage && !afterImageFiles && !afterPickedImage) {
      toast.error('select image please');
      return;
    }
    setLoader(true);

    const formData = new FormData();
    formData.append('id', id);
    formData.append('dentistId', user?._id);

    formData.append('title', title);
    formData.append('description', description);

    formData.append('tags', JSON.stringify(tags));
    formData.append('selectedOption', selectedOption);
    // if (imageFiles && imageFiles.length > 0) {
    formData.append('before_cases_photo', imageFiles ? imageFiles : '');
    formData.append(
      'after_cases_photo',
      afterImageFiles ? afterImageFiles : ''
    );

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
          // console.log(res);
          // dispatch(fetchUser(res?.data?.user));
          toast.success('Profile Updated');
          setShowModal(false);
          // setCaseObj({});
          // setTags([]);
          // setImageFiles(null);
          // setPickedImage(null);
          setLoader(false);
          getCases();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
        setLoader(false);
      });
  };

  const handleDeleteClick = async (id, index) => {
    setLoader(true);
    // console.log(id, 'my id');
    // return;
    try {
      // Optimistically remove the case immediately from the frontend
      // const updatedCases = cases.filter((caseItem) => caseItem.id !== currentCaseId);
      // setCases(updatedCases);

      // Call the deleteCase API (modify the URL as needed)
      cases.splice(index, 1);
      await axios.delete(`${server}/api/cases/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Cases Deleted Successfully');
      setCases((prevCases) =>
        prevCases.filter((caseItem) => caseItem.id !== id)
      );
      setLoader(false);
    } catch (error) {
      toast.success('Error deleting case');
      // ('Error deleting case:', error);

      // If the API call fails, rollback the frontend change by fetching cases again
      // fetchCases;
    } finally {
      // Close the dropdown after handling the click
      // setDropdownOpen(false);
    }
  };

  const getCases = () => {
    setPageLoader(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`${server}/api/cases`)
      .then(function (response) {
        console.log(response, 'getCase');
        setCases(response.data.cases);

        setPageLoader(false);
      })
      .catch(function (error) {
        console.log(error, 'get Error');
      });
  };
  const conversationModal = (item) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-[9999]">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative h-[95%] overflow-y-scroll my-[40px]">
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
                e.preventDefault();
                updateHandler();
              }}
              className="pt-5"
            >
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
              >
                {description}
              </textarea>

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
                  isClearable={false}
                  isSearchable
                  isMulti
                />
              </div>
              <div className="flex w-full justify-start">
                <div className="mt-5 my-3">
                  <p className="text-[18px] font-semibold">
                    {pickedImage == '' ? 'Upload Photo:' : 'Before'}
                  </p>
                  {pickedImage ? (
                    <div className="h-[200px] flex justify-center items-center">
                      <Image
                        src={pickedImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-w-[130px] w-full"
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
                    className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                    placeholder="Upload Photos"
                  />
                  <button
                    type="button"
                    className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 my-5"
                    onClick={() => uploadFileHandler()}
                  >
                    <p className="text-left lg:text-[16px] text-[14px] lg:font-semibold font-medium">
                      {' '}
                      Select Image
                    </p>
                  </button>
                </div>

                <div className="mt-5 mx-5">
                  <p className="text-[18px] font-semibold">
                    {afterPickedImage == '' ? 'Upload Photo:' : 'After'}
                  </p>
                  {afterPickedImage ? (
                    <div className="h-[200px] flex justify-center items-center">
                      <Image
                        src={afterPickedImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-w-[130px] w-full"
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
                    className="focus:outline-none w-[80%] lg:w-[100%] font-normal lg:text-[16px] text-[14px] bg-custom-dashboard-bg hidden"
                    placeholder="Upload Photos"
                  />
                  <button
                    type="button"
                    className="py-2 px-8 bg-[#D4D4D4] rounded-[7px] h-12 my-5"
                    onClick={() => afteruploadFileHandler()}
                  >
                    <p className="text-left lg:text-[16px] text-[14px] lg:font-semibold font-medium">
                      Select Image
                    </p>
                  </button>
                </div>
              </div>
              <BlueButtons
                buttonText={'Save'}
                loading={loader}
                className={'mb-5'}
              />

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
      <div className="items-center justify-center w-full h-full">
        <div className="lg:my-8 my-5 mx-auto w-[90%]">
          <h1 className="lg:text-[32px] text-[28px] lg:font-semibold font-medium">
            Edit Case
          </h1>

          <p className="mt-2 text-[16px] font-light mb-5">Update Information</p>
        </div>
        <div
          className={`lg:py-5 py-2 flex flex-row flex-wrap w-[90%] border-custom-grey rounded-[7px] mx-auto mb-8 ${
            pageLoader ? 'justify-center h-full' : 'justify-start'
          }`}
        >
          {pageLoader ? (
            <div aria-label="Loading..." role="status">
              <svg class="h-[100px] w-[100px] animate-spin" viewBox="3 3 18 18">
                <path
                  className="fill-indigo-200"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                ></path>
                <path
                  className="fill-[#0769cc]"
                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                ></path>
              </svg>
              {/* </div> */}
            </div>
          ) : (
            cases.map((item, index) => (
              <>
                {console.log(item, 'tettet')}
                <EditCaseCard
                  key={index}
                  casesData={item}
                  id={item._id}
                  name={item.case_title}
                  description={item.description}
                  img_url={item.before_cases_photo}
                  img_url_two={item.after_cases_photo}
                  types={item.caseType}
                  onDeleteClick={() => handleDeleteClick(item._id, index)}
                  // fetchCases={getCases}
                  showModalProp={() => showModalHandler(item)}
                />
              </>
            ))
          )}
        </div>
        {/* <DashboardFooter /> */}
      </div>
    </>
  );
};

export default EditCasePage;
