import React from "react";
import ReactDOM from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { GlobalProvider } from "./context"
import { Provider } from "react-redux";
import store from "./store/store";

bridge.send("VKWebAppInit");

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider children={
    <Provider store={store}>
      <App />
    </Provider>
  } />
);

if (process.env.NODE_ENV === "development") {
  import("./eruda");
}
