import React, { useState, useEffect, useContext, useRef } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

import FilterPopup from "./FilterPopup";
import ActiveFilter from "./ActiveFilter";
import { FilterContext } from "../../_providers/Filter";
import classes from "./index.module.sass";

export default function Filter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { filter, topics, updateFilter } = useContext(FilterContext);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleChangeVisible = () => setIsOpen(!isOpen);
  const handleDeleteFilter = () => updateFilter(null);

  return (
    <div className={classes.filter} ref={ref}>
      <div className={classes.filterBtn} onClick={handleChangeVisible}>
        {!isOpen ? <FilterListIcon /> : <CloseIcon />}
      </div>
      {filter && (
        <ActiveFilter
          title={filter.title}
          handleDeleteFilter={handleDeleteFilter}
        />
      )}
      <FilterPopup topics={topics} isOpen={isOpen} />
    </div>
  );
}
