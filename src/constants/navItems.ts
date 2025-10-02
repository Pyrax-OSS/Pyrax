import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Products",
    path: "/products",
    icon: ShoppingBagIcon,
  },
];
