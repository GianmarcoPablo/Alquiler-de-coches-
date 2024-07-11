import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Matcher para las rutas protegidas
const isProtectedRoute = createRouteMatcher([
    '/(api|trpc)(.*)',
]);

// Middleware de Clerk con excepción para el endpoint de UploadThing
export default clerkMiddleware((auth, req) => {
    // Permitir acceso sin restricciones a /api/uploadthing
    if (req.nextUrl.pathname.startsWith('/api/uploadthing')) {
        return NextResponse.next();
    }

    // Proteger otras rutas según el matcher
    if (isProtectedRoute(req)) auth().protect();

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ],
};
