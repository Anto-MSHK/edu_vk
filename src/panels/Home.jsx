import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

import { SkeletonAvatar, SkeletonText } from '../components/Skeleton';
import { GlobalContext } from '../context';

const Home = ({ id, fetchedUser }) => {
  const { go } = useContext(GlobalContext)
  const d = useRef();

  useEffect(()=>{
    if (fetchedUser) return () => {};
    const t = setTimeout(() => {
      ReactDOM.createRoot(d.current).render(
        <Group header={<Header mode="secondary">Ошибка</Header>}>
          <Cell disabled   multiline subtitle={<>Скорее всего Вы запустили проект за пределами VK, поэтому не удалось получить информацию о профиле. Если хотите проверить, как это работает, можете воспользоваться мостом: <a href="https://vk.com/app7900950">https://vk.com/app7900950</a></>}>
            Не удалось загрузить информацию о пользователе
          </Cell>
        </Group>
      )
    }, 4000);
    return () => clearTimeout(t)
  },[fetchedUser])

  return <Panel id={id}>
    <PanelHeader>Пример</PanelHeader>
    <div/>
    <div style={{maxWidth:600,width:"100%",marginInline:"auto", marginTop:20}}>
      <div ref={d}>
        <Group header={<Header mode="secondary">{fetchedUser?"Информация о профиле:":"Загружаем данные ..."}</Header>}>

          {((user)=>{
            const userExists = !!user;
            if (userExists) 
              return <Cell
                before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
                subtitle={user.city?.title ? user.city.title : null}
                onClick={()=>window.open(`https://vk.com/id${user.id}`)}
              >
                {user?.first_name+" "+user?.last_name}
              </Cell>
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
      <Group header={<Header mode="primary">Выберите должность</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={()=>go("auth")}>
            Покажите мне Мона Лизу
          </Button>
          <Button stretched size="l" mode="secondary" onClick={() => go("Roles")}>
            Выбор должности
          </Button>
        </Div>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => go("gioconda")}>
            Андрей
          </Button>
        </Div>
      </Group>
    </div>
  </Panel>
}

export default Home;
