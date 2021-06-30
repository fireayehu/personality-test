import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];
if (process.env.NODE_ENV == "development") {
  middlewares.push(logger);
}
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
sagaMiddleware.run(rootSaga);

export default store;
