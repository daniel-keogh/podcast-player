import axios from "@/config/axios";

import type { Episode, Episodes, Subscription, Subscriptions } from "@/types/api/subscriptions";
import type { Podcast } from "@/types/api/podcast";
import { apiErrorHandler } from "@/utils/apiUtils";

class SubscriptionsService {
  async getSubscriptions(): Promise<Array<Subscription>> {
    const response = await axios.get<Subscriptions>("/api/subscriptions");

    if (response.status !== 200 || response.data.subscriptions.length === 0) {
      throw new Error("No subscriptions");
    }

    return response.data.subscriptions.sort((a, b) => a.title.localeCompare(b.title));
  }

  async getSubscriptionById(id: string, limit: number): Promise<Podcast> {
    try {
      const response = await axios.get<Podcast>(`/api/subscriptions/${id}?limit=${limit}`);
      return response.data;
    } catch (err) {
      throw new Error(apiErrorHandler(err));
    }
  }

  async getEpisodes(subscriptionId: string): Promise<Episodes> {
    try {
      const response = await axios.get<Episodes>(`/api/subscriptions/${subscriptionId}/episodes`);
      return response.data;
    } catch (err) {
      throw new Error(apiErrorHandler(err));
    }
  }

  async getEpisodeByGuid(subscriptionId: string, guid: string): Promise<{ episode: Episode }> {
    try {
      const response = await axios.get<{ episode: Episode }>(
        `/api/subscriptions/${subscriptionId}/episodes/${encodeURIComponent(guid)}`
      );
      return response.data;
    } catch (err) {
      throw new Error(apiErrorHandler(err));
    }
  }

  async addSubscription(feedUrl: string): Promise<Subscription> {
    try {
      const response = await axios.post<{ result: Subscription }>(`/api/subscriptions`, {
        feedUrl,
      });
      return response.data.result;
    } catch (err) {
      throw new Error(apiErrorHandler(err));
    }
  }

  async removeSubscription(id: string): Promise<void> {
    try {
      await axios.delete<void>(`/api/subscriptions/${id}`);
    } catch (err) {
      throw new Error(apiErrorHandler(err));
    }
  }
}

export default new SubscriptionsService();
