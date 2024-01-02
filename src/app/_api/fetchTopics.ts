import { Topic } from "../_providers/Filter";

export const fetchTopics = async () => {
  let result: Topic[] = [];

  for (let page = 1; page - 1 < 2; page++) {
    const topics = await fetchMe(page);
    if (topics) result = result.concat(topics);
  }

  return result;
};

async function fetchMe(page: number) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/topics?page=${page}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

    const res = await fetch(url, { method: "GET" });

    if (res.ok) {
      const data = await res.json();
      return data.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        desc: item.description,
        total_photos: item.total_photos,
        cover_photo: item.cover_photo.urls.small,
      }));
    }

    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
