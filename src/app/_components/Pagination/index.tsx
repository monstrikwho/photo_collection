"use client";
import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import PageRange from "../PageRange";

import classes from "./index.module.sass";
import { PhotosContext } from "../../_providers/Photos";

export default function Pagination() {
  const { page, updatePage, perPage, countPhotos } = useContext(PhotosContext);

  const handleClickPrev = () => updatePage(page - 1);
  const handleClickNext = () => updatePage(page + 1);

  return (
    <div className={classes.pagination}>
      <IconButton
        color="primary"
        aria-label="Prev page"
        onClick={handleClickPrev}
        disabled={page === 1}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <PageRange countPhotos={countPhotos} currentPage={page} limit={perPage} />
      <IconButton
        color="primary"
        aria-label="Next page"
        onClick={handleClickNext}
        disabled={page * perPage >= countPhotos}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
