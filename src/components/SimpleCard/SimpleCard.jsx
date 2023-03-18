import {
  Avatar,
  Button,
  Card,
  CardGrid,
  Counter,
  Group,
  SimpleCell,
  Tappable,
  Text,
  Title,
} from "@vkontakte/vkui";
import React from "react";

export const SimpleCard = ({ title, tag, btnText, user }) => {
  return (
    <Group mode="plain">
      <Card mode="shadow">
        <Tappable>
          <div
            style={{
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Counter
                mode="prominent"
                marginHeight={10}
                style={{ padding: 2, marginRight: 10 }}
              >
                <Title level="4">{tag}</Title>
              </Counter>
              <Title
                level="1"
                marginHeight={10}
                style={{ marginRight: 15 }}
                weight={"1"}
              >
                {title}
              </Title>
              {user && (
                <SimpleCell
                  before={
                    <Avatar
                      size={35}
                      src="#"
                      initials="??"
                      gradientColor="blue"
                    />
                  }
                  subtitle={user.desc}
                >
                  {user.name}
                </SimpleCell>
              )}
            </div>
            {btnText && <Button size="l">{btnText}</Button>}
          </div>
        </Tappable>
      </Card>
    </Group>
  );
};
