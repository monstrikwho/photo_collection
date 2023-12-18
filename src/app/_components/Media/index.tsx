"use client";

import React from "react";
import NextImage from "next/image";

import classes from "./index.module.sass";
import { Photo } from "../../_services/database";

interface MediaProps {
  resource: Photo;
  fill?: boolean;
}

const Image: React.FC<MediaProps> = (props) => {
  const { resource, fill } = props;

  const width = 320;
  const height = 320;

  const breakpoints = [768, 1024, 1440];
  const sizes = breakpoints
    .map((value) => `(max-width: ${value}px) ${value}px`)
    .join(", ");

  return (
    <NextImage
      className={classes.image}
      src={resource.src}
      alt={resource.alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={true}
      sizes={sizes}
    />
  );
};

export default Image;
