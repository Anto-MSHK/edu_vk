import React, {useEffect, useContext} from 'react';

import {Panel, Placeholder, Button, Div, Header, Group} from '@vkontakte/vkui';
import { GlobalContext } from "../../context"

export default ({id}) => {
    const { go, index } = useContext(GlobalContext)

    return <Panel id={id}>
        <Placeholder
            action={

                <Group header={<Header mode="primary">Выберите свою должность</Header>}>
                    <Div>
                        <Button stretched size="l" mode="primary" onClick={() => go("Roles")}>
                            Студент
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="primary" onClick={() => go("gioconda")}>
                            Преподаватель
                        </Button>
                    </Div>
                        <Div>
                            <Button stretched size="l" mode="secondary" onClick={()=>go(index)}>
                                Вернуться на главную
                            </Button>
                    </Div>
                </Group>

            }
            stretched
        >
        </Placeholder>
    </Panel>
}