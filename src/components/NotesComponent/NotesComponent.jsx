import { Icon12BookmarkOutline } from '@vkontakte/icons';
import { Button, Card, CardGrid, ContentCard, Group, Panel, Placeholder, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { SplitColContext } from '@vkontakte/vkui/dist/components/SplitCol/SplitColContext';
import React from 'react';
import { useSelector } from 'react-redux';
import Note from '../Note/Note';

const NotesComponent = () => {
    const notes = useSelector(state => state.notes.notes)
    return (

        <SplitLayout>


            <Panel>
                <Group>

                    <Placeholder
                        icon={<Icon12BookmarkOutline />}
                        header="Ваши заметки"
                        action={<Button size="m">Добавить заметку</Button>}
                    >
                        Добавьте новые заметки
                    </Placeholder>
                    <div style={{display: 'flex'}}>
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
