import { Outlet } from "react-router";
import SidebarLayout from "./sidebar";
import { Flex } from "@radix-ui/themes";

export default function DefaultLayout() {
  return (
    <Flex className="min-h-screen">
      <SidebarLayout />
      <Outlet />
    </Flex>
  );
}
