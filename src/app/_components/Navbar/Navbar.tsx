"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CollectionsIcon from "@mui/icons-material/Collections";

import classes from "./index.module.sass";
import { PhotosContext } from "../../_providers/Photos";

export default function Navbar() {
  const pathname = usePathname();
  const { updatePage } = useContext(PhotosContext);

  const handleChangeNav = () => updatePage(1);

  const classCollections = clsx(
    classes.bottomNavigationAction,
    pathname === "/" ? classes.activeAction : ""
  );

  const classFavorites = clsx(
    classes.bottomNavigationAction,
    pathname === "/favorites" ? classes.activeAction : ""
  );

  return (
    <nav className={classes.navbar}>
      <div className={classes.actions}>
        <div className={classes.bottomNavigaton}>
          <Link href="/" className={classCollections} onClick={handleChangeNav}>
            <CollectionsIcon />
            <span>Collections</span>
          </Link>
          <Link
            href="/favorites"
            className={classFavorites}
            onClick={handleChangeNav}
          >
            <FavoriteIcon />
            <span>Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
