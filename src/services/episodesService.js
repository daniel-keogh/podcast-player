import axios from "@/config/axios";

class EpisodesService {
  async getEpisode(id) {
    const response = axios.get(`/api/episodes/${id}`);
    return response.data;
  }

  async addEpisode({ subscriptionId, episodeUuid, episodeTitle, podcastTitle, duration }) {
    const response = axios.post("/api/episodes", {
      subscriptionId,
      episodeUuid,
      episodeTitle,
      podcastTitle,
      duration,
    });
    return response.data;
  }
}

export default new EpisodesService();
