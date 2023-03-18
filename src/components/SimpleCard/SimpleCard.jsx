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

export const SimpleCard = ({ title, tag, day, user }) => {
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
              <Title
                level="1"
                marginHeight={10}
                style={{ marginRight: 15 }}
                weight={"1"}
              >
                {tag}. {title}
              </Title>
            </div>
            <Title style={{color: 'gray', fontSize: 12}}>{day}</Title>
          </div>
        </Tappable>
      </Card>
    </Group>
  );
};
