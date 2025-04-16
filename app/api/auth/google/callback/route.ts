import { createOrReturnUser } from "@/actions/create-or-return-user";
import { getGoogleRedirectUri } from "@/actions/oauth/googleAuth";
import { projectConstants } from "@/config/constants";
import { auth } from "@/models/auth";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

const GOOGLE_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET_KEY ?? "";
const REDIRECT_URI = getGoogleRedirectUri();

export async function GET(request: NextRequest) {
  const ERROR_RESPONSE_URL = new URL("/", request.url);
  const SUCCESS_RESPONSE_URL = new URL("/dashboard", request.url);

  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    // TODO: log to external service
    console.log("ERROR: > No code provided");
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }

  // exchange code for tokens
  const tokens = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify({
      code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
    }),
  });

  if (!tokens.ok) {
    // TODO: log to external service
    console.log("ERROR: > Failed to exchange code for tokens");
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }

  const { id_token } = (await tokens.json()) as {
    access_token: string;
    id_token: string;
  };

  try {
    const { payload } = await jwtVerify(id_token, GOOGLE_JWKS, {
      issuer: "https://accounts.google.com",
      audience: GOOGLE_CLIENT_ID,
    });

    if (!payload || !payload.email) {
      // TODO: log to external service
      console.log("ERROR: > Invalid payload");
      return NextResponse.redirect(ERROR_RESPONSE_URL);
    }

    const user = await createOrReturnUser({
      email: payload.email as string,
      name: payload.name as string,
      avatar_url: payload.picture as string,
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
  } catch (error) {
    // TODO: log to external service
    console.log("ERROR: > Failed to verify token", error);
    return NextResponse.redirect(ERROR_RESPONSE_URL);
  }
}
