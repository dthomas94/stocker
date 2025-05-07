import { Flex } from "@radix-ui/themes/components/flex";
import { NavLink } from "react-router";
import type { IconProps } from "@radix-ui/themes/components/icons";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr/PlusSquare";
import { TrendUp } from "@phosphor-icons/react/dist/ssr/TrendUp";
import { Sticker } from "@phosphor-icons/react/dist/ssr/Sticker";
import { Gear } from "@phosphor-icons/react/dist/ssr/Gear";
import type { NavLinkProps } from "react-router";

const routes = [
  {
    Icon: PlusSquare,
    title: "Dashboard",
    to: "/",
    prefetch: "viewport" as NavLinkProps["prefetch"],
  },
  { Icon: TrendUp, title: "Portfolio", to: "/portfolio" },
  { Icon: Sticker, title: "Market", to: "/market" },
  { Icon: Gear, title: "Settings", to: "/settings" },
];

const StyledNavLink = ({
  prefetch,
  title,
  to,
  Icon,
}: {
  prefetch?: NavLinkProps["prefetch"];
  title: string;
  to: NavLinkProps["to"];
  Icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}) => (
  <NavLink
    className={({ isActive }) =>
      `rounded px-3 py-2 flex gap-x-1 items-center text-gray-300 hover:text-white ${
        isActive ? "bg-gray-700 text-white" : ""
      }`
    }
    to={to}
    prefetch={prefetch}
  >
    {!!Icon && <Icon />}
    {title}
  </NavLink>
);

export default function SidebarLayout() {
  return (
    <Flex className="bg-gray-800 w-64 p-6 space-y-4" asChild direction="column">
      <nav>
        {routes.map((route) => (
          <StyledNavLink key={route.to} {...route} />
        ))}
      </nav>
    </Flex>
  );
}
