import { NextResponse } from "next/server";

const protectedRoutes = ["/about"];
const authRoutes = ["/login", "/register"];

export function middleware(request) {
  const token = request.cookies.get("token");
  const url = new URL(request.url).pathname;

  const isProtectedUrl = protectedRoutes.some((route) => url.startsWith(route));
  const isAuthUrl = authRoutes.includes(url);

  if (!token && isProtectedUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
