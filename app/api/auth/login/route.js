// frontend/app/api/auth/login/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.json();
  const backendEndpoint = `${process.env.NEXT_BACKEND_URL}/api/v1/auth/login`;

  try {
    const response = await axios.post(backendEndpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract token from the response
    const token = response.data?.token;

    console.log('Received token:', token);

    if (!token) {
      return NextResponse.json(
        { message: 'Token not provided in the response' },
        { status: 400 }
      );
    }

    // Save the token in a cookie
    const res = NextResponse.json(response.data, {
      status: response.status,
    });

    res.cookies.set('token', token, {
      httpOnly: true, // Secure the cookie (not accessible via JavaScript)
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF
      path: '/', // Cookie available across the site
      maxAge: 60 * 60 * 24 * 7, // Set expiration (1 week)
    });

    return res;
  } catch (error) {
    console.error('Login API error:', error);

    return NextResponse.json(
      { message: error.response?.data?.message || 'Failed to connect to backend' },
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
