import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  addFilteredCountry,
  cleanSearch,
  getCountries,
  allCountriesToFilter,
} from "../../redux/actions";

import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(true);
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = (name) => {
    dispatch(addFilteredCountry(name));
  };

  const cleanScreen = () => {
    dispatch(cleanSearch());
  };

  const loadAll = () => {
    //dispatch(getCountries());
    dispatch(allCountriesToFilter());
  };

  return (
    <div>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        disabled={false}
      />

      <button
        className={style.button}
        onClick={() => {
          onSearch(name);
          setName("");
        }}
        disabled={!isButtonEnabled}
      >
        Search
      </button>

      <button
        className={style.button}
        onClick={() => {
          cleanScreen();
        }}
      >
        Clean Screen
      </button>

      <button
        className={style.button}
        onClick={() => {
          loadAll();
        }}
      >
        Load All
      </button>

      <Link to="/filters">
        <button className={style.button}>Filters</button>
      </Link>
    </div>
  );
};

export { Searchbar };
