export type Key = "SENTRY" | "WEB_VITALS";

export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";
export const isTest = process.env.NODE_ENV === "test";

export const shouldDebug = (key: Key) => {
  return localStorage.getItem(`DEBUG_${key}`) === "true";
};
