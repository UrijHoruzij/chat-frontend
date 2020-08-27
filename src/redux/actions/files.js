import { filesApi } from "../../utils/api";

const Actions = {
  setFiles: (shared) => ({
    type: "FILES:SET_ITEMS",
    payload: shared,
  }),
  fetchFiles: () => (dispatch) => {
    filesApi.get.then(({ data }) => {
      dispatch(Actions.setFiles(data));
    });
  },
};

export default Actions;
