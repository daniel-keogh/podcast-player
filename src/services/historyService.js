import axios from "@/config/axios";

class HistoryService {
  async getHistory() {
    const response = await axios.get("/api/history");
    return response.data.history;
  }

  async getHistoryByPodcastId(podcastId) {
    const response = await axios.get(`/api/history?podcastId=${podcastId}`);
    return response.data.history;
  }

  async addEpisodeToHistory({
    podcastId,
    guid,
    title,
    audioUrl,
    progress = 0,
    isCompleted = false,
    isFavourited = false,
  }) {
    const response = axios.post("/api/history", {
      podcastId,
      guid,
      title,
      audioUrl,
      progress,
      isCompleted: isCompleted + "",
      isFavourited: isFavourited + "",
    });
    return response.data;
  }

  async clearHistory() {
    return axios.delete(`/api/history`);
  }

  async deleteEpisodeFromHistory(episodeId) {
    return axios.delete(`/api/history/${episodeId}`);
  }
}

export default new HistoryService();
