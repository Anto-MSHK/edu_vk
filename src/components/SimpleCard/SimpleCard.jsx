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
            <div style={{ display: "flex", alignItems: "center", textAlign: 'center' }}>
              {user && (
                  <SimpleCell
                      before={
                        user.photo_200 ? <Avatar src={user.photo_200}/> : null
                      }
                      subtitle={user.desc}
                  >
                    {user.name}
                  </SimpleCell>
              )}
              <Title
                level="1"
                marginHeight={10}
                style={{ marginRight: 15 }}
                weight={"1"}
              >
                {title}
              </Title>
              <Counter
                  mode="prominent"
                  marginHeight={10}
                  style={{ padding: 2, marginRight: 10 }}
              >
                <Title level="4">{tag}</Title>
              </Counter>
            </div>
            <Button size="s" style={{height: '50%'}}>Прочитано</Button>
          </div>
        </Tappable>
      </Card>
    </Group>
  );
};
