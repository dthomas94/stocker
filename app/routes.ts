import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layouts/default.tsx", [route("/", "routes/dashboard.tsx")]),
] satisfies RouteConfig;
