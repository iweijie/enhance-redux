module.exports = {
  namespace: "common",
  state: {
    version: "0.0.1",
  },
  reducers: {
    handleChangeVersion({ state, rootState }, payload) {
      return {
        ...state,
        version: payload,
      };
    },
  },
  effects: {
    async test({ call, push, getState, state, rootState }, payload) {
      let version = await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, payload);
      });
      call("common/handleChangeVersion", version);
      return version;
    },
  },
};
