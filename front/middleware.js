import { NextResponse } from "next/server";
import { Routes } from "./router/Routes";

const protectedRoutes = [Routes.about];
const authRoutes = [Routes.register, Routes.login];

export function middleware(request) {
  const token = request.cookies.get("token");
  const url = new URL(request.url).pathname;

  const isProtectedUrl = protectedRoutes.some((route) => url.startsWith(route));
  const isAuthUrl = authRoutes.includes(url);

  if (!token && isProtectedUrl) {
    return NextResponse.redirect(new URL(Routes.home, request.url));
  }

  if (token && isAuthUrl) {
    return NextResponse.redirect(new URL(Routes.home, request.url));
  }

  return NextResponse.next();
}
