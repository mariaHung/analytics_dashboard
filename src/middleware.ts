import { NextRequest, NextResponse } from 'next/server';
import { analytics } from './utils/analytics';

export default async function middleware(req: NextRequest) {
  // Check if the request is for the homepage
  if (req.nextUrl.pathname === '/') {
    try {
      // Track pageview asynchronously
      await analytics.track('pageview', {
        page: '/',
        country: req.geo?.country,
      });
    } catch (err) {
      // Log error to a logging service instead of the console
      // This prevents console errors from affecting performance
      logError(err);
    }
  }

  // Return the response without waiting for analytics tracking to complete
  // This prevents the middleware from slowing down the request
  return NextResponse.next();
}

// Define a separate function to log errors
function logError(err: any) {
  // Log errors to a logging service or file
  // Replace this with your preferred logging mechanism
  console.error(err);
}

// Define the matcher for the middleware
export const matcher = {
  matcher: ['/'],
};
