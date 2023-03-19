import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
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
import { getUser } from "./store/hhtp";
import { useSelector } from "react-redux";

const App = () => {
  const { go } = useContext(GlobalContext);
  const d = useRef();

  const { path, appearance, Appearance } = useContext(GlobalContext);
  const [fetchedUser, User] = useState(null);
  const notes = useSelector(state => state.notes.notes)

  const VKBridgeSubscribeHandler = ({ detail: { type, data } }) => {
    if (type === "VKWebAppUpdateConfig") {
      console.log(data);
      Appearance(data.appearance);
    }
  };

  let isExist = false;



  useEffect(() => {
    bridge.subscribe(VKBridgeSubscribeHandler);
    bridge.send("VKWebAppGetUserInfo").then((data) => {
      getUser().then((res) => {
        res.map((user) => {
          if (user.lastName === data.last_name && user.is_vk_auth) {
            isExist = true;
            return;
          }
        });
      });
    });
    if (!isExist) {
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
    }
    return () => bridge.unsubscribe(VKBridgeSubscribeHandler);
  }, []);

  /* function checkEvents(events) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const matchingEvent = events.find(event => event.time === currentTime);

    if (matchingEvent) {
      const notification = {
        message: `Время настало для "${matchingEvent.title}"!`,
        silent: false
      };

      bridge.send("VKWebAppTapticNotificationOccurred", { "type": "success" });
      bridge.send("VKWebAppSendNotification", notification);
    }

    const interval = 1000 * 60 * 1; // 5 минут в миллисекундах
    setTimeout(() => checkEvents(events), interval);
  }

  checkEvents(notes); */



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
                  <Shredule id="shredule" fetchedUser={fetchedUser} />
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
