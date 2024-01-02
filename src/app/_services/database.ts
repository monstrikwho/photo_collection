import Dexie, { Table } from "dexie";
import moment from "moment";

export interface Photo {
  id: string;
  alt: string;
  src: string;
  likes: number;
  color: string;
  added_at: string;
}

export interface Profile {
  username: string;
  favorites: {
    [key: string]: Photo;
  };
}

export interface ActiveProfile extends Profile {
  key: number;
}

class DatabaseService extends Dexie {
  profiles!: Table<Profile>;
  activeProfile!: Table<ActiveProfile>;

  constructor() {
    super("Database");
    this.version(1).stores({
      profiles: "username, favorites",
      activeProfile: "key, username, favorites",
    });
  }
}

const db = new DatabaseService();

const getProfile = async (username: string) => {
  return await db.profiles.get(username);
};

const addProfile = async (username: string) => {
  const data = { username, favorites: {} };
  db.profiles.add(data);
  return data;
};

const getActiveProfile = async () => {
  const activeProfile = await db.activeProfile.get({ key: 0 });

  if (!activeProfile) return null;

  return activeProfile;
};

const addActiveProfile = async (data: Profile) => {
  const activeProfile = await getActiveProfile();

  if (!activeProfile) {
    db.activeProfile.add({ ...data, key: 0 });
  } else {
    activeProfile.username = data.username;
    activeProfile.favorites = data.favorites;
    db.activeProfile.put(activeProfile);
  }
};

const deleteActiveProfile = async () => {
  const activeProfile = await getActiveProfile();

  if (!activeProfile) return false;

  db.activeProfile.delete(0);

  return true;
};

const findFavoritePhoto = async (id: string) => {
  const activeProfile = await getActiveProfile();

  if (activeProfile && activeProfile.favorites[id]) {
    return activeProfile.favorites[id];
  }

  return false;
};

const addFavoritePhoto = async (photo: Photo) => {
  const activeProfile = await getActiveProfile();

  if (activeProfile) {
    activeProfile.favorites[photo.id] = {
      ...photo,
      added_at: moment().format("DD.MM.YYYY HH:mm:ss"),
    };
    db.profiles.put(activeProfile);
    db.activeProfile.put(activeProfile);
  }
};

const deleteFavoritePhoto = async (id: string) => {
  const activeProfile = await getActiveProfile();

  if (activeProfile) {
    delete activeProfile.favorites[id];
    db.profiles.put(activeProfile);
    db.activeProfile.put(activeProfile);
  }
};

export {
  db,
  getProfile,
  addProfile,
  getActiveProfile,
  addActiveProfile,
  deleteActiveProfile,
  findFavoritePhoto,
  addFavoritePhoto,
  deleteFavoritePhoto,
};
