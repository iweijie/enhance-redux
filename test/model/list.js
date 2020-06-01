module.exports = {
  namespace: "list",
  state: {
    list: [],
  },
  reducers: {
    setList({ state }, payload) {
      return {
        list: payload,
      };
    },
  },
  effects: {},
};
