import React, { useState, useEffect, createContext, useContext } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import { GlobalContext, GetRoutes } from "./context";

import "@vkontakte/vkui/dist/vkui.css";
import Home from "./panels/Home";
import SignIn from "./panels/SignIn";
import Shredule from "./panels/Shredule";

const Gioconda = React.lazy(() => import("./panels/Gioconda"));
const Error = React.lazy(() => import("./panels/Error"));
const Auth = React.lazy(() => import("./panels/Auth.jsx"));
import { blob } from "./photo";

const App = () => {
  const { path, appearance, Appearance } = useContext(GlobalContext);
  const [fetchedUser, User] = useState(null);

  const VKBridgeSubscribeHandler = ({ detail: { type, data } }) => {
    if (type === "VKWebAppUpdateConfig") {
      console.log(data);
      Appearance(data.appearance);
    }
  };

  useEffect(() => {
    bridge.subscribe(VKBridgeSubscribeHandler);
    bridge
      .send("VKWebAppShowSlidesSheet", {
        slides: [
          {
            media: {
              blob: blob,
              type: "image",
            },
            title: "Вы увидете расписание через одно мгновение!",
            subtitle:
              "Просто предоставьте мне ваш номер телефона, и я сразу найду вашу группу и уведомления!",
          },
        ],
      })
      .then((data) => {
        if (data.result) {
          bridge.send("VKWebAppGetUserInfo").then((res) => {
            bridge
              .send("VKWebAppGetPhoneNumber")
              .then((dataPhone) => {
                User({ ...res, ...dataPhone });
              })
              .catch((error) => {
                User({ ...res });
              });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => bridge.unsubscribe(VKBridgeSubscribeHandler);
  }, []);

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <GetRoutes index="signin" fallback="404">
                <View id="signin" activePanel={path}>
                  <SignIn id="signin" fetchedUser={fetchedUser} />
                  <Home id="home" fetchedUser={fetchedUser} />
                  <Gioconda id="gioconda" />
                  <Error id="404" />
                  <Auth id="auth" fetchedUser={fetchedUser} />
                  <Shredule id="shredule" />
                </View>
              </GetRoutes>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
