import axios from "axios";

const apiClient = axios.create({
  //baseURL: "http://localhost:4000/api",
  baseURL: "https://api.english-self.online/api",
});
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // handle unauthorized
      console.error("Unauthorized access - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
