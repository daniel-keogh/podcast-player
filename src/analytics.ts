import { Metric } from "web-vitals";
import { shouldDebug } from "@/utils/debug";

export const sendToAnalytics = (metric: Metric) => {
  if (shouldDebug("WEB_VITALS")) {
    console.log(metric);
  }
};
