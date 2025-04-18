export function getGithubOAuthUrl() {
  const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '';

  const oAuthBaseUrl = new URL('https://github.com/login/oauth/authorize');
  oAuthBaseUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  oAuthBaseUrl.searchParams.append('scope', 'user:email');

  return oAuthBaseUrl.toString();
}
