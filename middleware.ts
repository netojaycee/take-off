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

const authPages = [/\/signin/, /\/signup/];

export async function middleware(request: NextRequest) {
    // Retrieve the token from cookies
    const token = request.cookies.get('token')?.value;
    // const token = Cookies.get('token');
    // If token doesn't exist, redirect to login for protected routes
    const isProtected = protectedPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAdminPath = adminPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAuthPage = authPages.some((path) => path.test(request.nextUrl.pathname));


    
    // Verify and decode token
    try {
        if (token) {
            const decoded = jwtDecode(token) as UserData;
            const userRole = decoded?.role;


            if (isProtected) {
                return NextResponse.redirect(new URL('/signin', request.url));
            }
        
            // Prevent admins or users from accessing `authPages` when signed in
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage or another page
            }

            if (isAdminPath && userRole !== 'admin') {
                return NextResponse.redirect(new URL('/403', request.url));
            }
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/signin', request.url)); // Redirect if token is invalid
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/my-orders/:path*',
        '/sell/:path*'
    ],
};
