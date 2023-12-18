import moment from "moment";
import { Photo } from "../_services/database";

export const sortByLikes = (
  photos: Photo[],
  type: "more" | "less"
): Photo[] => {
  return photos.sort((a, b) => {
    if (type === "more") return b.likes - a.likes;
    return a.likes - b.likes;
  });
};

export const sortByDate = (
  photos: Photo[],
  type: "recent" | "latest"
): Photo[] => {
  return photos.sort((a, b) => {
    const date_a = moment(a.added_at, "DD.MM.YYYY HH:mm:ss");
    const date_b = moment(b.added_at, "DD.MM.YYYY HH:mm:ss");
    if (type === "latest") return date_b.diff(date_a);
    return date_a.diff(date_b);
  });
};
