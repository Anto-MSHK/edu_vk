import React, { useContext, useEffect, useRef, useState } from "react";
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
  SubnavigationButton,
  PanelHeaderClose,
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
  Icon24Filter,
  Icon24NewsfeedOutline,
  Icon24PictureOutline,
  Icon24ThumbsUpOutline,
  Icon24UsersOutline,
} from "@vkontakte/icons";
import { getUser } from "../store/hhtp";
import NotesComponent from "../components/NotesComponent/NotesComponent";

const Shredule = ({ id, fetchedUser }) => {
  const { data, error, isLoading } = useGetScheduleByNameQuery("bulbasaur");
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    getUser().then((res) => {
      const newRes = res.filter((res) => res.type !== "teacher");
      setAllUsers(newRes);
    });
  }, []);

  const [activePanel, setActivePanel] = useState("today");



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
            <PanelHeaderBack onClick={() => go("signin")} style={{ top: 0 }} />
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
                    src={fetchedUser.photo_200}
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
                  {fetchedUser.first_name} {fetchedUser.last_name}
                </Title>
              </Cell>
            </div>
            <Panel>
              <Group>
                <FormItem id="progresslabel" top="До конца пары 1 час">
                  <Progress aria-labelledby="progresslabel" value={40} />
                </FormItem>
                <Tabs mode={"default"}>
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

                      onClick={() => setSelected("recommendations")}
                    >
                      Уведомления
                    </TabsItem>

                    <Popover
                      action="click"
                      placement="top-end"
                      content={
                        <>
                          <Header mode="secondary">Однокурсники</Header>
                          <div>
                            {allUsers &&
                              allUsers.map((user) => (
                                <SimpleCell
                                  key={user.id}
                                  before={<Avatar />}
                                  subtitle={
                                    <Text>
                                      {user.is_vk_auth ? "авторизован" : ""}
                                    </Text>
                                  }
                                >
                                  {user.firstName} {user.lastName}
                                </SimpleCell>
                              ))}
                          </div>
                        </>
                      }
                    >
                      <TabsItem
                        before={<Icon20UsersOutline />}
                        after={<Icon16Dropdown />}
                        selected={selected === "friends"}
                        disabled={disabled}
                        onClick={() => setSelected("friends")}
                        contextMenu={<div>hello</div>}
                      >
                        Однокурсники
                      </TabsItem>
                    </Popover>
                  </HorizontalScroll>
                </Tabs>
              </Group>
            </Panel>
          </div>
        </div>
      </Div>
      {
        selected === 'groups' ?
          <div>
            {!isLoading &&
              data &&
              data[0].days.map((day) => {
                return <DayCard key={day.count} data={day} />;
              })}
          </div>
          :
          <NotesComponent/>
      }
    </Panel>
  );
};

export default Shredule;
