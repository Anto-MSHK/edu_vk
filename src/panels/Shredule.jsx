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
} from "@vkontakte/vkui";

import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";
import { LessonCard } from "../components/LessonCard/LessonCard.jsx";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover.js";
import { useGetScheduleByNameQuery } from "../store/services/scheduleService";

const Shredule = ({ id }) => {
  const { data, error, isLoading } = useGetScheduleByNameQuery("bulbasaur");
  const mockSchedule = [
    {
      subject: "Математика",
      count: 1,
      teacher: { name: "Ирина Чумак", degree: "к.ф.м" },
      time: { from: "10:00", to: "10:50" },
      type: "практика",
      room: "123",
    },
    {
      subject: "Русский язык",
      count: 2,
      teacher: { name: "Какояша", degree: "к.ф.м" },
      time: { from: "8:00", to: "21:50" },
      type: "теория",
      room: "321",
    },
    {
      subject: "БЖ",
      count: 3,
      teacher: { name: "Антон", degree: "12" },
      time: { from: "0:00", to: "0:00" },
      type: "теория",
      room: "231",
    },
    {
      subject: "БЖ",
      count: 4,
      teacher: { name: "Никита", degree: "доцент" },
      time: { from: "0:00", to: "0:00" },
      type: "теория",
      room: "231",
    },
  ];

  const buttons = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const { go } = useContext(GlobalContext);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
        Сегодня
      </PanelHeader>
      <Group>
        <div
          style={{
            maxWidth: 600,
            width: "100%",
            marginInline: "auto",
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {!isLoading &&
            data &&
            data[0].days[0].lessons.map((lesson) => {
              return (
                <LessonCard
                  key={lesson.count}
                  subject={lesson.subject.name}
                  teacher={lesson.userId}
                  count={lesson.count}
                  time={{ from: lesson.time_from, to: lesson.time_to }}
                  type={lesson.type}
                  room={lesson.room.name}
                />
              );
            })}
          <Popover
            action="hover"
            placement="top-end"
            content={
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {buttons &&
                  buttons.map((el) => <Button mode={"secondary"}>{el}</Button>)}
              </Div>
            }
          >
            <div style={{ padding: 5 }}>
              <Button style={{ width: "100%", marginBottom: 10 }}>
                Другой день
              </Button>
            </div>
          </Popover>
          <Button
            style={{ marginBottom: 10 }}
            size="sm"
            mode="secondary"
            onClick={() => go("home")}
          >
            Просмотреть замены
          </Button>
        </div>
      </Group>
    </Panel>
  );
};

export default Shredule;
