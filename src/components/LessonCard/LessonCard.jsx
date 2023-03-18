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

export const LessonCard = ({ data, count, time }) => {
  const [shown, setShown] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [curWeek, setCurWeek] = useState < "topWeek" | "lowerWeek" > ("topWeek");
  const [notes, setNotes] = React.useState([{
    value: 'gym',
    label: 'Надо подкачаться'
  }])
  const onClick = (e) => {
    e.stopPropagation();
    setNotes([]);
  };

  const modalRoot = (
    <ModalRoot activeModal={modal}>
      <ModalCard id="select"
        onClose={() => setModal(null)}
      >
        <FormItem top="Заметки">
          <ChipsInput
            value={notes}
            after={
              <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={onClick}>
                <Icon16Clear />
              </IconButton>
            }
          />
        </FormItem>
      </ModalCard>
    </ModalRoot>
  );
  return (
    <SplitLayout
      style={{ justifyContent: 'center' }}
      header={<PanelHeader separator={false} />}
      modal={modalRoot}
    >
      <SplitCol >

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
                      <div className={"first_container"}>
                        <h1 className={"main__title"}>
                          {data[curWeek]?.subject ? (
                            <div>
                              {data[curWeek]?.subject && data[curWeek]?.subject.title}
                            </div>
                          ) : (
                            <div>Пары нет</div>
                          )}
                        </h1>
                      </div>
                    </Title>
                  </div>
                </div>
                {(
                  <Title level="3" weight="3" style={{ marginRight: 10 }}>
                    ({data[curWeek]?.subject.type})
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
                      <InfoRow onClick={() => setModal('select')}>Поставить напоминание</InfoRow>
                    </SimpleCell>
                    <SimpleCell style={{ marginBottom: 5 }}>
                      <InfoRow >Отметить</InfoRow>
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
                {/*   <InfoRow header="Время">
                    {time.from}-{time.to}
                  </InfoRow> */}
                </SimpleCell>
                <SimpleCell>
                  <InfoRow header="Кабинет">{}</InfoRow>
                </SimpleCell>
              </div>
             
                <SimpleCell
                  before={
                    <Avatar size={35} src="#" initials="??" gradientColor="blue" />
                  }
                  subtitle={`преподаватель (${data[curWeek]?.teacher?.degree &&
                    " (" + data[curWeek]?.teacher?.degree + ")"})`}
                >
                  {data[curWeek]?.teacher?.name}
                </SimpleCell>
            </div>
          </div>
        </Card>
      </SplitCol>
    </SplitLayout>
  );
};
