import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./index.module.sass";

interface ActiveFilterProps {
  title: string;
  handleDeleteFilter: () => void;
}

export default function ActiveFilter({
  title,
  handleDeleteFilter,
}: ActiveFilterProps) {
  return (
    <div className={classes.activeFilter}>
      {title}
      <Link href="/" onClick={handleDeleteFilter} className={classes.closeBtn}>
        <CloseIcon sx={{ fontSize: 17 }} />
      </Link>
    </div>
  );
}
