import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  ChipsInput,
  Counter,
  FormItem,
  FormLayout,
  IconButton,
  InfoRow,
  Input,
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
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../store/Slices/notesSlice";
import { ChipsInputBase } from "@vkontakte/vkui/dist/components/ChipsInputBase/ChipsInputBase";

export const LessonCard = ({ subject, count, type, teacher, room, time }) => {
  const [shown, setShown] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [formData, setFormData] = React.useState({
    text: '',
    time: '',
  })

  const notes = useSelector(state => state.notes.notes)
  const [changedNotes, setChangedNotes] = React.useState([])

  useEffect(() => {
    const handleNotesChangeFormat = () => {
      if (notes.length) {
        const subjectNotes = notes.filter((note) => note.subject === subject)
        if (subjectNotes.length) {
          const changedNotes = subjectNotes.map((note, index) => {
           
            return {
              value: index,
              label: note.text + ': ' + note.time,
            }

          })
          setChangedNotes(changedNotes)
        }

      }

    }
    handleNotesChangeFormat()
  }, [notes])
  const dispatch = useDispatch()

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

  const handleAddNote = (e) => {
    e.preventDefault();
    setFormData({
      text: '',
      time: '',
    })

    dispatch(addNote({
      subject: subject,
      text: formData.text,
      time: formData.time,
    }))
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const modalRoot = (
    <ModalRoot activeModal={modal}>
      <ModalCard id="select" onClose={() => setModal(null)}>
        <FormLayout onSubmit={handleAddNote}>
          <FormItem top="Заметки" >
            <ChipsInput
              style={{ width: '100%' }}
              value={changedNotes ? changedNotes : []}
              disabled
            />
            <Input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Текст"
            />
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="Время для уведомления"
            />
            <Button type="submit">Подтвердить</Button>
          </FormItem>
        </FormLayout>
      </ModalCard>
    </ModalRoot>
  );
  return (
    <SplitLayout style={{ justifyContent: "center" }} modal={modalRoot}>
      <SplitCol style={{ padding: 5 }}>
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
              <div style={{ display: "flex", gap: 10 }}>
                <div>
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
