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
  Counter,
  Title,
  Link,
  usePlatform,
  useAdaptivityConditionalRender,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderButton,
} from "@vkontakte/vkui";

import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";
import { SimpleCard } from "../components/SimpleCard/SimpleCard.jsx";
import { Icon24Dismiss } from "@vkontakte/icons";

const mockChanges = [
  {
    title: "Пары нет",
    day: "19 марта",
    tag: "4",
  },
  {
    title: "Замена",
    day: "31 марта",
    tag: "3",
  },
  {
    title: "Пары нет",
    day: "25 марта",
    tag: "1",
  },
  {
    title: "Пары нет",
    day: "23 марта",
    tag: "1",
  },
];

const Home = ({ id, fetchedUser }) => {
  const { go } = useContext(GlobalContext);
  const d = useRef();
  const handleCardClick = () => {
    go("shredule");
  };

  const sortedChanges = mockChanges.sort((a, b) => {
    if (a.day < b.day) {
      return -1;
    } else if (a.day > b.day) {
      return 1;
    } else {
      if (a.tag < b.tag) {
        return -1;
      } else if (a.tag > b.tag) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  useEffect(() => {
    if (fetchedUser) return () => {};
    const t = setTimeout(() => {
      ReactDOM.createRoot(d.current).render(
        <Placeholder
          action={<Div>Произошла ошибка</Div>}
          stretched
        ></Placeholder>
      );
    }, 4000);
    return () => clearTimeout(t);
  }, [fetchedUser]);

  return (
    <Panel id={id}>
      <PanelHeader>EDU.vk</PanelHeader>
      <div />
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          marginInline: "auto",
          marginTop: 20,
        }}
      >
        <div ref={d}>
          <Group
            header={
              <Header mode="secondary">{fetchedUser ? "Студент" : null}</Header>
            }
          >
            {((user) => {
              const userExists = !!user;
              if (userExists)
                return (
                  <>
                    {" "}
                    <Cell
                      before={
                        user.photo_200 ? <Avatar src={user.photo_200} /> : null
                      }
                      onClick={() => window.open(`https://vk.com/id${user.id}`)}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 10,
                        }}
                      >
                        {user?.first_name + " " + user?.last_name}
                      </div>
                    </Cell>
                    <div style={{ padding: 10 }}>
                      <Button
                        stretched
                        size="l"
                        mode="primary"
                        onClick={() => go("shredule")}
                      >
                        Открыть расписание
                      </Button>
                    </div>
                    <Group
                      style={{ padding: 10 }}
                      header={
                        <Header
                          mode="secondary"
                          style={{ display: "flex", flexDirection: "row" }}
                          indicator={
                            <Counter size="s" mode="prominent">
                              {mockChanges.length}
                            </Counter>
                          }
                        >
                          Замены
                        </Header>
                      }
                    >
                      <Div>
                        {sortedChanges &&
                          sortedChanges.map((el) => {
                            return (
                              <SimpleCard
                                key={1}
                                title={el.title}
                                tag={el.tag}
                                day={el.day}
                                onClick={() => go("shredule")}
                              />
                            );
                          })}
                      </Div>
                    </Group>
                  </>
                );
              else
                return (
                  <Cell
                    disabled={true}
                    before={<SkeletonAvatar />}
                    subtitle={
                      <SkeletonText style={{ height: 20, width: 140 }} />
                    }
                  >
                    <SkeletonText style={{ height: 20, width: 60 }} />
                    &nbsp; <SkeletonText style={{ height: 20, width: 100 }} />
                  </Cell>
                );
            })(fetchedUser)}
          </Group>
        </div>
      </div>
    </Panel>
  );
};

export default Home;
