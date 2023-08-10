import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaFilter, FaCrosshairs } from 'react-icons/fa';
// import locationCross from "../../../public/images/location-crosshairs-solid.svg";
import Router, { useRouter } from 'next/router';
// import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import GoogleAutocomplete from 'react-google-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import {
  dentistLocation,
  dentistSearchCity,
  searchDentist,
} from 'redux/actions/dentist';
import { Range, getTrackBackground } from 'react-range';
import BlueButtons from '../Buttons/BlueButtons';
import { toast } from 'react-hot-toast';

const SearchBanner = () => {
  // const inputRef = useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [radius, setRadius] = useState(1);
  const [sliderValue, setSliderValue] = useState([1]); // Initial value for the range slider
  const [city, setCity] = useState('');

  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  console.log(latitude, longitude, address);

  const radiusDropdown = () => {
    const handleSliderChange = (values) => {
      setSliderValue(values);
      // console.log(sliderValue, 'sliderValue');
      // You can perform any action based on the slider value here
    };
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
        {/* ... */}
        <div className="bg-white rounded-lg p-6 w-64">
          <div className="mb-4">
            {/* ... */}
            <p>{sliderValue} KM</p>
            <Range
              values={sliderValue}
              onChange={handleSliderChange}
              min={0}
              max={100}
              step={1}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc',
                    background: getTrackBackground({
                      values: sliderValue,
                      colors: ['#0372E2', '#ccc'],
                      min: 1,
                      max: 100,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#0372E2',
                  }}
                />
              )}
            />
          </div>
          <div
            className="text-right cursor-pointer flex w-full justify-end"
            onClick={() => setShowModal(false)}
          >
            <p className="px-5">Close</p>
            <p>Done</p>
          </div>
        </div>
      </div>
    );
  };
  const handleModal = () => {
    setShowModal(true);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (latitude && longitude && radius) {
      setLoader(true);
      const data = {
        latitude,
        longitude,
        radius: sliderValue * 1000,
      };
      // console.log(first)
      dispatch(dentistLocation(address));
      // console.log(data);
      // return;
      dispatch(searchDentist(data));
      setLoader(false);
      router.push('/patient/dentist-list');
    } else {
      toast.error('Please Select Location and Radius to Continue');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#ccd6e5] to-[#dce8fa]">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-[1140px] mx-auto px-4 lg:px-8">
        <div className="w-full lg:w-[70%]">
          <div className="lg:p-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-black w-full lg:w-[80%] mt-[20px] lg:mt-[0px]">
              FIND A PRIVATE DENTIST{' '}
              <span className="text-3xl lg:text-4xl font-bold font-poppins text-custom-blue">
                NEAR YOU
              </span>{' '}
            </h1>
            <p className="mb-4 text-black font-normal lg:text-[14px] text-[13px]">
              Hundreds of dentists and practices around the UK showcase their
              portfolio work on Dentfolio - the home to the UK's best private
              dentists
            </p>
          </div>

          <div className="bg-white w-full lg:w-3/5 rounded-[7px] max-w-[1140px] my-10 lg:my-0 lg:ml-4">
            {showModal && radiusDropdown()}
            <div className="flex items-center p-4 w-full">
              <form onSubmit={(e) => onSubmitSearch(e)}>
                <div className="border border-gray-300 w-full flex items-center rounded-[5px]">
                  <FaCrosshairs size={20} color="#000" className="ml-2" />
                  <GoogleAutocomplete
                    apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                    className="flex-grow py-2 px-4 focus:outline-none w-4/5"
                    // style={{ width: '100%', height: 50 }}
                    onPlaceSelected={(place) => {
                      // console.log(place, 'place selectedval');
                      setLatitude(place?.geometry?.location?.lat());
                      setLongitude(place?.geometry?.location?.lng());
                      setAddress(place?.formatted_address);
                      const addressComponents = place?.address_components || [];

                      const locality = addressComponents.find((component) =>
                        component.types.includes('postal_town')
                      );
                      // console.log(locality, 'locality');
                      const localityTwo = addressComponents.find((component) =>
                        component.types.includes('locality')
                      );
                      // setCityData(locality?.long_name);
                      // console.log(locality, 'locality');
                      dispatch(
                        dentistSearchCity(
                          locality?.long_name
                            ? locality?.long_name
                            : localityTwo?.long_name
                        )
                      ); // setCity(locality);
                    }}
                    placeholder="Location"
                    options={{
                      types: ['geocode', 'establishment'],
                    }}
                    // defaultValue={address}
                  />

                  <FaFilter
                    size={20}
                    color="#000"
                    onClick={() => handleModal(true)}
                    className="cursor-pointer"
                  />

                  {/* <button
                    className="bg-custom-blue text-white px-4 py-2 rounded ml-2 focus:outline-none"
                    // onClick={() => Router.push('/patient/dentist-list')}
                  >
                    Search
                  </button> */}
                  <BlueButtons
                    buttonText="Search"
                    loading={loader}
                    className={
                      'bg-custom-blue text-white px-4 py-2 rounded ml-2 focus:outline-none'
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/images/doctor-2.png"
            alt="Image"
            className="w-full max-w-[500px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
