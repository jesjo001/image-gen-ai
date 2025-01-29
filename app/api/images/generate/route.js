import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Retrieve the token from the cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('Received token:', token);

  if (!token) {
    return NextResponse.json(
      { message: 'Authentication token not found' },
      { status: 401 }
    );
  }

  const backendEndpoint = `${process.env.NEXT_BACKEND_URL}/api/v1/images/generate-image`;

  try {
    const body = await request.json(); // Parse the request body
    const { prompt, size } = body;

    if (!prompt || !size) {
      return NextResponse.json(
        { message: 'Prompt and size are required' },
        { status: 400 }
      );
    }

    // Send the request to the backend
    const response = await axios.post(
      backendEndpoint,
      { prompt, size },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('API response :', response);

    return NextResponse.json(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Generate Image API error:', error);

    return NextResponse.json(
      {
        message: error.response?.data?.message || 'Failed to connect to backend',
      },
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
