export { default } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin";
//       }
//       // `/me` only requires the user to be logged in
//       return !!token;
//     },
//   },
// });

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mix/create",
    "/live/create",
    "/settings/:path*",
  ],
};
