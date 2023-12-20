"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CollectionsIcon from "@mui/icons-material/Collections";

import styles from "./styles.module.sass";
import { PhotosContext } from "../../_providers/Photos";

export default function Navbar() {
  const pathname = usePathname();
  const { updatePage } = useContext(PhotosContext);

  const handleChangeNav = () => updatePage(1);

  const classCollections = clsx(
    styles.bottomNavigationAction,
    pathname === "/" ? styles.activeAction : ""
  );

  const classFavorites = clsx(
    styles.bottomNavigationAction,
    pathname === "/favorites" ? styles.activeAction : ""
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.actions}>
        <div className={styles.bottomNavigaton}>
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
