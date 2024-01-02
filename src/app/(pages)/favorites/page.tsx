"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";

import Login from "../../_components/Login";
import LoadingSpinner from "../../_components/LoadingSpinner";
import CollectionArchive from "../../_components/CollectionArchive";

import classes from "./index.module.sass";
import { Photo } from "../../_services/database";
import { AuthContext } from "../../_providers/Auth";
import { PhotosContext } from "../../_providers/Photos";
import { PayloadDateValue, PayloadLikeValue } from "../../_utils/sortedPhotos";
import delay from "../../_utils/delay";

type SortedState = {
  like: PayloadLikeValue;
  date: PayloadDateValue;
  [key: string]: string; // костыль для sortedItemClasses => sorted[item]
};

export default function FavoritesPage() {
  const { user, loading: isAuth, logout, updateUser } = useContext(AuthContext);
  const {
    photos,
    page,
    perPage,
    updatePhotos,
    sortPhotosByLike,
    sortPhotosByDate,
    loading,
    setLoading,
  } = useContext(PhotosContext);

  const [photosSliced, setPhotosSliced] = useState<Photo[]>([]);
  const [sorted, setSorted] = useState<SortedState>({
    like: "unsorted",
    date: "unsorted",
  });

  useEffect(() => {
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getUserPhotos() {
      if (!user) return;
      setLoading(true);
      const photos = Object.values(user.favorites);
      await delay(100);
      updatePhotos(photos, photos.length);
    }

    getUserPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const slicePhotos = useCallback(() => {
    const indexStart = (page - 1) * perPage;
    let indexEnd = page * perPage;

    if (indexEnd > photos.length) {
      indexEnd = photos.length;
    }

    return photos.slice(indexStart, indexEnd);
  }, [page, perPage, photos]);

  useEffect(() => {
    const sliced = slicePhotos();
    setPhotosSliced(sliced);
  }, [page, perPage, photos, slicePhotos]);

  // Для анимации при переходе между страницами
  useEffect(() => {
    (async function () {
      setLoading(true);
      await delay(100);
      updatePhotos(photos, photos.length);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, setLoading]);

  const handleChangeProfile = () => {
    logout();
    updatePhotos([], Infinity);
    setSorted({
      like: "unsorted",
      date: "unsorted",
    });
  };

  const handleSortPhotosByLike = () => {
    const newStatus = sorted.like === "more" ? "less" : "more";
    sortPhotosByLike(newStatus);
    setSorted({
      like: newStatus,
      date: "unsorted",
    });
  };

  const handleSortPhotosByDate = () => {
    const newStatus = sorted.date === "latest" ? "recent" : "latest";
    sortPhotosByDate(newStatus);
    setSorted({
      like: "unsorted",
      date: newStatus,
    });
  };

  if (!isAuth) return <LoadingSpinner />;
  if (!user) return <Login />;

  const sortedItemClasses = (item: string) =>
    clsx(
      classes.sortedItem,
      sorted[item] !== "unsorted" ? classes.sortedItemActive : ""
    );

  return (
    <>
      <div className="page-header">
        <div className="page-title">Избранные фотографии</div>
        <div className={classes.logoutBtn} onClick={handleChangeProfile}>
          <span>Сменить профиль</span>
          <LogoutIcon />
        </div>
      </div>
      <div className={classes.sorted}>
        <div
          className={sortedItemClasses("date")}
          onClick={handleSortPhotosByDate}
        >
          <span>дате добавления</span>
          {sorted.date === "latest" ? (
            <ArrowDropUpIcon />
          ) : sorted.date === "recent" ? (
            <ArrowDropDownIcon />
          ) : (
            ""
          )}
        </div>
        <div
          className={sortedItemClasses("like")}
          onClick={handleSortPhotosByLike}
        >
          <span>количество лайков</span>
          {sorted.like === "more" ? (
            <ArrowDropUpIcon />
          ) : sorted.like === "less" ? (
            <ArrowDropDownIcon />
          ) : (
            ""
          )}
        </div>
      </div>
      <CollectionArchive photos={photosSliced} loading={loading} />
    </>
  );
}
