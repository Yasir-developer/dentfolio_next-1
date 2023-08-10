import DoctorProfileCard from '@/components/DoctorProfileCard/DoctorProfileCard';
import React, { useEffect, useState } from 'react';
import { FaFilter, FaCrosshairs } from 'react-icons/fa';
import { Range, getTrackBackground } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';
import GoogleAutocomplete from 'react-google-autocomplete';
import {
  DentistSearchSuccessReset,
  dentistSearchCity,
  searchDentist,
} from 'redux/actions/dentist';
import { toast } from 'react-hot-toast';

const dentistlist = () => {
  const { dentist, location, city } = useSelector((state) => state.dentist);
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [loader, setLoader] = useState(true);
  const [sliderValue, setSliderValue] = useState([1]); // Initial value for the range slider
  const [showModal, setShowModal] = useState(false);
  const [radius, setRadius] = useState(1);
  const [address, setAddress] = useState('');
  const [cityData, setCityData] = useState('');

  useEffect(() => {
    setLoader(true);
    if (dentist) {
      setLoader(false);
    }
  }, [dentist, location]);

  // console.log(latitude, longitude, address);

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
          <form onClick={(e) => onSubmitSearch(e)}>
            <div
              className="text-right cursor-pointer flex w-full justify-end"
              onClick={() => setShowModal(false)}
            >
              <p className="px-5">Close</p>
              <p>Done</p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const handleModal = () => {
    setShowModal(true);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    // console.log(latitude, longitude, radius, 'l,dsaldmal');
    if (latitude && longitude && radius) {
      setLoader(true);
      const data = {
        latitude,
        longitude,
        radius: sliderValue * 1000,
      };
      // console.log(first)
      // dispatch(dentistLocation(address));
      // console.log(data);
      // return;
      dispatch(searchDentist(data));
      setLoader(false);
      // router.push('/patient/dentist-list');
    } else {
      toast.error('Please Select Location and Radius to Continue');
    }
  };
  return (
    <>
      <div className="bg-blue sizingStyles mt-8">
        {showModal && radiusDropdown()}

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-custom-black">
          TOP{' '}
          <span className="text-3xl sm:text-4xl font-poppins text-custom-blue">
            CERTIFIED
          </span>{' '}
          DENTIST IN{' '}
          <span className="text-3xl sm:text-4xl font-poppins text-custom-blue">
            {/* MANCHESTER */}
            {city?.toUpperCase()}
          </span>
        </h1>

        <h3 className="text-lg sm:text-xl font-normal">
          {dentist?.data?.user?.length > 0 ? (
            <span>
              {dentist?.data?.user?.length} Dentist available in {city}
            </span>
          ) : (
            <span>No Dentist available in {city}</span>
          )}
        </h3>

        <div className="w-full sm:w-[80%]">
          <p className="mt-8 text-base sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            congue, sapien non efficitur sollicitudin, ex risus semper diam, sed
            ornare libero urna ac leo.
          </p>
        </div>
        <div className="bg-white rounded-[7px] w-full sm:w-[35%]">
          <div className="flex items-center py-4 sm:py-[30px] w-full">
            <div className="border border-gray-300 w-full flex items-center rounded-[5px] pr-[15px]">
              <FaCrosshairs size={20} color="#000" className="ml-2" />
              {/* <input
              type="text"
              placeholder="Location"
              className="flex-grow py-3 px-4 focus:outline-none w-4/5 text-sm sm:text-base"
            /> */}

              <GoogleAutocomplete
                apiKey={'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo'}
                // apiKey={process.env.GOOGLE_MAPS_API_KEY}
                className="flex-grow py-3 px-4 focus:outline-none w-4/5 text-sm sm:text-base" // style={{ width: '100%', height: 50 }}
                onPlaceSelected={(place) => {
                  // console.log(place, 'place selectedval');
                  setLatitude(place?.geometry?.location?.lat());
                  setLongitude(place?.geometry?.location?.lng());
                  setAddress(place?.formatted_address);

                  const addressComponents = place?.address_components || [];

                  const locality = addressComponents.find((component) =>
                    component.types.includes('postal_town')
                  );

                  const localityTwo = addressComponents.find((component) =>
                    component.types.includes('locality')
                  );
                  setCityData(locality?.long_name);
                  // console.log(locality, 'locality');
                  dispatch(
                    dentistSearchCity(
                      locality?.long_name
                        ? locality?.long_name
                        : localityTwo?.long_name
                    )
                  );
                  const data = {
                    latitude: place?.geometry?.location?.lat(),
                    longitude: place?.geometry?.location?.lng(),
                    radius: sliderValue * 1000,
                  };
                  dispatch(searchDentist(data));
                }}
                placeholder="Location"
                options={{
                  types: ['geocode', 'establishment'],
                }}
                // defaultValue={location}
              />
              <FaFilter
                size={16}
                color="#000"
                className="cursor-pointer"
                onClick={() => handleModal()}
              />
            </div>
          </div>
        </div>
        {!loader ? (
          <DoctorProfileCard data={dentist?.data?.user} />
        ) : (
          <div aria-label="Loading..." role="status">
            <svg class="h-[1px] w-[100px] animate-spin">
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
        )}
        {/* <div className="flex justify-center my-[80px]">
        <button className="bg-custom-blue lg:font-semibold font-medium text-[16px] py-2 px-[60px] lg:mt-5  w-139 text-sm text-white rounded-[7px] ">
          Load More{' '}
        </button>
      </div> */}
      </div>
    </>
  );
};

export default dentistlist;
