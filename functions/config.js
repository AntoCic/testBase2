// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

export const onDevMod = process.env.NETLIFY_DEV === "true" || process.env.NODE_ENV === "development";
export const APP_NAME = 'testBase2';
export const allowedOrigins = [
  'http://localhost',
  'https://tempbase2.netlify.app'
];
export const allowedUserEmail = undefined; // 'email'[] or undefined