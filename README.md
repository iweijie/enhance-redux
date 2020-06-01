# enhance-redux

## 安装

```
npm install enhance-redux
```

```
yarn add enhance-redux
```

## model 基本结构

```javascript
/** common model  */
{
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
    async changeVersion({ call, push, getState, state, rootState }, payload) {
      let version = await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, payload);
      });
      call("common/handleChangeVersion", version);
      return version;
    },
  },
};

```

## 使用

```javascript
import enhanceRedux form 'enhance-redux';
import common form "./common";

const { store, reducers, register, unRegister } = enhanceRedux([common]);

```

### store

redux 的返回值

### reducers

1. 包装后的 model 函数集合（reducers，effects）
2. 同一模块的 effects 与 reducers 的同名函数； effects 会覆盖 reducers
3. 使用方式 ：

```
1. 直接使用

reducers.common.changeVersion("0.0.2");

2. 结合 react-redux 使用

import { connect } from "react-redux";

const App = (props)=> {
    const {version, changeVersion} = props;
    useEffact(()=>{
        changeVersion()
    },[])
    return <div>{version}</div>
}

const mapStateToProps = (state, own) => {
  return {
    version: state.common.version,
  };
};
/**  两种方式都可以  */
const mapDispatchToProps = ()=>{
    return {
        changeVersion: reducers.common.changeVersion
    }
}  ||  {
    ...reducers.common
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

### register

用于注册 model，需要自己做容错处理

### unRegister

用于移除 model，需要自己做容错处理

## Effects 参数

|   属性    |   类型   |                 使用                 |                         描述                         |
| :-------: | :------: | :----------------------------------: | :--------------------------------------------------: |
|   call    | function | call("common/changeVersion",payload) |  可任意调用 model 里的注册的 effects，reducers 方法  |
|   push    | function |    push("common/version",payload)    |             可任意修改 model 的 state 值             |
| getState  | function |               表单名称               |            表单全局配置项 （详情见下方）             |
|   state   |  object  |               表单名称               | 当前模块的 state（当前函数调用时获取的值，非实时的） |
| rootState |  object  |               表单名称               |   全局的 state（当前函数调用时获取的值，非实时的）   |
