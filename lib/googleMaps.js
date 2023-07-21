import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';

export async function getAddressSuggestions(input) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&types=address&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.predictions.length > 0) {
      console.log(response.data.predictions, 'response.data.predictions==');
      console.log(
        response.data.predictions.map((abc) => {
          return abc.description;
        })
      );
      return response.data.predictions.map((prediction) => {
        return [prediction.description, prediction.place_id];
      });
    }
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
  }

  return [];
}

export async function getAddressData(placeId, data) {
  console.log(placeId, 'placeId');
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        placeId
      )}&fields=formatted_address,address_components,geometry&key=${GOOGLE_MAPS_API_KEY}`
    );
    // console.log(
    //   response.address_components.map((item) => console.log(item, 'aeaed')),
    //   'response.address_components'
    // );
    // response.address_components.map((item) => {
    //   console.log(item, 'all items');
    // });

    if (response.data.result) {
      console.log(response.data.result, 'response.data.result');
      const { formatted_address, address_components, geometry } =
        response.data.result;
      console.log(response.data.result, 'response.data.result');

      const cityData = address_components.find((component) =>
        component.types.includes('locality')
      );
      const postalCodeData = address_components.find((component) => {
        console.log(component, 'component.types');
        if (component.types.includes('postal_code')) {
          return component;
        } else return '';
      });
      console.log(postalCodeData, 'postalCodeData');

      let postalCode = '';
      if (postalCodeData) {
        postalCode = postalCodeData.long_name;
      } else if (geometry?.postal_code) {
        postalCode = geometry.postal_code;
      }
      console.log(postalCodeData, 'postalCodeData');
      return {
        address: formatted_address,
        city: cityData ? cityData.long_name : '',
        postalCode: postalCodeData ? postalCodeData.long_name : '',
      };
    }
  } catch (error) {
    console.error('Error fetching address data:', error);
  }

  return null;
}
