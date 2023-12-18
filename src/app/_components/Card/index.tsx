import React, { useEffect, useState } from "react";
import clsx from "clsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Media from "../Media";

import classes from "./index.module.sass";
import {
  Photo,
  addFavoritePhoto,
  deleteFavoritePhoto,
  findFavoritePhoto,
} from "../../_services/database";

interface CardProps {
  data: Photo;
}

export default function Card({ data }: CardProps) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const findPhoto = async () => {
      const photo = await findFavoritePhoto(data.id);
      if (photo) setLike(true);
    };

    findPhoto();

    return () => controller.abort();
  }, [data.id]);

  const handleClick = () => {
    if (!like) {
      addFavoritePhoto(data);
    } else {
      deleteFavoritePhoto(data.id);
    }
    setLike(!like);
  };

  const likeClasses = clsx(classes.likes, like && classes.active);

  return (
    <div className={classes.card}>
      <div className={classes.mediaWrapper}>
        <Media resource={data} fill />
      </div>
      <div className={classes.content}>
        <div className={likeClasses} onClick={handleClick}>
          <div className={classes.heart}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
          <div className={classes.count}>
            {like ? +data.likes + 1 : data.likes}
          </div>
        </div>
        <div className={classes.color}>
          <div
            className={classes.colorSquare}
            style={{ backgroundColor: data.color }}
          ></div>
          <div className={classes.colorText}>{data.color}</div>
        </div>
      </div>
    </div>
  );
}
