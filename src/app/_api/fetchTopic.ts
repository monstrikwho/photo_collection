import fakeDelay from "../_utils/delay";

type FetchTopicProps = {
  slug: string;
  delay?: number;
};

export const fetchTopic = async ({ slug, delay }: FetchTopicProps) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/topics/${slug}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

    const res = await fetch(url, { method: "GET" });

    if (delay) await fakeDelay(delay);

    if (res.ok) {
      const data = await res.json();
      return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        desc: data.description,
        total_photos: data.total_photos,
        cover_photo: data.cover_photo.urls.small,
      };
    }

    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
