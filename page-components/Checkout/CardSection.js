import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import AddressForm from '@/components/AddressForm/AddressForm';
import AuthInput from '@/components/Inputs/AuthInput';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,

  style: {
    base: {
      color: '#303238',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238',
      },
    },
  },
};

function CardSection() {
  return (
    <label>
      {/* Card details */}
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
}

export default CardSection;
