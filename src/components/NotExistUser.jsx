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
  Spinner,
  Text,
  Title,
} from "@vkontakte/vkui";
import { SkeletonAvatar, SkeletonText } from "./Skeleton";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context";
import { getUser } from "../store/hhtp";
export const NotExistUser = ({ fetchedUser, userId }) => {
  const { go } = useContext(GlobalContext);
  const d = useRef();
  const [isNameExist, setIsNameExist] = useState(null);

  useEffect(() => {
    if (fetchedUser !== null)
      if (fetchedUser.last_name) {
        getUser().then((res) => {
          res.map((user) => {
            if (user.lastName === fetchedUser.last_name) {
              setIsNameExist(true);
              return;
            }
          });
        });
      } else {
        setIsNameExist(false);
      }
  }, []);

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
          {isNameExist === null ? (
            <Spinner size="large" style={{ margin: "20px 0" }} />
          ) : isNameExist ? (
            <>
              <Text mode="secondary" style={{ marginBottom: 15, fontSize: 14 }}>
                {fetchedUser.phone_number
                  ? "Вашего номера нет в базе данных, но найдена запись совпадающая с вашей фамилией."
                  : "Вы не предоставили номер телефона, но найдена запись совпадающая с вашей фамилией."}
              </Text>
              <>
                <Avatar
                  size={96}
                  src={fetchedUser.photo_200}
                  onClick={() =>
                    window.open(`https://vk.com/id${fetchedUser.id}`)
                  }
                />
                <Title
                  style={{ marginBottom: 8, marginTop: 20 }}
                  level="2"
                  weight="2"
                >
                  {fetchedUser?.first_name + " " + fetchedUser?.last_name}
                </Title>

                <Button
                  size="l"
                  mode="primary"
                  onClick={() => {
                    setActiveUser(userId);
                    go("shredule");
                  }}
                >
                  Да, это я!
                </Button>
              </>
            </>
          ) : (
            <>
              <Header mode="secondary">
                Мы не смогли найти о вас информацию, чтобы облегчить вам вход :(
              </Header>
              <>
                <Button size="l" mode="primary" onClick={() => go("home")}>
                  Я студент
                </Button>
                <Button size="l" mode="primary" onClick={() => go("home")}>
                  Я преподаватель
                </Button>
              </>
            </>
          )}
        </Gradient>
      </div>
    </div>
  );
};
