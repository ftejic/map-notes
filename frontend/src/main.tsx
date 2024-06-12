import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import store from "@/redux/store.ts";
import {Provider as ReduxProvider} from "react-redux";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
                <App/>
        </ReduxProvider>
    </React.StrictMode>);
