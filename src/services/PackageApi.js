import axios from "axios";

const axiosClientPackages = axios.create({
  baseURL: "http://localhost:8084/api/packages",
});

const packageApi = {
  getPopularPackages() {
    return axiosClientPackages.get("/popular");
  },

  getAllPackages() {
    return axiosClientPackages.get("");
  },
};

export default packageApi;
