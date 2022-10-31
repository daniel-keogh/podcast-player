import axios, { isAxiosError } from "@/config/axios";

import type { SearchResults, SearchResult } from "@/types/api/discover";
import type { Popular, PopularItem } from "@/types/api/discover";
import type { ApiError } from "@/types/api/errors";
import { isURL } from "@/utils";

class DiscoverService {
  async getPopular(limit = 14): Promise<Array<PopularItem>> {
    const response = await axios.get<Popular>(`/api/popular?limit=${limit}`);
    return response.data.results;
  }

  async search(searchTerm: string): Promise<Array<SearchResult>> {
    const term = searchTerm.trim();

    if (!term) {
      return [];
    }

    const response = await axios.get<SearchResults>(
      `/api/search/?term=${encodeURIComponent(term)}`
    );

    if (!response.data.results.length) {
      throw new Error("No search results found.");
    } else {
      return response.data.results;
    }
  }

  async subscribe(feedUrl: string) {
    return axios.post(`/api/subscriptions`, {
      feedUrl,
    });
  }

  async subscribeFromFeed(feedUrl: string) {
    if (!isURL(feedUrl)) {
      throw new Error("Please enter a valid URL");
    }

    try {
      return await axios.post(`/api/subscriptions`, {
        feedUrl,
      });
    } catch (err) {
      if (isAxiosError<ApiError>(err)) {
        throw new Error(err.response?.data?.msg);
      } else {
        throw new Error("Unable to subscribe to that feed");
      }
    }
  }
}

export default new DiscoverService();
