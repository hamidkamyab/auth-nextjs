import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const Cookies = await cookies();
  const token = Cookies.get("token")?.value;

  try {
    if (token) {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status < 300) {
        Cookies.delete("token");
        return NextResponse.json({
          msg: "عملیات خروج با موفقیت انجام شد",
          status: response.status,
        });
      } else {
        return NextResponse.json({
          msg: " خطا در خروج از سیستم",
          status: response.status,
        });
      }
    } else {
      return NextResponse.json({}); // handle StrikMode without disabling strikemode
    }
  } catch (error) {
    return NextResponse.json({
      msg: "خطا در سرور رخ داده است، لطفا بعدا امتحان کنید",
      status: 500,
    });
  }
}
