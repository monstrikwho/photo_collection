import React, { useState } from "react";

import classes from "./index.module.sass";

type Props = {
  name: string;
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState({ message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setValue(eventValue);
  };

  return (
    <div className={`${classes.inputBox} ${error.message && classes.error}`}>
      <input
        className={classes.input}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete="off"
      />
      <label className={classes.label}>
        {error.message ? error.message : label}
      </label>
    </div>
  );
};
