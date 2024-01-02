"use client";
import Filter from "./_components/Filters";
import CollectionArchive from "./_components/CollectionArchive";
import { useContext, useEffect } from "react";
import { PhotosContext } from "./_providers/Photos";
import { fetchTopicPhotos } from "./_api/fetchTopicPhotos";
import { FilterContext } from "./_providers/Filter";

export default function Home() {
  const { updateFilter } = useContext(FilterContext);
  const { page, perPage, photos, updatePhotos, loading, setLoading } =
    useContext(PhotosContext);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      updateFilter(null);
      const photos = await fetchTopicPhotos({ page, perPage });
      updatePhotos(photos, Infinity);
    };

    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, updatePhotos, setLoading]);

  return (
    <>
      <div className="page-header">
        <div className="page-title">Коллекция фотографий</div>
        <Filter />
      </div>
      <CollectionArchive photos={photos} loading={loading} />
    </>
  );
}
