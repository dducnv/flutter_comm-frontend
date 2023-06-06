export const OAUTH2_REDIRECT_URI = "http://localhost:3000/api/auth/social";

//oauth 2 redirect
export const GOOGLE_AUTH_URL =
  process.env.API_URL +
  "/oauth2/authorize/google?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  process.env.API_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
