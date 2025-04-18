import { createOrReturnUser } from '@/actions/create-or-return-user';
import { projectConstants } from '@/config/constants';
import { auth } from '@/models/auth';
import { type NextRequest, NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET_KEY ?? '';

export async function GET(request: NextRequest) {
  const ERROR_RESPONSE_URL = new URL('/', request.url);
  const SUCCESS_RESPONSE_URL = new URL('/dashboard', request.url);

  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    // TODO: log to external service
    console.log('ERROR: > No code provided');
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }

  // exchange code for token
  const githubToken = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  const { access_token } = (await githubToken.json()) as {
    access_token: string;
    token_type: string;
    scope: string;
  };

  if (!access_token) {
    // TODO: log to external service
    console.log('ERROR: > No access token received from GitHub');
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }

  // fetch user data
  const githubUser = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  });

  const userEmails = await fetch('https://api.github.com/user/emails', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  });

  const userData = await githubUser.json();
  const emails = await userEmails.json();
  if (!emails || emails.length === 0) {
    // TODO: log to external service
    console.log('ERROR: > No emails found');
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }

  const user = await createOrReturnUser({
    email: emails[0].email,
    name: userData.name ?? userData.login,
    avatar_url: userData.avatar_url,
  });

  const response = NextResponse.redirect(SUCCESS_RESPONSE_URL);

  const token = await auth.generateAccessToken({ userId: user.id });
  const sevenDaysInSeconds = 60 * 60 * 24 * 7;

  response.cookies.set({
    name: projectConstants.accessToken,
    value: token,
    httpOnly: true,
    maxAge: sevenDaysInSeconds,
  });

  return response;
}
