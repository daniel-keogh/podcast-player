import type { UnionValues } from "@/types";

const Routes = {
  auth: "/auth",
  login: "/auth/login",
  register: "/auth/register",
  subscriptions: "/subscriptions",
  discover: "/discover",
  profile: "/profile",
  history: "/history",
  favourites: "/favourites",
  podcast: "/podcast",
} as const;

export type Route = UnionValues<typeof Routes>;

export default Routes;
