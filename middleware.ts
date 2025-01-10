import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";
import { UserData } from './types';

const protectedPaths = [
    /\/my-orders\/(.*)/,

    /\/my-orders/,
    /\/checkout/,
    /\/dashboard/,
    /\/saved-items/,
    /\/my-profile/,
];

const sellerPaths = [
    /\/add-items/,
    /\/my-items/,
];

const adminPaths = [
    /\/add-category/,
    /\/all-category\/(.*)/,
];

const authPages = [/\/signin/, /\/signup/];

export async function middleware(request: NextRequest) {
    // Retrieve the token from cookies
    const token = request.cookies.get('token')?.value;

    // Check if the requested path is in the protected, admin, seller, or auth path categories
    const isProtected = protectedPaths.some((path) => path.test(request.nextUrl.pathname));
    const isSellerPath = sellerPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAdminPath = adminPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAuthPage = authPages.some((path) => path.test(request.nextUrl.pathname));

    // If no token exists and the path is protected, redirect to the sign-in page
    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // If token exists, decode it to get the user role
    try {
        if (token) {
            const decoded = jwtDecode(token) as UserData;
            const userRole = decoded?.role;

            // Prevent logged-in users from accessing auth pages
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage or another page
            }

            // Admin can access all protected and seller paths but cannot access admin-specific paths unless they are an admin
            if (isSellerPath && userRole !== 'seller' && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url)); // Redirect back if role is not seller/admin
            }

            if (isAdminPath && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url)); // Redirect back if role is not admin
            }

            // Allow both sellers and admins to access protected routes (as normal users)
            if (isProtected) {
                return NextResponse.next(); // Proceed normally if it's a protected route
            }
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/signin', request.url)); // Redirect if token is invalid or decoding fails
    }

    // Default response if no conditions matched (should never happen, as we handle all cases)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/my-orders/:path*',
        '/my-orders',
        '/checkout',
        '/dashboard',
        '/saved-items',
        '/my-profile',
        '/add-items',
        '/my-items',
        '/add-category',
        '/all-category/:path*',
        '/signin',
        '/signup',
    ],
};
