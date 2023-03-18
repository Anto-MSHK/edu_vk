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

export const SimpleCard = ({ title, tag, day, onClick }) => {
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
                    style={{ marginRight: 15, fontWeight: 'bold' }}
                    weight={"1"}
                >
                  {tag}. {title}
                </Title>
              </div>
              <Title style={{color: 'gray', fontSize: 12}}>{day}</Title>
            </div>
          </Tappable>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginTop: 15 }}>
            <div style={{ color: "#909499", fontWeight: 'bold' }}>
            <Button style={{margin: 5}} size="m" mode="secondary" onClick={onClick}>
              Подробнее
            </Button>
            </div>
          </div>
        </Card>
      </Group>
  );
};

