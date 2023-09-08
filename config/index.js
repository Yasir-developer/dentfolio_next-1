const dev = process.env.NODE_ENV !== 'production';
// ? 'http://localhost:3000'

export const server = dev
  ? 'http://localhost:3000'
  : 'https://www.dentfolio.co.uk';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';
