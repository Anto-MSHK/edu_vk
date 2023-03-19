import {
  Group,
  Header,
  Title,
  Panel,
  PanelHeader,
  Gradient,
  Cell,
} from "@vkontakte/vkui";
import React from "react";
import { LessonCard } from "../LessonCard/LessonCard";

const weekDays = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

export const DayCard = ({ data }) => {
  console.log(data);
  return (
    <Group>
      <Gradient
        mode="tint"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 15,
        }}
      >
        <Title>{weekDays[`${data.count}`]}</Title>
      </Gradient>
      <div style={{}}>
        {data && data.lessons.length > 0 ? (
          data.lessons.map((lesson) => {
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
          })
        ) : (
          <Cell>
            <Title>Выходной</Title>
          </Cell>
        )}
      </div>
    </Group>
  );
};
