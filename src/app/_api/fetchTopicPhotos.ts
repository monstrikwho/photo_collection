import fakeDelay from "../_utils/delay";

type FetchTopicPhotosProps = {
  topic?: string;
  page: number;
  perPage: number;
  delay?: number;
};

export const fetchTopicPhotos = async ({
  topic = "default",
  page,
  perPage,
  delay,
}: FetchTopicPhotosProps) => {
  try {
    let url = "";

    if (topic === "default") {
      url = `${process.env.NEXT_PUBLIC_API_URL}/photos?page=${page}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/topics/${topic}/photos?page=${page}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    }

    const res = await fetch(url, { method: "GET" });

    if (delay) await fakeDelay(delay);

    if (res.ok) {
      const data = await res.json();
      const cleaned = data.map((item: any) => ({
        id: item.id,
        alt: item.alt_description,
        src: item.urls.small,
        likes: item.likes,
        color: item.color,
      }));
      return cleaned;
    }

    return [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
