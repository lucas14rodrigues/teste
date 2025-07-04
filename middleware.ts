import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/minha-conta")) {
          return !!token
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/minha-conta/:path*"],
}
