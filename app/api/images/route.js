// frontend/app/api/images/route.js
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
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

  const backendEndpoint = `${process.env.NEXT_BACKEND_URL}/api/v1/images/my-images`; 

  try {
    const response = await axios.get(backendEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get Images API error:', error);
    return NextResponse.json(
      { message: error.response?.data?.message || 'Failed to connect to backend' },
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
