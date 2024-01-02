import { motion } from "framer-motion";

import Card from "../Card";
import Pagination from "../Pagination";

import classes from "./index.module.sass";
import { Photo } from "../../_services/database";
import LoadingSpinner from "../LoadingSpinner";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type CollectionArchiveProps = {
  photos: Photo[];
  loading?: boolean;
};

export default function CollectionArchive({
  photos,
  loading,
}: CollectionArchiveProps) {
  if (loading) {
    return (
      <div className={classes.collectionArchive}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!photos.length) return "Фотографий нет";

  return (
    <div className={classes.collectionArchive}>
      <motion.div
        className={classes.grid}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {photos.map((data, key) => (
          <motion.div variants={item} key={key}>
            <Card data={data} />
          </motion.div>
        ))}
      </motion.div>
      <Pagination />
    </div>
  );
}
