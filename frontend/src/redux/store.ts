import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import placesReducer from "@/redux/placesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        places: placesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;