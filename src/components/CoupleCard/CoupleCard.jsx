import React, { useRef, useState, useEffect } from "react";
import {
  ActionSheet,
  ActionSheetDefaultIosCloseItem,
  ActionSheetItem,
  Avatar,
  Button,
  Card,
  CardGrid,
  CellButton,
  Counter,
  Div,
  Group,
  Header,
  IconButton,
  InfoRow,
  Panel,
  Separator,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Tappable,
  Text,
  Title,
  View,
} from "@vkontakte/vkui";
import { Icon16Delete, Icon16MoreVertical } from "@vkontakte/icons";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover";

export const CoupleCard = ({ subject, count, type, teacher, room, time }) => {
  const [shown, setShown] = React.useState(false);
  return (
    <Card mode="shadow">
      <div
        style={{
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Counter
                  mode="primary"
                  marginHeight={10}
                  style={{ padding: 2, marginRight: 10 }}
                >
                  <Title level="4">{count}</Title>
                </Counter>
                <Title
                  level="1"
                  marginHeight={10}
                  style={{ marginRight: 5 }}
                  weight={"1"}
                >
                  {subject}
                </Title>
              </div>
            </div>
            {type && (
              <Title level="3" weight="3" style={{ marginRight: 10 }}>
                ({type})
              </Title>
            )}
          </div>

          <Popover
            action="click"
            shown={shown}
            onShownChange={setShown}
            content={
              <div style={{ padding: 10 }}>
                <SimpleCell style={{ marginBottom: 5 }}>
                  <InfoRow>Поставить напоминание</InfoRow>
                </SimpleCell>
                <SimpleCell style={{ marginBottom: 5 }}>
                  <InfoRow>Отметить</InfoRow>
                </SimpleCell>
              </div>
            }
          >
            <IconButton>
              <Icon16MoreVertical />
            </IconButton>
          </Popover>
        </div>
        <Separator style={{ margin: "15px -10px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <SimpleCell>
              <InfoRow header="Время">
                {time.from}-{time.to}
              </InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="Кабинет">{room}</InfoRow>
            </SimpleCell>
          </div>
          {teacher && (
            <SimpleCell
              before={
                <Avatar size={35} src="#" initials="??" gradientColor="blue" />
              }
              subtitle={`преподаватель (${teacher.degree})`}
            >
              {teacher.name}
            </SimpleCell>
          )}
        </div>
      </div>
    </Card>
  );
};
