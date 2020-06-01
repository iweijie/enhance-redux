const enhanceRedux = require("../lib/index").default;
const common = require("./model/common").default;
const list = require("./model/list").default;

describe("基础配置测试", function () {

  /**    modal   */

  test("设置model；获取设置的默认值", function () {
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

  /**   effect    */

  test("测试 effect call 方法 设置用户名", function () {
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

  
  test("测试 effect getState 方法", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;

    expect(reducers.common.checkGetState('common/getStateValue/value')).toBe('我是值');
  });
  


  /**   reducers    */

  test("model -- reducers --  修改version", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;
    reducers.common.handleChangeVersion("0.0.2");
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

    const data1 = getState()

    expect(data).toBe(data1.common);
  })

  /**   redux--dispatch    */

  test("测试 redux dispatch 方法", function () {
    const { store, reducers, register, unRegister } = enhanceRedux([
      common,
      list,
    ]);
    const { dispatch, getState } = store;

    dispatch({
      type: "common/hobby",
      payload: "weijie",
    });

    const state = getState();

    expect(state.common.hobby).toBe("weijie");
  });

})

