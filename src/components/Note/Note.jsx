import { CardGrid, ContentCard } from '@vkontakte/vkui';
import React from 'react';

const Note = ({ time, subject, text }) => {
    return (
        <div>
            <CardGrid style={{width: 'fit-content', maxWidth: '200px', flex: '1'}}>
                <ContentCard
                    style={{width: '100%'}}
                    subtitle={time}
                    header={subject}
                    text={text}
                    mode="tint"
                />
            </CardGrid>
        </div>
    );
}

export default Note;
