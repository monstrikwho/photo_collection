"use client";
import { useState, createContext, useEffect } from "react";
import { fetchTopics } from "../../_api/fetchTopics";

export interface Topic {
  id: string;
  slug: string;
  title: string;
  desc: string;
  total_photos: number;
  cover_photo: string;
}

interface IContextType {
  topics: Topic[];
  filter: Topic | null;
  updateFilter: (value: Topic | null) => void;
}

export const FilterContext = createContext({} as IContextType);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filter, setFilter] = useState<Topic | null>(null);

  useEffect(() => {
    async function fetchMe() {
      const res = await fetchTopics();
      setTopics(res);
    }

    fetchMe();
  }, []);

  const updateFilter = (value: Topic | null) => setFilter(value);

  const contextValue: IContextType = {
    topics,
    filter,
    updateFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
