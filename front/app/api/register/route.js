import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const Cookies = await cookies();
  try {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    Cookies.set("token", data.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 48, //exp after 2 days
    });

    return NextResponse.json({ data: data.user, status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "خطا سمت سرور", status: 500 });
  }
}
