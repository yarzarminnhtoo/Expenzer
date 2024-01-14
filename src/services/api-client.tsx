import axios, { CanceledError } from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwtToken");
export default axios.create({
  baseURL: "http://localhost:2000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { CanceledError };
