import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  Placeholder,
} from "@vkontakte/vkui";

import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";

const Auth = ({ id, fetchedUser }) => {
  const { go } = useContext(GlobalContext);

  return (
    <Panel id={id}>
      <div>
        <Div style={{ margin: '0 auto', width: '50vw' }}>
          <PanelHeader
            style={{ margin: "-10px 0" }}
          >
            EDU.vk
          </PanelHeader>
          <div
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f24973 0%, #3948e6 100%)",
              height: 300,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <div style={{ width: "100%", marginBottom: -20 }}>

              <Group
                header={<Header mode="primary">Выберите свою должность</Header>}
              >
                <Div>
                  <Button
                    stretched
                    size="l"
                    mode="primary"
                    onClick={() => go("shredule")}
                  >
                    Студент
                  </Button>
                </Div>
                <Div>
                  <Button
                    stretched
                    size="l"
                    mode="primary"
                    onClick={() => go("shredule")}
                  >
                    Преподаватель
                  </Button>
                </Div>
                <Div>
                  <Button
                    stretched
                    size="l"
                    mode="secondary"
                    onClick={() => go("signin")}
                  >
                    Вернуться на главную
                  </Button>
                </Div>
              </Group>
            </div>
          </div>
        </Div>
      </div>
    </Panel>
  );
};

export default Auth;

