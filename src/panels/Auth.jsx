import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Placeholder} from '@vkontakte/vkui';

import { SkeletonAvatar, SkeletonText } from '../components/Skeleton';
import { GlobalContext } from '../context';

const Auth = ({ id, fetchedUser }) => {
    const { go } = useContext(GlobalContext)
    const d = useRef();

    useEffect(()=>{
        if (fetchedUser) return () => {};
        const t = setTimeout(() => {
            ReactDOM.createRoot(d.current).render(
                <Placeholder
                    action={
                        <Group header={<Header mode="primary">Выберите свою должность</Header>}>
                            <Div>
                                <Button stretched size="l" mode="primary" onClick={() => go("home")}>
                                    Студент
                                </Button>
                            </Div>
                            <Div>
                                <Button stretched size="l" mode="primary" onClick={() => go("home")}>
                                    Преподаватель
                                </Button>
                            </Div>
                            <Div>
                                <Button stretched size="l" mode="secondary" onClick={()=>go('signin')}>
                                    Вернуться на главную
                                </Button>
                            </Div>
                        </Group>

                    }
                    stretched
                >
                </Placeholder>
            )
        }, 4000);
        return () => clearTimeout(t)
    },[fetchedUser])

    return <Panel id={id}>
        <PanelHeader>EDU.vk</PanelHeader>
        <div/>
        <div style={{maxWidth:600,width:"100%",marginInline:"auto", marginTop:20}}>
            <div ref={d}>
                <Group header={<Header mode="secondary">{fetchedUser?"Информация о профиле:":"Загружаем данные ..."}</Header>}>

                    {((user)=>{
                        const userExists = !!user;
                        if (userExists)
                            return <> <Cell
                                before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
                                subtitle={user.city?.title ? user.city.title : null}
                                onClick={()=>window.open(`https://vk.com/id${user.id}`)}
                            >
                                {user?.first_name+" "+user?.last_name}
                            </Cell>
                                <Div>
                                    <Button stretched size="l" mode="primary" onClick={()=>go("home")}>
                                        Это я
                                    </Button>
                                </Div>

                            </>
                        else
                            return <Cell
                                disabled={true}
                                before={<SkeletonAvatar />}
                                subtitle={<SkeletonText style={{height:20,width:140}}/>}
                            >
                                <SkeletonText style={{height:20,width:60}}/>&nbsp; <SkeletonText style={{height:20,width:100}}/>
                            </Cell>
                    })(fetchedUser)}
                </Group>
            </div>
        </div>
    </Panel>
}

export default Auth;
