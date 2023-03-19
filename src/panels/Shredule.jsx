import React, {useContext, useEffect, useRef, useState} from "react";
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
    PanelHeaderBack, View, Card, Title,
} from "@vkontakte/vkui";

import {SkeletonAvatar, SkeletonText} from "../components/Skeleton";
import {GlobalContext} from "../context";
import {LessonCard} from "../components/LessonCard/LessonCard.jsx";
import {Popover} from "@vkontakte/vkui/dist/components/Popover/Popover.js";
import {useGetScheduleByNameQuery} from "../store/services/scheduleService";

const Shredule = ({id}) => {
    const {data, error, isLoading} = useGetScheduleByNameQuery("bulbasaur");

    const [activePanel, setActivePanel] = useState('today');

    const handleChange = (day) => {
        setActivePanel(day);
    }

    const buttons = [
        {
            name: 'Понедельник',
            onClick: () => {
                handleChange('monday')
            }
        },
        {
            name: 'Вторник',
            onClick: () => {
                handleChange('tuesday')
            }
        },
        {
            name: 'Среда',
            onClick: () => {
                handleChange('wednesday')
            }
        },
        {
            name: 'Четверг',
            onClick: () => {
                handleChange('thursday')
            }
        },
        {
            name: 'Пятница',
            onClick: () => {
                handleChange('friday')
            }
        },
        {
            name: 'Суббота',
            onClick: () => {
                handleChange('saturday')
            }
        },
        {
            name: 'Сегодня',
            onClick: () => {
                handleChange('today')
            }
        }
    ];

    const {go} = useContext(GlobalContext);

    const today = new Date();

    const dayOfWeek = today.getDay();

    let adjustedDayOfWeek = dayOfWeek - 1;
    if (dayOfWeek === 0) {
        adjustedDayOfWeek = 6;
    }

    const dayNumber = adjustedDayOfWeek >= 0 && adjustedDayOfWeek <= 5 ? adjustedDayOfWeek : null;

    return (
        <View activePanel={activePanel}>
            <Panel id={'today'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
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
                        {!isLoading && data &&
                        data[0].days[`${dayNumber}`] &&
                        data[0].days[`${dayNumber}`].lessons &&
                        data[0].days[`${dayNumber}`].lessons.length > 0 ? (
                            data[0].days[`${dayNumber}`].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
                                        type={lesson.type}
                                        room={lesson.room.name}
                                    />
                                );
                            })
                        ) : (
                            <div style={{padding: 5}}>
                                <Card mode={'shadow'} style={{padding: 20}}>
                                    <Title style={{textAlign: 'center'}}>Выходной день</Title>
                                </Card>
                            </div>
                        )}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'monday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Понедельник
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
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'tuesday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Вторник
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
                            data[0].days[1].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'wednesday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Среда
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
                            data[0].days[2].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'thursday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Четверг
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
                        }}>
                        {!isLoading &&
                            data &&
                            data[0].days[3].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'friday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Пятница
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
                            data[0].days[4].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
            <Panel id={'saturday'}>
                <PanelHeader before={<PanelHeaderBack onClick={() => go("home")}/>}>
                    Суббота
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
                            data[0].days[5].lessons.map((lesson) => {
                                return (
                                    <LessonCard
                                        key={lesson.count}
                                        subject={lesson.subject.name}
                                        teacher={lesson.userId}
                                        count={lesson.count}
                                        time={{from: lesson.time_from, to: lesson.time_to}}
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
                                        buttons.map((el) => <Button mode={"secondary"}
                                                                    onClick={el.onClick}>{el.name}</Button>)}
                                </Div>
                            }
                        >
                            <div style={{padding: 5}}>
                                <Button style={{width: "100%", marginBottom: 10}}>
                                    Другой день
                                </Button>
                            </div>
                        </Popover>
                    </div>
                </Group>
            </Panel>
        </View>
    )
        ;
};

export default Shredule;
