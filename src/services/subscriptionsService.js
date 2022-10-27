import axios from "@/config/axios";

class SubscriptionsService {
  async getSubscriptions() {
    const response = await axios.get(`/api/subscriptions`);

    if (response.status !== 200 || response.data.subscriptions.length === 0) {
      throw new Error("No subscriptions");
    }

    return response.data.subscriptions.sort((a, b) => a.title - b.title);
  }

  async getSubscriptionById(id, limit) {
    try {
      const response = await axios.get(`/api/subscriptions/${id}?limit=${limit}`);
      return response.data;
    } catch (err) {
      return genericErrorHandler(err);
    }
  }

  async getEpisodes(subscriptionId) {
    try {
      const response = await axios.get(`/api/subscriptions/${subscriptionId}/episodes`);
      return response.data;
    } catch (err) {
      return genericErrorHandler(err);
    }
  }

  async getEpisodeByGuid(subscriptionId, guid) {
    try {
      const response = await axios.get(
        `/api/subscriptions/${subscriptionId}/episodes/${encodeURIComponent(guid)}`
      );
      return response.data;
    } catch (err) {
      return genericErrorHandler(err);
    }
  }

  async addSubscription(feedUrl) {
    try {
      const response = await axios.post(`/api/subscriptions`, {
        feedUrl,
      });

      return response.data.result;
    } catch (err) {
      return genericErrorHandler(err);
    }
  }

  async removeSubscription(id) {
    try {
      await axios.delete(`/api/subscriptions/${id}`);
    } catch (err) {
      return genericErrorHandler(err);
    }
  }
}

function genericErrorHandler(err) {
  if (err.response?.data?.msg) {
    return err.response.data.msg;
  } else {
    return "There was a problem with the network";
  }
}

export default new SubscriptionsService();
