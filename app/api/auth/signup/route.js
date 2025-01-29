// frontend/app/api/auth/signup/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';
import { responseErrorHandler } from '../../../utils/errorHandler';

export async function POST(request) {
  const requestBody = await request.json();
  const backendEndpoint = `${process.env.NEXT_BACKEND_URL}/api/v1/auth/signup`; // Assuming backend URL is in env variables

  try {
    const response = await axios.post(backendEndpoint, requestBody);

    console.log(" API response:", response);
    return NextResponse.json(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    // Handle network errors or exceptions
    const errorMessage = responseErrorHandler(error);
    console.error("Signup API error:", error);
    return NextResponse.json({ message: errorMessage || 'Failed to connect to backend' }, {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
