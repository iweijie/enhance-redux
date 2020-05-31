const enhanceRedux = require("../lib/index").default;
const common = require("./model/common").default;
const list = require("./model/list").default;

describe("基础配置测试", function () {
  test("获取model的默认值", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    const state = getState();
    expect(state.common.userInfo).toEqual({
      name: "default",
    });
  });

  test("model -- effect --  设置用户名", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    return reducers.common
      .login({
        name: "testName",
      })
      .then((data) => {
        const state = getState();
        expect(state.common.userInfo).toEqual({
          name: "testName",
        });
      });
  });

  test("model -- effect --  测试返回值", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    return reducers.common
      .login({
        name: "testName",
      })
      .then((data) => {
        expect(data).toEqual({
          name: "testName",
        });
      });
  });

  test("model -- reducers --  修改version", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    const data = reducers.common.handleChangeVersion("0.0.2");
    const state = getState();
    expect(state.common.version).toBe("0.0.2");
  });

  test("model -- reducers --  测试返回值", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    const data = reducers.common.handleChangeUserInfo({
      name: "testName",
    });

    expect(data).toEqual({
      version: "0.0.1",
      userInfo: { name: "testName" },
      like: "",
      hobby: "",
    });
  });

  test("model -- dispatch --  redux-dispatch", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;

    dispatch({
      type: "common/hobby",
      payload: "jie",
    });

    const state = getState();

    expect(state.common.hobby).toBe("jie");
  });

  test("model -- dispatch --  其他方法", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;

    const data = dispatch({ test: true });

    expect(data).toEqual({ test: true });
  });
});
