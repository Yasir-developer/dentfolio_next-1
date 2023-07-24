import React, { useEffect, useRef, useState } from 'react';
import profile from '../../public/images/profile1.png';
import Image from 'next/image';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import checkCircle from '../../public/images/check-circle2.svg';
import mapOptions from './map-options.json';

import AuthInput from '../Inputs/AuthInput';
import GoogleMap from 'google-maps-react-markers';
import Marker from '../marker';
import { GOOGLE_MAPS_API_KEY } from 'config';
const DoctorBasicDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    // console.log(window.location, "window");
    if (typeof window !== undefined) {
      console.log(window?.location?.pathname, ' window?.location?.pathname');
      if (window?.location?.pathname === '/patient/profile-page') {
        setShowContact(true);
      } else {
        setShowContact(false);
      }
    }

    // if()
    // return () => {
    //   second
    // }
  }, [showContact]);

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId);

    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng });
    // rif. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  };
  const thankYouModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 z-[999]">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative max-w-[900px] translate-x-[11%]">
          <button
            className="absolute right-[20px] top-[20px]  "
            onClick={() => setShowThankYouModal(false)}
          >
            <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
          </button>
          <div className="flex items-center justify-center mt-[50px] ">
            <Image src={checkCircle} alt="logo" />
          </div>
          <h1 className="text-custom-black text-center text-[34px] font-semibold mt-2">
            THANK YOU
          </h1>

          <p className="text-custom-black text-center text-[16px] font-normal mt-2 mb-[50px]">
            Your message has been successfully sent to the dentist. They will
            contact you shortly via email or phone.
          </p>

          {/* Form fields and buttons */}
        </div>
      </div>
    );
  };

  const conversationModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 z-[999]">
        <div className="bg-white p-6 rounded-[7px] shadow-lg lg:w-[60%] w-[90%] relative translate-x-[11%]">
          <div className="mx-5">
            <button
              className="absolute right-[20px] top-[20px]  "
              onClick={() => setShowModal(false)}
            >
              <FaTimes className="text-[#616161] w-[18px] h-[18px]" />
            </button>
            <div className="py-5 flex flex-row items-center ">
              <div className="items-center pb-2">
                <Image src={profile} width={67} height={66} />
              </div>
              <div className="mx-5">
                <h2 className="text-custom-blue font-semibold text-[21px]">
                  Dylan Taylor
                </h2>
                <div className="flex flex-col">
                  <h3 className="text-custom-black text-[15px]">
                    Orthodontist
                  </h3>
                </div>
              </div>
            </div>
            <form>
              <div className="lg:mb-4 mb-0 gap-x-2 flex lg:flex-row flex-col justify-center lg:items-center">
                {/* <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="inputStyles"
                /> */}
                <AuthInput
                  placeholder={'Full Name'}
                  className="border border-custom-grey rounded-[7px] lg:mt-0 lg:w-[90%] w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  // btnStyle={ma}
                />

                <AuthInput
                  placeholder={'Phone Number'}
                  className="border border-custom-grey rounded-[7px] lg:mt-0 lg:w-[90%] w-full py-3  text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  type={'tel'}
                />
                {/* <input
                  type="tel"
                  id="phone"
                  className="inputStyles"
                  placeholder="Phone Number"
                /> */}
                <AuthInput
                  placeholder={'Email Address'}
                  className="border border-custom-grey rounded-[7px]  lg:mt-0 w-full py-3 text-[16px] placeholder:text-slate-400 placeholder-[#9F9F9F] font-extralight"
                  type={'email'}
                />
                {/* <input
                  type="email"
                  id="email"
                  className="inputStyles"
                  placeholder="Email Address"
                /> */}
              </div>

              <textarea
                id="conversation"
                placeholder="Start a conversation"
                className="inputStyles w-full mt-0"
                rows="4"
              ></textarea>

              <button
                type="submit"
                className="bg-custom-blue hover:bg-blue-600 text-white font-poppins font-medium py-2 mt-5 mb-7 px-[45px] rounded lg:justify-end text-sm"
                onClick={() => {
                  setShowModal(false);
                  setShowThankYouModal(true);
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
    <div className="sizingStyles flex flex-col lg:flex-row justify-between">
      {showModal && conversationModal()}
      {showThankYouModal && thankYouModal()}
      <div className="w-full lg:w-[80%]">
        <div className="lg:px-8 py-10 flex flex-row items-center gap-x-[1rem]">
          <div className="lg:w-[205px] lg:h-[205px] rounded-[102.5px] border-r-[50%] overflow-hidden">
            <Image
              src={
                props?.data?.profile_photo
                  ? props?.data?.profile_photo
                  : profile
              }
              width={205}
              height={205}
              className="rounded-[102.5px] max-w-[130px] lg:max-w-[205px] text-transparent object-cover	object-top"
            />
          </div>
          <div>
            <h2 className="text-custom-blue font-semibold lg:text-[33px] text-[20px]">
              {props?.data?.displayName}
            </h2>
            <div className="flex flex-col">
              <h3 className="text-custom-black lg:text-[22px] text-[17px]">
                {props?.data?.speciality}
              </h3>

              <h2 className="text-[#5D5D5D] text-[16px] font-normal">
                {props?.data?.degree}
              </h2>
            </div>
          </div>
        </div>
        <div className="lg:px-8">
          <p className="">{props?.data?.bio ? props?.data?.bio : 'No Bio'}</p>
          {showContact ? (
            <div className="lg:static lg:bg-transparent bg-[#dce8fa] fixed bottom-0 w-full left-0 lg:text-left text-center pb-5 z-10">
              <button
                className="bg-custom-blue font-semibold text-[16px] py-2 px-[60px] mt-[35px] w-139 text-white rounded-[7px]"
                onClick={() => setShowModal(true)}
              >
                Contact Me
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="h-[500px] w-[50%] rounded-[7px] py-10">
        {/* {mapReady && (
          <div>Map is ready. See for logs in developer console.</div>
        )} */}
        <GoogleMap
          apiKey={GOOGLE_MAPS_API_KEY}
          defaultCenter={{
            lat: props?.data?.latitude,
            lng: props?.data?.longitude,
          }}
          defaultZoom={15}
          options={mapOptions}
          mapMinHeight="400px"
          onGoogleApiLoaded={onGoogleApiLoaded}
          onChange={(map) => console.log('Map moved', map)}
        >
          {/* {coordinates.map(({ lat, lng, name }, index) => ( */}
          <Marker
            // key={index}
            lat={props?.data?.latitude}
            lng={props?.data?.longitude}
            onClick={onMarkerClick}
          />
          {/* ))} */}
        </GoogleMap>
      </div>

      {/* {servicelatitude != "" ? ( */}
      {/* <div className="business_map_section">
          <div className="map_frame_section"> */}
      {/* <div className="h-[500px] w-[50%] rounded-[7px] py-10">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_MAPS_API_KEY,
          }}
          className="rounded-[7px]"
          defaultCenter={{
            lat:
              // servicelatitude == ""
              //   ? 10.99835602
              //   :
              parseFloat(props?.data?.latitude),
            lng:
              // servicelongitude == ""
              //   ?
              //   77.01502627
              //   :
              parseFloat(props?.data?.longitude),
          }}
          defaultZoom={15}
          // yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={parseFloat(props?.data?.latitude)}
            lng={parseFloat(props?.data?.longitude)}
            text="My Marker"
          />
        </GoogleMapReact>
      </div> */}
      {/* </div>
        </div> */}
      {/* ) : (
        <></>
      )} */}

      {/* <div className="py-10">
        <Image src={map} alt="logo" />
      </div> */}
    </div>
  );
};

export default DoctorBasicDetail;
