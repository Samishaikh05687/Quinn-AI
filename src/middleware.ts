import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',               // Home page
    '/auth(.*)',       // Auth routes
    '/portal(.*)',     // Portal routes
    '/images(.*)',     // Image assets
    '/favicon.ico',    // Favicon
    '/features',       // Features page
    '/pricing',        // Pricing page
    '/contact',        // Contact page
    '/newspage',
  ],
  ignoredRoutes: ['/chatbot'],  // Routes where Clerk auth is completely ignored
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
