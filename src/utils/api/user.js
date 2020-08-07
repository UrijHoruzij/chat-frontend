import { axios } from "../../core";

export default {
  signIn: (postData) => axios.post("/user/signin", postData),
  signUp: (postData) => axios.post("/user/signup", postData),
  refresh: (postData) => axios.post("/user/refresh", postData),
  logout: (postData) => axios.post("/user/logout", postData),
  getMe: () => axios.get("/user/me"),
  findUsers: (query) => axios.get("/user/find?email=" + query),
};
