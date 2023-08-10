import React, { useEffect, useState } from 'react';
import SimpleButton from '@/components/Buttons/SimpleButton';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { server } from 'config';
import axios from 'axios';
import { PaymentMethods } from 'redux/actions/payment';
import toast from 'react-hot-toast';
import Checkbox from '../Checkbox/Checkbox';
const StripeCard = ({
  cardIcon,
  cardId,
  cardType,
  endingNumber,
  onDeleteClick,
  text,
  fetchData,
  hideRemove,

  disabled,
  isPrimary = false,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [primaryLoader, setPrimaryLoader] = useState(false);
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  const imgArr =
    cardType == 'visa'
      ? '/images/1.png'
      : cardType == 'mastercard'
      ? '/images/2.png'
      : cardType
      ? '/images/22.png'
      : '';
  const showModal = () => {
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    // setIsModalOpen(false); // Close the modal when confirmed
    onDeleteClick();
    setIsModalOpen(false);
  };

  const handlePrimary = (cardId) => {
    // e.preventDefault();

    // if (termsAccepted && privacyAccepted) {
    setPrimaryLoader(true);

    axios
      .post(`${server}/api/paymentMethods/primary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        customer_id: user.customer_id,
        paymentMethod_id: cardId,
      })
      .then((response) => {
        if (response.status == 200) {
          // dispatch(fetchUser(response?.data?.user));
          // console.log('here console');
          toast.success('Card is been Set as Primary');
          fetchData();

          // const data = {
          //   id: user.customer_id,
          // };
          // dispatch(PaymentMethods(data));
          setPrimaryLoader(false);

          // setPaymentModalShow(true); // router.replace('/dentist/view-profile');
        }
      })
      .catch((error) => {
        setPrimaryLoader(false);

        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error.message);
        }
        // console.log(e, 'erororor');
      });
  };
  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal when canceled
  };

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-[999]">
          <div className="bg-white p-8 rounded shadow-lg">
            <p>Do you want to delete this Payment Method?</p>
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
      <div className="flex gap-x-2 my-3 items-center lg:py-0 py-3">
        {/* <div className="cardIcon">{cardIcon}</div> */}

        <Image src={imgArr} width={50} height={50} alt="logo" />
        <div className="cardEndingNumber">
          {cardType} ending in {endingNumber}
        </div>
      </div>
      <div className="flex gap-x-3 justify-end">
        {/* <SimpleButton text={'Edit'} className={'border-r'} /> */}

        {!primaryLoader ? (
          <SimpleButton
            text={text}
            className={'border-r'}
            disabled={text == 'Primary' ? true : false}
            onClick={() => handlePrimary(cardId)}
          />
        ) : (
          <div aria-label="Loading..." role="status">
            <svg class="h-5 w-5 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-indigo-200"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-white"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
            {/* </div> */}
          </div>
        )}
        {!hideRemove ? (
          <SimpleButton
            text={'Remove'}
            className={'text-red-300'}
            onClick={showModal}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StripeCard;
