const isProductionEnv = process.env.NODE_ENV === 'production';
const productionRedirectUri =
  'https://smart-translator-ai.vercel.app/api/auth/google/callback';
const localRedirectUri = 'http://localhost:3000/api/auth/google/callback';

export function getGoogleRedirectUri() {
  const REDIRECT_URI = isProductionEnv
    ? productionRedirectUri
    : localRedirectUri;

  return REDIRECT_URI;
}

export function getGoogleOAuthUrl() {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';
  const REDIRECT_URI = getGoogleRedirectUri();

  const oAuthBaseUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  oAuthBaseUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  oAuthBaseUrl.searchParams.append('prompt', 'consent');
  oAuthBaseUrl.searchParams.append('response_type', 'code');
  oAuthBaseUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
  oAuthBaseUrl.searchParams.append('scope', 'email profile openid');

  return oAuthBaseUrl.toString();
}
