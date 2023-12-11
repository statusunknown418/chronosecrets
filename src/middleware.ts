export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home/:path*",
    "/my/:path*",
    "/secrets/:path*",
    "/receiving/:path*",
    "/quick/:path*",
    "/search/:path*",
    "/requests/:path*",
  ],
};
