import React from "react";
import {
  Avatar,
  Button,
  Cell,
  Gradient,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderClose,
  Title,
} from "@vkontakte/vkui";
import { SkeletonAvatar, SkeletonText } from "./Skeleton";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context";
export const ExistUser = ({ fetchedUser }) => {
  const { go } = useContext(GlobalContext);
  const d = useRef();
  return (
    <div
      style={{
        maxWidth: 600,
        width: "100%",
        marginInline: "auto",
        marginTop: 20,
      }}
    >
      <div
        ref={d}
        style={{
          textAlign: "center",
        }}
      >
        <Gradient
          mode="tint"
          style={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 32,
          }}
        >
          <Header mode="secondary">
            {fetchedUser
              ? "Вы студент из группы ВИС-21"
              : "Загружаем данные ..."}
          </Header>

          {((user) => {
            const userExists = !!user;
            if (userExists)
              return (
                <>
                  <Avatar
                    size={96}
                    src={user.photo_200}
                    onClick={() => window.open(`https://vk.com/id${user.id}`)}
                  />
                  <Title
                    style={{ marginBottom: 8, marginTop: 20 }}
                    level="2"
                    weight="2"
                  >
                    {user?.first_name + " " + user?.last_name}
                  </Title>

                  <Button size="l" mode="primary" onClick={() => go("home")}>
                    Да, это я!
                  </Button>
                </>
              );
            else
              return (
                <Cell
                  disabled={true}
                  before={<SkeletonAvatar />}
                  subtitle={<SkeletonText style={{ height: 20, width: 140 }} />}
                >
                  <SkeletonText style={{ height: 20, width: 60 }} />
                  &nbsp; <SkeletonText style={{ height: 20, width: 100 }} />
                </Cell>
              );
          })(fetchedUser)}
        </Gradient>
        <Button
          mode="link"
          size="m"
          onClick={() => {
            go("auth");
          }}
        >
          Не хочу входить под своим именем
        </Button>
      </div>
    </div>
  );
};
