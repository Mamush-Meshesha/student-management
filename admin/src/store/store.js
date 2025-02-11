import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import rootSaga from "./saga/index";
import rootReducer from "./redux/index"; // Import your combined reducer
import authReducer from "./redux/authSlice"; // Import the auth reducer separately

const sagaMiddleware = createSagaMiddleware();

// Define persist config for only "auth"
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"], // Only persist the auth state
};

// Apply persistence to only the "auth" reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth state
    student: rootReducer.student, // Regular student reducer
    course: rootReducer.course, // Regular course reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Create Persistor for storing the auth state
const persistor = persistStore(store);

export { store, persistor };
