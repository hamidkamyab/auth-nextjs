import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="bg-slate-800 sticky top-0 w-full py-4">
      <div className="max-w-7xl mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-1.5 px-2 hover:text-stone-800 transition-all duration-200 font-medium me-1.5">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-1.5 px-2 hover:text-stone-800 transition-all duration-200 font-medium me-1.5">
                  Register
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-1.5 px-2 hover:text-stone-800 transition-all duration-200 font-medium me-1.5">
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-white hover:bg-stone-100 rounded-md py-1.5 px-2 hover:text-stone-800 transition-all duration-200 font-medium me-1.5">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
