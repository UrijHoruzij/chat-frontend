import { axios } from "../../core";

export default {
  delete: (id) => axios.delete("/user", id),
};
