"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Routes } from "@/router/Routes";
import useAuthStore from "@/store/auth";

export default function Navbar() {
  const { isAuth, isHydrated } = useAuthStore();

  return (
    <div className="bg-slate-800 fixed top-0 w-full py-4 z-30">
      <div className="max-w-7xl mx-auto">
        {isHydrated ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={Routes.home} legacyBehavior passHref>
                  <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-2 px-2.5 hover:text-stone-800 transition-all duration-200 text-sm font-medium me-1.5">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isAuth ? (
                <>
                  <NavigationMenuItem>
                    <Link href={Routes.logout} legacyBehavior passHref>
                      <NavigationMenuLink className="text-white hover:bg-rose-100 rounded-md py-2 px-2.5 hover:text-stone-800 transition-all duration-200 text-sm font-medium me-1.5">
                        Logout
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href={Routes.register} legacyBehavior passHref>
                      <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-2 px-2.5 hover:text-stone-800 transition-all duration-200 text-sm font-medium me-1.5">
                        Register
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href={Routes.login} legacyBehavior passHref>
                      <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-2 px-2.5 hover:text-stone-800 transition-all duration-200 text-sm font-medium me-1.5">
                        Login
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}

              <NavigationMenuItem>
                <Link href={Routes.about} legacyBehavior passHref>
                  <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-2 px-2.5 hover:text-stone-800 transition-all duration-200 text-sm font-medium me-1.5">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <div className="py-3"></div>
        )}
      </div>
    </div>
  );
}
