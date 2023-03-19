import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Card,
  ChipsInput,
  Counter,
  FormItem,
  IconButton,
  InfoRow,
  ModalCard,
  ModalRoot,
  PanelHeader,
  Separator,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Title,
} from "@vkontakte/vkui";
import { Icon16Clear, Icon16MoreVertical } from "@vkontakte/icons";
import { Popover } from "@vkontakte/vkui/dist/components/Popover/Popover";
import { getUser } from "../../store/hhtp";

export const LessonCard = ({ subject, count, type, teacher, room, time }) => {
  const [shown, setShown] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [notes, setNotes] = React.useState([
    {
      value: "gym",
      label: "Надо подкачаться",
    },
  ]);
  const onClick = (e) => {
    e.stopPropagation();
    setNotes([]);
  };

  const [teacherObj, setTeacherObj] = useState(undefined);

  useEffect(() => {
    getUser(teacher).then((res) => {
      setTeacherObj(res);
    });
  }, []);

  const modalRoot = (
    <ModalRoot activeModal={modal}>
      <ModalCard id="select" onClose={() => setModal(null)}>
        <FormItem top="Заметки">
          <ChipsInput
            value={notes}
            after={
              <IconButton
                hoverMode="opacity"
                aria-label="Очистить поле"
                onClick={onClick}
              >
                <Icon16Clear />
              </IconButton>
            }
          />
        </FormItem>
      </ModalCard>
    </ModalRoot>
  );
  return (
      <SplitLayout style={{justifyContent: "center", height: "100%"}} modal={modalRoot}>
        <SplitCol style={{padding: "10px"}}>
          <Card mode="shadow" style={{}}>
            <div style={{padding: "10px"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <Counter mode="primary" marginHeight={5} style={{padding: "2px", marginRight: "5px"}}>
                        <Title level="4" style={{fontSize: "18px"}}>{count}</Title>
                      </Counter>
                      <Title level="3" marginHeight={5} style={{fontWeight: "bold", fontSize: "20px"}}>
                        {subject}
                      </Title>
                    </div>
                  </div>
                {type && (
                  <Title level="3" weight="semi-bold" style={{marginLeft: "10px"}}>
                    ({type === "pr" ? "практика" : "теория"})
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
                      <InfoRow onClick={() => setModal("select")}>
                        Поставить напоминание
                      </InfoRow>
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
              <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <SimpleCell>
                    <InfoRow header="Время">
                      {time.from}-{time.to}
                    </InfoRow>
                  </SimpleCell>
                </div>
                <div>
                  <SimpleCell>
                    <InfoRow header="Кабинет">{room}</InfoRow>
                  </SimpleCell>
                </div>
              </div>
              {teacherObj && (
                <SimpleCell
                  before={
                    <Avatar
                      size={35}
                      src="#"
                      initials="??"
                      gradientColor="blue"
                    />
                  }
                  subtitle={`преподаватель`}
                >
                  {teacherObj.firstName} {teacherObj.lastName}
                </SimpleCell>
              )}
            </div>
          </div>
        </Card>
      </SplitCol>
    </SplitLayout>
  );
};
