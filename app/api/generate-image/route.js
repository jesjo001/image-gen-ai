// frontend/app/api/generate-image/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';
import { auth } from '../../../../../frontend/lib/auth'; // Assuming auth utility is in ../../../lib/auth.js

export async function POST(request) {
  const requestBody = await request.json();
  const token = auth.getToken(); // Function to get token from localStorage or cookies
  const backendEndpoint = `${process.env.NEXT_BACKEND_URL}/api/v1/images/generate-image`;

  try {
    const response = await axios.post(backendEndpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Generate Image API error:", error);
    return NextResponse.json({ message: error.response?.data?.message || 'Failed to connect to backend' }, {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
