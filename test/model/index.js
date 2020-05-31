import enhanceRedux from "../../lib/enhance";
import common from "./common";
import list from "./list";
// import { createLogger } from "redux-logger";

const modals = [common, list];

export const { store, reducers, register, unRegister } = enhanceRedux(modals, {
  // enhancer: [createLogger()],
});
