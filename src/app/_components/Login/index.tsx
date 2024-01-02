"use client";

import LoginForm from "./LoginForm";
import classes from "./index.module.sass";

export default function Login() {
  return (
    <div className={classes.login}>
      <div className={classes.loginTitle}>
        Создайте профиль, чтобы иметь возможность добавлять фотографии в
        избранное
      </div>
      <LoginForm />
    </div>
  );
}
