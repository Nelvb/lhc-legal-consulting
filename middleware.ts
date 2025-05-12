/**
 * Middleware global para protección de rutas en Boost A Project.
 *
 * Este archivo intercepta todas las peticiones a rutas privadas del frontend
 * (como /admin o /dashboard), valida el token JWT desde cookies,
 * y redirige al usuario según su rol (admin o user).
 * 
 * Requiere la variable de entorno JWT_SECRET_KEY definida en .env.local.
 */

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'supersecretkey')

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const publicPaths = ['/', '/login', '/signup', '/blog', '/blog/', '/blog/[slug]']
    const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(path))

    const token = req.cookies.get('token')?.value

    if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/dashboard'))) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (token) {
        try {
            const { payload } = await jwtVerify(token, SECRET_KEY)
            const role = payload.role

            if (pathname.startsWith('/dashboard') && role !== 'user') {
                return NextResponse.redirect(new URL('/admin', req.url))
            }

            if (pathname.startsWith('/admin') && role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            if ((pathname === '/login' || pathname === '/') && role === 'admin') {
                return NextResponse.redirect(new URL('/admin', req.url))
            }

            if ((pathname === '/login' || pathname === '/') && role === 'user') {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        } catch (error) {
            const response = NextResponse.redirect(new URL('/login', req.url))
            response.cookies.delete('token')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/login', '/'],
}
