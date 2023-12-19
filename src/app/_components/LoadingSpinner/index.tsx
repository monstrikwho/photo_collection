import CircularProgress from "@mui/material/CircularProgress";
import classes from "./index.module.sass";

export default function LoadingSpinner() {
  return (
    <div className={classes.box}>
      <CircularProgress />
    </div>
  );
}
