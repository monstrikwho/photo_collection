"use client";
import React, { createContext, useCallback, useState } from "react";
import { Photo } from "../../_services/database";
import {
  PayloadDateValue,
  PayloadLikeValue,
  sortByDate,
  sortByLikes,
} from "../../_utils/sortedPhotos";

interface ProviderProps {
  children: React.ReactNode;
}

type IContextType = {
  photos: Photo[];
  updatePhotos: (photos: Photo[], len: number) => void;
  sortPhotosByLike: (isSorted: PayloadLikeValue) => void;
  sortPhotosByDate: (isSorted: PayloadDateValue) => void;
  page: number;
  updatePage: (value: number) => void;
  perPage: number;
  updatePerPage: (value: number) => void;
  countPhotos: number;
  updateCountPhotos: (value: number) => void;
  loading: boolean;
  setLoading: (status: boolean) => void;
};

export const PhotosContext = createContext({} as IContextType);

export const PhotosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(9);
  const [countPhotos, setCountPhotos] = useState<number>(Infinity);
  const [loading, setLoading] = useState<boolean>(true);

  const updatePage = (value: number) => setPage(value);
  const updatePerPage = (value: number) => setPerPage(value);
  const updateCountPhotos = (value: number) => setCountPhotos(value);

  const sortPhotosByLike = (value: PayloadLikeValue) => {
    const sorted = sortByLikes(photos, value);
    setPhotos(sorted);
  };

  const sortPhotosByDate = (value: PayloadDateValue) => {
    const sorted = sortByDate(photos, value);
    setPhotos(sorted);
  };

  const updatePhotos = useCallback((photos: Photo[], len: number) => {
    setPhotos(photos);
    setCountPhotos(len);
    setLoading(false);
  }, []);

  return (
    <PhotosContext.Provider
      value={{
        photos,
        updatePhotos,
        sortPhotosByLike,
        sortPhotosByDate,
        page,
        updatePage,
        perPage,
        updatePerPage,
        countPhotos,
        updateCountPhotos,
        loading,
        setLoading,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
