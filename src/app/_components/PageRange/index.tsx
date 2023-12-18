import React from "react";

import classes from "./index.module.sass";

type PageRangeProps = {
  countPhotos: number;
  currentPage: number;
  limit: number;
};

export default function PageRange(props: PageRangeProps) {
  const { countPhotos, currentPage, limit } = props;

  const indexStart = (currentPage - 1) * limit + 1;
  let indexEnd = currentPage * limit;

  if (isFinite(countPhotos) && indexEnd > countPhotos) indexEnd = countPhotos;

  return (
    <div className={classes.pageRange}>
      {`Показано ${indexStart} - ${indexEnd}`}
      {isFinite(countPhotos) && ` из ${countPhotos}`}
    </div>
  );
}
