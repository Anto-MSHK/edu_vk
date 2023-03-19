import { Icon12BookmarkOutline } from '@vkontakte/icons';
import {
    Avatar,
    Button,
    Card,
    Chip,
    ChipsInput,
    Counter,
    FormItem,
    FormLayout,
    Group,
    IconButton,
    InfoRow,
    Input,
    ModalCard,
    ModalRoot,
    Panel,
    PanelHeader,
    Placeholder,
    Separator,
    SimpleCell,
    SplitCol,
    SplitLayout,
    Title,
} from '@vkontakte/vkui';
import { SplitColContext } from '@vkontakte/vkui/dist/components/SplitCol/SplitColContext';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Note from '../Note/Note';
import { addNote } from "../../store/Slices/notesSlice";

const NotesComponent = () => {
    const notes = useSelector(state => state.notes.notes)
    const [modal, setModal] = React.useState(null);
    console.log(notes)
    const [formData, setFormData] = React.useState({
        text: '',
        time: '',
    })
    const dispatch = useDispatch()

    const handleAddNote = (e) => {
        e.preventDefault();
        setFormData({
          text: '',
          time: '',
        })
    
        dispatch(addNote({
          subject: 'Заметка',
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

        <SplitLayout  modal={modalRoot}>
            <Panel>
                <Group>

                    <Placeholder
                        icon={<Icon12BookmarkOutline />}
                        header="Ваши заметки"
                        action={<Button onClick={() => setModal("select")} size="m">Добавить заметку</Button>
                    }
                    >
                        Добавьте новые заметки
                    </Placeholder>
                    <div style={{ display: 'flex' }}>
                        {
                            notes.map((note, index) => (
                                <Note key={note.id} text={note.text} subject={note.subject} time={note.time} />
                            ))
                        }
                    </div>
                </Group>
            </Panel>
        </SplitLayout>

    );
}

export default NotesComponent;
