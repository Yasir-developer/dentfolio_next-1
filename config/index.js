const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://dentfolio-prd.vercel.app/';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDtNQLSo9z2j996yTIBxmxRTseja8eQhgo';
