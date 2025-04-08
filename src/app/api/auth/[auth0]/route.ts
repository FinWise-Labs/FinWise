// src/app/api/auth/[auth0]/route.ts
import { handleAuth } from '@auth0/nextjs-auth0';

// Create handler without specific request/response objects
// This approach works with App Router
const handler = handleAuth();

// Export handlers for different HTTP methods
export const GET = handler;
export const POST = handler;