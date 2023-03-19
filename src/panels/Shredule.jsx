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
  PanelHeaderBack,
  UsersStack,
  FormItem,
  Progress,
  Checkbox,
  CustomSelect,
  TabsItem,
  Counter,
  Badge,
  HorizontalScroll,
  Tabs,
  SimpleCell,
  Title,
  Text,
} from "@vkontakte/vkui";

import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";
import { LessonCard } from "../components/LessonCard/LessonCard.jsx";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover.js";
import { useGetScheduleByNameQuery } from "../store/services/scheduleService";
import { DayCard } from "../components/DayCard/DayCard";
import {
  Icon16Dropdown,
  Icon20NewsfeedOutline,
  Icon20PictureOutline,
  Icon20ThumbsUpOutline,
  Icon20UsersOutline,
  Icon24NewsfeedOutline,
  Icon24PictureOutline,
  Icon24ThumbsUpOutline,
  Icon24UsersOutline,
} from "@vkontakte/icons";

const Shredule = ({ id }) => {
  const { data, error, isLoading } = useGetScheduleByNameQuery("bulbasaur");

  const buttons = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const { go } = useContext(GlobalContext);

  const [selected, setSelected] = React.useState("news");
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Panel
      id={id}
      style={{
        maxWidth: 800,
        width: "100%",
        marginInline: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Div style={{ margin: "20px -10px 0 -10px" }}>
        <PanelHeader
          style={{ margin: "-10px 0" }}
          before={
            <PanelHeaderBack onClick={() => go("home")} style={{ top: 0 }} />
          }
        >
          Главная
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Cell
                style={{ color: "white", padding: 20 }}
                subtitle={
                  <Text style={{ color: "white", marginTop: 2 }}>
                    Факультет высшего образования
                  </Text>
                }
              >
                <Title high={1} style={{ color: "white", fontSize: 26 }}>
                  Группа ВИС-21
                </Title>
              </Cell>
              <Cell
                before={
                  <Avatar
                    size={35}
                    src="#"
                    initials="??"
                    gradientColor="blue"
                    style={{ margin: "10px 10px 0 0" }}
                  />
                }
                style={{ color: "white", padding: 20 }}
                subtitle={
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      margin: "-6px 0 0 0",
                    }}
                  >
                    авторизован
                  </Text>
                }
              >
                <Title
                  style={{
                    color: "white",
                    fontSize: 18,
                    margin: "6px 0 0 0",
                  }}
                >
                  Антон Мащенко
                </Title>
              </Cell>
            </div>
            <Panel>
              <Group>
                <FormItem id="progresslabel" top="До конца пары 1 час">
                  <Progress aria-labelledby="progresslabel" value={40} />
                </FormItem>
                <Tabs mode={"accent"}>
                  <HorizontalScroll arrowSize="m">
                    <TabsItem
                      before={<Icon20NewsfeedOutline />}
                      after={<Icon16Dropdown />}
                      selected={selected === "groups"}
                      disabled={disabled}
                      onClick={() => setSelected("groups")}
                    >
                      Раписание
                    </TabsItem>
                    <TabsItem
                      before={<Badge mode="prominent" />}
                      after={<Icon16Dropdown />}
                      selected={selected === "recommendations"}
                      disabled={disabled}
                      onClick={() => setSelected("recommendations")}
                    >
                      Уведомления
                    </TabsItem>
                    <TabsItem
                      before={<Icon20UsersOutline />}
                      after={<Icon16Dropdown />}
                      selected={selected === "friends"}
                      disabled={disabled}
                      onClick={() => setSelected("friends")}
                    >
                      Однокурсники
                    </TabsItem>
                  </HorizontalScroll>
                </Tabs>
              </Group>
            </Panel>
          </div>
        </div>
      </Div>

      <div>
        {!isLoading &&
          data &&
          data[0].days.map((day) => {
            return <DayCard key={day.count} data={day} />;
          })}
      </div>
    </Panel>
  );
};

export default Shredule;
