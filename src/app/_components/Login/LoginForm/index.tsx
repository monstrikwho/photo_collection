"use client";
import React, { useContext } from "react";

import { Input } from "../../UI/Input";
import Button from "../../UI/Button";

import classes from "./index.module.sass";
import { AuthContext } from "../../../_providers/Auth";

type FormFields = {
  username: HTMLInputElement;
};

export default function LoginForm() {
  const { login } = useContext(AuthContext);

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & FormFields
  > = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    await login({ username: form.username.value });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input name="username" label="User name" placeholder="ivanov" required />
      <Button />
    </form>
  );
}
