type FetchByTopicProps = {
  topic?: string;
  page: number;
  perPage: number;
};

export const fetchByTopic = async ({
  topic = "default",
  page,
  perPage,
}: FetchByTopicProps) => {
  try {
    let url = "";

    if (topic === "default") {
      url = `${process.env.NEXT_PUBLIC_API_URL}/photos?page=${page}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/topics/${topic}/photos?page=${page}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    }

    const res = await fetch(url, { method: "GET" });

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

    throw new Error("Ошибка в запросе метода updatePhotosByTopic");
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
