import React from "react";
import "./DayCard.css";
import { LessonCard } from "../LessonCard/LessonCard";
import { CardGrid } from "@vkontakte/vkui";


const week = {
    0: "понедельник",
    1: "вторник",
    2: "среда",
    3: "четверг",
    4: "пятница",
    5: "суббота",
};



export const DayCard = ({ dayOfWeek, lessons, ref, style }) => {
    return (
        <CardGrid
            ref={ref}
            style={{
                width: "100%",
                backgroundColor: "#001529",
                height: "100%",
                borderWidth: 0,
            }}

        >
            {/*  <div className={styles.container}>
        <h1>{week[dayOfWeek]}</h1>
        {curDayIndex === +dayOfWeek ? (
          <LeftCircleFilled
            size={100}
            style={{
              color: "#4096FF",
              margin: "8px 0 0 10px",
              fontSize: 24,
            }}
          />
        ) : (
          <></>
        )}
      </div> */}
            {lessons.map((lesson, index) => (
                <div key={`${lesson.time} +${index}`}>

                        {/* <LessonCard
                            count={lesson.count}
                            time={lesson.time}
                            data={lesson.data}
                            group={lesson.group}
                            groups={lesson.groups}
                            dayOfWeek={dayOfWeek}
                        /> */}
                        {
                            JSON.stringify(lesson)
                        }
                </div>
            ))}
        </CardGrid>
    );
};
