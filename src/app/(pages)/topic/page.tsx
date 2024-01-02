"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "../../_components/Media";

import classes from "./index.module.sass";
import { FilterContext } from "../../_providers/Filter";

export default function Topic() {
  const { topics } = useContext(FilterContext);
  return (
    <>
      <div className="page-header">
        <div className="page-title">Категории фотографий</div>
      </div>
      <ul>
        {topics.map((item, key) => {
          const resource = {
            id: item.id,
            alt: item.desc,
            src: item.cover_photo,
            likes: 0,
            color: "",
            added_at: "",
          };
          return (
            <li className={classes.filterCard} key={item.id}>
              <Link href={"/topic/" + item.slug}>
                <div className={classes.boxImage}>
                  <Image resource={resource} fill />
                </div>
                <div className={classes.cardTitle}>{item.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
