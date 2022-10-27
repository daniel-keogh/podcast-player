const Routes = {
  auth: "/auth",
  login: "/auth/login",
  register: "/auth/register",
  subscriptions: "/subscriptions",
  discover: "/discover",
  profile: "/profile",
  podcast: "/podcast",
  rateLimit: "/rate_limit",
} as const;

export type Route = typeof Routes[keyof typeof Routes];

export default Routes;
