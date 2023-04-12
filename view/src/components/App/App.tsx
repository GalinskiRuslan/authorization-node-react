import React, { FC, useContext, useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { IUser } from "../../models/response/User";
import UsersService from "../../services/UsersService";

const App: FC = () => {

  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UsersService.fetchUsers();
      setUsers(response.data)
      console.log(users);

    } catch (error) {
      console.log(error);

    }

  }

  if (store.isLoading) {
    return <div>Loading ...</div>
  }
  if (!store.isAuth) {
    return <div>'Авторизуйтесь' <LoginForm /></div>
  }

  return (<div className="App"><h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : ""}</h1><button onClick={() => { store.logout() }}>Выйти</button>
    <button onClick={() => getUsers()}>Получить пользователей!</button>
    {users.map(user =>
      <div key={user.email}>{user.email} is active: {user.isActivated?'yes': 'nononno'}</div>
    )}
  </div>);
}

export default observer(App);
