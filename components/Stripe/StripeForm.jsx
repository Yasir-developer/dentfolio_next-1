import React, { useMemo } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import useResponsiveFontSize from './useResponsiveFontSize';
// import { Button } from '../Button';
// import { Form } from 'react-bootstrap';
// import { Input } from '../Input';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log('[PaymentMethod]', payload);
  };

  return (
    // <Form onSubmit={handleSubmit}>
    <form>
      Card details
      <PaymentElement />
      <Elements
        options={options}
        onReady={() => {
          console.log('CardElement [ready]');
        }}
        onChange={(event) => {
          console.log('CardElement [change]', event);
        }}
        onBlur={() => {
          console.log('CardElement [blur]');
        }}
        onFocus={() => {
          console.log('CardElement [focus]');
        }}
      />
    </form>
    // </Form>
  );
};

export default StripeForm;
