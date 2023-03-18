import React, {useContext} from "react";

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  PanelHeaderBack,
  PanelHeaderClose,
} from "@vkontakte/vkui";

import { GlobalContext } from "../context";
import { LessonCard } from "../components/LessonCard/LessonCard";

const Home = ({ id, fetchedUser }) => {
  const {go} = useContext(GlobalContext);
  const mockSchedule = [
    {
      subject: 'Математика',
      count: 1,
      teacher: { name: 'Ирина Чумак', degree: 'к.ф.м' },
      time: { from: '10:00', to: '10:50' },
      type: 'практика',
      room: '123'
    },
    {
      subject: 'Русский язык',
      count: 2,
      teacher: { name: 'Какояша', degree: 'к.ф.м' },
      time: { from: '8:00', to: '21:50' },
      type: 'теория',
      room: '321'
    },
    {
      subject: 'БЖ',
      count: 3,
      teacher: { name: 'Антон', degree: '12' },
      time: { from: '0:00', to: '0:00' },
      type: 'теория',
      room: '231'
    },
    {
      subject: 'БЖ',
      count: 4,
      teacher: { name: 'Никита', degree: 'доцент' },
      time: { from: '0:00', to: '0:00' },
      type: 'теория',
      room: '231'
    },
  ]
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={()=>go('signin')}/>}>
        EDU.vk
      </PanelHeader>
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          marginInline: "auto",
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >

        {
          mockSchedule.map((lesson) => (

            <LessonCard
              key={lesson.count}
              subject={lesson.subject}
              teacher={lesson.teacher}
              count={lesson.count}
              time={lesson.time}
              type={lesson.type}
              room={lesson.room}
            />
          ))
        }
      </div>
    </Panel>
  );
};

export default Home;
