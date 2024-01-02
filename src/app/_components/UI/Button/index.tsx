import classes from "./index.module.sass";

export default function Button() {
  return (
    <button className={classes.btn} type="submit">
      Войти
    </button>
  );
}
