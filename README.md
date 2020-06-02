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

|   属性    |       类型       | 是否必填 |           描述           |
| :-------: | :--------------: | :------: | :----------------------: |
| namespace |      string      |    是    |         命名空间         |
|   state   |      object      |    否    |     当前模块的初始值     |
| reducers  | object(function) |    否    | 适用于同步更新当前 state |
|  effects  | object(function) |    否    | 适用于异步更新当前 state |

## 使用

```javascript
/** store.js */

import enhanceRedux form 'enhance-redux';
import common form "./common";

/**
 * model 集合
*/
const models = [common];

/**
 * enhancer : redux 插件；
 * reducer ：自定义 reducer 处理方法函数
 * separator：字段分隔符，默认 "/"
*/

const option = {
  // enhancer = [],
  // reducer,
  // separator
}

const { store, reducers, register, unRegister } = enhanceRedux(, option);

```

```javascript
/** store.js */

import enhanceRedux form 'enhance-redux';
import common form "./common";

const { store, reducers, register, unRegister } = enhanceRedux([common]);

```

```javascript
/** main.js */
import React form 'react';
import common form "./store";
import App form "./App";

<Provider store={store}>
  <App />
</Provider>

```

```javascript
/** App.js  结合 react-redux 使用 */
import React, { useEffact } form 'react';
import { reducers } form "./store"
import { connect } from "react-redux";

const App = (props)=> {
    const {version, changeVersion} = props;
    useEffact(()=>{
        changeVersion('0.0.2')
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

## enhanceRedux 返回值

### store

redux 的返回值

### reducers

1. 包装后的 model 函数集合（reducers，effects）
2. 同一模块的 effects 与 reducers 的同名函数； effects 会覆盖 reducers
3. 使用方式可 结合 react-redux 使用，也可以直接调用；例如： reducers.common.changeVersion('0.0.2')
4. model 中的 reducers 的返回值会用于直接修改当前 state 的值
5. model 中的 effects 可以结合注入的方法，去修改 当前 state 的值，具体可以查看下面 effect 方法第一个参数列表

### register

用于注册 model，需要自己做容错处理

### unRegister

用于移除 model，需要自己做容错处理

## model effect 方法第一个参数

|   属性    |   类型   |                 使用                 |                           描述                           |
| :-------: | :------: | :----------------------------------: | :------------------------------------------------------: |
|   call    | function | call("common/changeVersion",payload) |    可任意调用 model 里的注册的 effects，reducers 方法    |
|   push    | function |    push("common/version",payload)    |               可任意修改 model 的 state 值               |
| getState  | function |      getState("common/version")      | 获取最新的 state 的值； 可传入路径参数用于获取某一特定值 |
|   state   |  object  |                  --                  |   当前模块的 state（当前函数调用时获取的值，非实时的）   |
| rootState |  object  |                  --                  |     全局的 state（当前函数调用时获取的值，非实时的）     |

## model reducer 方法第一个参数

|   属性    |  类型  | 使用 |                         描述                         |
| :-------: | :----: | :--: | :--------------------------------------------------: |
|   state   | object |  --  | 当前模块的 state（当前函数调用时获取的值，非实时的） |
| rootState | object |  --  |   全局的 state（当前函数调用时获取的值，非实时的）   |

## TODO

1. [ ] redux 中间件测试
