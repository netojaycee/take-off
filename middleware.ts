import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { UserData } from './types';


const protectedPaths = [
    /\/my-orders\/(.*)/,

];

const adminPaths = [
    /\/sell/,
];

export async function middleware(request: NextRequest) {
    // Retrieve the token from cookies
    const token = request.cookies.get('token')?.value;
    // const token = Cookies.get('token');
    // If token doesn't exist, redirect to login for protected routes
    const isProtected = protectedPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAdminPath = adminPaths.some((path) => path.test(request.nextUrl.pathname));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify and decode token
    try {
        if (token) {
            const decoded = jwtDecode(token) as UserData;
            const userRole = decoded?.role;

            if (isAdminPath && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/403', request.url));
            }
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url)); // Redirect if token is invalid
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/my-orders/:path*',
        '/sell/:path*'
    ],
};
