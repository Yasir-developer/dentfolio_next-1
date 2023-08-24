import React from 'react';
import { AddressElement } from '@stripe/react-stripe-js';

const AddressForm = ({ onAddressChange }) => {
  const handleAddressChange = (event) => {
    // if (event.complete) {
    const address = event.value;
    console.log(address, 'address');
    // Call the callback function passed from the parent
    onAddressChange(address);
    // }
  };
  return (
    <form>
      {/* <h3>Billing</h3> */}
      <AddressElement
        options={{
          mode: 'billing',
          autocomplete: {
            mode: 'google_maps_api',
            apiKey: '{AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo}',
          },
        }}
        // onChange={(event) => {
        //   console.log(event, 'event');
        //   if (event.complete) {
        //     // Extract potentially complete address
        //     const address = event.value.address;
        //   }
        // }}
        onChange={handleAddressChange}
      />
    </form>
  );
};

export default AddressForm;
