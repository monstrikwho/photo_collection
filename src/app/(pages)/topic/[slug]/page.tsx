"use client";
import { useContext, useEffect } from "react";
import Filter from "../../../_components/Filters";
import CollectionArchive from "../../../_components/CollectionArchive";
import { fetchTopic } from "@/src/app/_api/fetchTopic";
import { fetchTopicPhotos } from "@/src/app/_api/fetchTopicPhotos";
import { FilterContext } from "@/src/app/_providers/Filter";
import { PhotosContext } from "@/src/app/_providers/Photos";

export default function TopicSlug({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { updateFilter } = useContext(FilterContext);
  const { photos, page, perPage, loading, updatePhotos, setLoading } =
    useContext(PhotosContext);

  useEffect(() => {
    async function fetchMe() {
      setLoading(true);

      // Проверяем, есть ли топик. Забираем данные
      const topic = await fetchTopic({ slug });

      // Если топика не существует
      if (!topic) return updatePhotos([], Infinity);

      updateFilter(topic);
      const photos = await fetchTopicPhotos({
        topic: slug,
        page,
        perPage,
        delay: 1000,
      });
      updatePhotos(photos, topic.total_photos);
    }

    fetchMe();
    // Если добавить updateFilter, попадаем в бесконечный ререндр
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, setLoading, slug, updatePhotos]);

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
