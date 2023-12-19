import moment from "moment";
import { Photo } from "../_services/database";

export type PayloadLikeValue = "unsorted" | "more" | "less";

export type PayloadDateValue = "unsorted" | "recent" | "latest";

export const sortByLikes = (
  photos: Photo[],
  value: PayloadLikeValue
): Photo[] => {
  return photos.sort((a, b) => {
    if (value === "more") return b.likes - a.likes;
    return a.likes - b.likes;
  });
};

export const sortByDate = (
  photos: Photo[],
  value: PayloadDateValue
): Photo[] => {
  return photos.sort((a, b) => {
    const date_a = moment(a.added_at, "DD.MM.YYYY HH:mm:ss");
    const date_b = moment(b.added_at, "DD.MM.YYYY HH:mm:ss");
    if (value === "latest") return date_b.diff(date_a);
    return date_a.diff(date_b);
  });
};
