import { init as SentryInit } from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { shouldDebug, isProd } from "@/utils/debug";

const init = () => {
  SentryInit({
    debug: shouldDebug("SENTRY"),
    denyUrls: ["localhost"],
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [new BrowserTracing()],
    release: "podcast-player@0.1.0",
    tracesSampleRate: isProd ? 0.2 : 0.0,
  });
};

export default {
  init,
};
