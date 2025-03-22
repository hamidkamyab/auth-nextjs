"use client";

import { Routes } from "@/router/Routes";
import useAuthStore from "@/store/auth";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function Logout() {
  const { setAuth } = useAuthStore();

  const logoutHandle = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.status < 300) {
      toast.error(data.msg, {
        position: "bottom-right",
      });
      setAuth(false);
    } else {
      toast.error(data.msg, {
        position: "bottom-right",
      });
    }

    setTimeout(() => {
      redirect(Routes.home);
    }, 200);
  };

  React.useEffect(() => {
    return () => {
      logoutHandle();
    };
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto my-24">
        <h1 className="flex items-end gap-1 text-slate-600">
          <span className="font-semibold">Logout - Please Wait</span>
          <div className="flex items-end gap-1">
            <span className="animate-pulse text-xl">.</span>
            <span className="animate-pulse opacity-0 text-2xl">.</span>
            <span className="animate-pulse opacity-0 text-3xl">.</span>
          </div>
        </h1>
      </div>
    </>
  );
}
