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
import { DayCard } from "../components/DayCard/DayCard";

const Home = ({ id, fetchedUser }) => {
  const {go} = useContext(GlobalContext);
  /* const mockSchedule = [
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
      teacher: { name: 'Душный чел', degree: 'душнила' },
      time: { from: '0:00', to: '0:00' },
      type: 'теория',
      room: '231'
    },
    {
      subject: 'БЖ',
      count: 4,
      teacher: { name: 'Душный чел', degree: 'душнила' },
      time: { from: '0:00', to: '0:00' },
      type: 'теория',
      room: '231'
    },
  ] */

  const mockSchedule =
    [
        {
            "dayOfWeek": "1",
            "isWeekend": false,
            "lessons": []
        },
        {
            "dayOfWeek": "3",
            "isWeekend": false,
            "lessons": [
                {
                    "id": "64150c3f639fb164c9200138",
                    "count": "2",
                    "time": {
                        "from": "10:15",
                        "to": "11:50"
                    },
                    "data": {
                        "lowerWeek": {
                            "subject": {
                                "title": "Теория информационных процессов и систем",
                                "type": "Лек"
                            },
                            "teacher": {
                                "name": "Мужиков Г.П.",
                                "degree": "к.т.н."
                            },
                            "cabinet": "208"
                        }
                    }
                },
                {
                    "id": "64150c3e639fb164c9200125",
                    "count": "3",
                    "time": {
                        "from": "12:30",
                        "to": "14:05"
                    },
                    "data": {
                        "lowerWeek": {
                            "subject": {
                                "title": "Методы и средства решения стандартных задач профессиональной деятельности",
                                "type": "Лаб."
                            },
                            "teacher": {
                                "name": "Мужиков Г.П.",
                                "degree": "к.т.н."
                            },
                            "cabinet": "208"
                        }
                    }
                }
            ]
        },
        {
            "dayOfWeek": "4",
            "isWeekend": false,
            "lessons": [
                {
                    "id": "64150c3e639fb164c9200120",
                    "count": "2",
                    "time": {
                        "from": "10:15",
                        "to": "11:50"
                    },
                    "data": {
                        "lowerWeek": {
                            "subject": {
                                "title": "Безопасность жизнедеятельности",
                                "type": "Пр"
                            },
                            "teacher": {
                                "name": "Хижняк Е.М.",
                                "degree": "к.б.н."
                            },
                            "cabinet": "316"
                        }
                    }
                },
                {
                    "id": "64150c3e639fb164c9200131",
                    "count": "3",
                    "time": {
                        "from": "12:30",
                        "to": "14:05"
                    },
                    "data": {
                        "lowerWeek": {
                            "subject": {
                                "title": "Методы и средства решения стандартных задач профессиональной деятельности",
                                "type": "Лек"
                            },
                            "teacher": {
                                "name": "Мужиков Г.П.",
                                "degree": "к.т.н."
                            },
                            "cabinet": "322"
                        }
                    }
                }
            ]
        },
        {
            "dayOfWeek": "2",
            "isWeekend": false,
            "lessons": [
                {
                    "id": "64150c3f639fb164c9200144",
                    "count": "4",
                    "time": {
                        "from": "14:15",
                        "to": "15:50"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Базы данных",
                                "type": "лаб."
                            },
                            "teacher": {
                                "name": "Запорожец О.И.",
                                "degree": ""
                            },
                            "cabinet": "410"
                        },
                        "lowerWeek": "none"
                    }
                }
            ]
        },
        {
            "dayOfWeek": "5",
            "isWeekend": false,
            "lessons": [
                {
                    "id": "64150c3e639fb164c920012a",
                    "count": "1",
                    "time": {
                        "from": "8:30",
                        "to": "10:05"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Операционные системы",
                                "type": "Лаб."
                            },
                            "teacher": {
                                "name": "Долгопятов А.Ю.",
                                "degree": ""
                            },
                            "cabinet": "208"
                        }
                    }
                },
                {
                    "id": "64150c3f639fb164c920014e",
                    "count": "2",
                    "time": {
                        "from": "10:15",
                        "to": "11:50"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Операционные системы",
                                "type": "лек"
                            },
                            "teacher": {
                                "name": "Долгопятов А.Ю.",
                                "degree": ""
                            },
                            "cabinet": "208"
                        },
                        "lowerWeek": {
                            "subject": {
                                "title": "Базы данных",
                                "type": "Лек"
                            },
                            "teacher": {
                                "name": "Полуянов В.П.",
                                "degree": "д.э.н."
                            },
                            "cabinet": "208"
                        }
                    }
                }
            ]
        },
        {
            "dayOfWeek": "0",
            "isWeekend": false,
            "lessons": [
                {
                    "id": "64150c3f639fb164c920013d",
                    "count": "1",
                    "time": {
                        "from": "9:15",
                        "to": "10:50"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Методы и средства решения стандартных задач профессиональной деятельности",
                                "type": "Лаб."
                            },
                            "teacher": {
                                "name": "Мужиков Г.П.",
                                "degree": "к.т.н."
                            },
                            "cabinet": "214"
                        },
                        "lowerWeek": "none"
                    }
                },
                {
                    "id": "64150c3e639fb164c9200111",
                    "count": "2",
                    "time": {
                        "from": "11:00",
                        "to": "12:35"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Теория информационных процессов и систем",
                                "type": "лаб"
                            },
                            "teacher": {
                                "name": "Мужиков Г.П.",
                                "degree": "к.т.н."
                            },
                            "cabinet": "322"
                        }
                    }
                },
                {
                    "id": "64150c3e639fb164c92000ec",
                    "count": "3",
                    "time": {
                        "from": "13:05",
                        "to": "14:40"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Безопасность жизнедеятельности",
                                "type": "Лек/лаб"
                            },
                            "teacher": {
                                "name": "Хижняк Е.М.",
                                "degree": "к.б.н."
                            },
                            "cabinet": "319"
                        }
                    }
                },
                {
                    "id": "64150c3e639fb164c92000c8",
                    "count": "4",
                    "time": {
                        "from": "14:50",
                        "to": "16:25"
                    },
                    "data": {
                        "topWeek": {
                            "subject": {
                                "title": "Общая физическая подготовка",
                                "type": "Пр"
                            },
                            "teacher": {
                                "name": "Амелькина Н.Н.",
                                "degree": ""
                            },
                            "cabinet": "нет данных"
                        }
                    }
                }
            ]
        }
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
          mockSchedule.map((day, index) => (
            <DayCard lessons={day.lessons} dayOfWeek = {day.dayOfWeek} />
          ))
        }
      </div>
    </Panel>
  );
};

export default Home;
