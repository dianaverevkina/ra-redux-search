
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import searchSlice from "./slice";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(saga)

export default store;
