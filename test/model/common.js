export default {
  namespace: "common",
  state: {
    version: "0.0.1",
    userInfo: {
      name: "default",
    },
    like: "",
    hobby: "",
  },
  reducers: {
    handleChangeUserInfo({ state, rootState }, payload) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    handleChangeVersion({ state, rootState }, payload) {
      return {
        ...state,
        version: payload,
      };
    },
  },
  effects: {
    async login({ call }, payload) {
      let userInfo = await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, payload);
      });
      call("common/handleChangeUserInfo", userInfo);

      return payload;
    },
    async setLike({ push }, payload) {
      push("common/like", payload);
      return payload;
    },
  },
};
