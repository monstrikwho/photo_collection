import clsx from "clsx";
import Link from "next/link";

import { Topic } from "../../_providers/Filter";
import classes from "./index.module.sass";

interface FilterPopupProps {
  isOpen: boolean;
  topics: Topic[];
}

export default function FilterPopup({ topics, isOpen }: FilterPopupProps) {
  const popupClasses = clsx(classes.filterPopup, isOpen && classes.visible);
  return (
    <ul className={popupClasses}>
      {topics.map((item, key) => (
        <li className={classes.filterItem} key={key}>
          <Link href={`/topic/${item.slug}`} className={classes.filterLink}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
