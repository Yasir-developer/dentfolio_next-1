const dev = process.env.NODE_ENV !== 'production';
// ? 'http://localhost:3000'

export const server = dev
  ? 'https://5d6a-182-176-179-27.ngrok-free.app/'
  : 'https://www.dentfolio.co.uk';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';
