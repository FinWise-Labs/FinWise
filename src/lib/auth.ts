import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  secret: process.env.AUTH0_COOKIE_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  },
  session: {
    rollingDuration: 60 * 60 * 8, // 8 hours
  },
  authorizationParams: {
    scope: 'openid profile email',
  },
});