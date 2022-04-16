import axios from "@/config/axios";

class DiscoverService {
  async getPopular(limit = 14) {
    const response = await axios.get(`/api/popular?limit=${limit}`);
    return response.data.results;
  }

  async search(searchTerm) {
    const term = searchTerm.trim();

    if (!term) {
      return;
    }

    const response = await axios.get(`/api/search/?term=${encodeURIComponent(term)}`);

    if (!response.data.results.length) {
      throw new Error("No search results found.");
    } else {
      return response.data.results;
    }
  }

  async subscribe(feedUrl) {
    return axios.post(`/api/subscriptions`, {
      feedUrl,
    });
  }

  async subscribeFromFeed(feedUrl) {
    if (!isURL(feedUrl)) {
      throw new Error("Please enter a valid URL");
    }

    try {
      return await axios.post(`/api/subscriptions`, {
        feedUrl,
      });
    } catch (err) {
      if (err.response?.data?.msg) {
        throw new Error(err.response.data.msg);
      } else {
        throw new Error("Unable to subscribe to that feed");
      }
    }
  }
}

function isURL(str) {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }

  return true;
}

export default new DiscoverService();
