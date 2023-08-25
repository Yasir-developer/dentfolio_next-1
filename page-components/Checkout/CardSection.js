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
      width: '80%',
      // padding: '100px',
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238',
      },
    },
    empty: {
      // boderWidth: '1',
      border: '1px solid black',
    },
  },
};

function CardSection() {
  return (
    <label>
      {/* Card details */}
      <div
        style={{
          border: '1px solid',
          borderColor: '#CFD7DF',
          borderRadius: '7px',
        }}
      >
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </label>
  );
}

export default CardSection;
