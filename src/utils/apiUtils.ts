import type { ApiError } from "@/types/api/errors";
import { isAxiosError } from "@/config/axios";

export function apiErrorHandler(err: unknown): string {
  if (isAxiosError<ApiError>(err) && err.response?.data?.msg) {
    return err.response.data.msg;
  } else {
    return "There was a problem with the network";
  }
}
