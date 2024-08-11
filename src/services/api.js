import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

const ApiService = {
  fetchShows: (pageNumber = 1) => {
    return apiClient.get(`/data/page${pageNumber}.json`);
  },
};

export default ApiService;
