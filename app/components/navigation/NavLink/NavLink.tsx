import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { NavLink as RouterNavLink, type NavLinkProps } from "react-router";

export const NavLink = ({
  prefetch,
  title,
  to,
  Icon,
}: {
  prefetch?: NavLinkProps["prefetch"];
  title: string;
  to: NavLinkProps["to"];
  Icon?: Icon;
}) => (
  <RouterNavLink
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
  </RouterNavLink>
);
