import { Flex } from "@radix-ui/themes/components/flex";
import { PlusSquareIcon } from "@phosphor-icons/react/dist/ssr/PlusSquare";
import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr/TrendUp";
import { StickerIcon } from "@phosphor-icons/react/dist/ssr/Sticker";
import { GearIcon } from "@phosphor-icons/react/dist/ssr/Gear";
import type { NavLinkProps } from "react-router";
import { NavLink } from "./navigation/NavLink/NavLink";

const routes = [
  {
    Icon: PlusSquareIcon,
    title: "Dashboard",
    to: "/dashboard",
    prefetch: "viewport" as NavLinkProps["prefetch"],
  },
  { Icon: TrendUpIcon, title: "Portfolio", to: "/portfolio" },
  { Icon: StickerIcon, title: "Market", to: "/market" },
  { Icon: GearIcon, title: "Settings", to: "/settings" },
];

export default function NavSidebar() {
  return (
    <Flex className="bg-gray-800 w-64 p-6 space-y-4" asChild direction="column">
      <nav>
        {routes.map((route) => (
          <NavLink key={route.to} {...route} />
        ))}
      </nav>
    </Flex>
  );
}
