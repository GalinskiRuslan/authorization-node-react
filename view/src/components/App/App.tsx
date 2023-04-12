import React, { FC, useContext, useEffect } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const App: FC = () => {

  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])
  if (!store.isAuth) {
    return <LoginForm />
  }

  return (<div className="App"><h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1><button onClick={() => { store.logout() }}>Выйти</button></div>);
}

export default observer(App);
