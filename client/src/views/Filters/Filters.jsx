//import { Card } from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getCountries,
  orderCards,
  filterCards,
  filterCardsAct,
  cloneToFilter,
  allCountriesToFilter,
} from "../../redux/actions";

import {
  ASCENDING,
  DESCENDING,
  BY_COUNTRY,
  BY_POPULATION,
  BY_CONTINENT,
  BY_TOURIST_ACTIVITY,
} from "../../redux/actions-types";

import CardsContainer from "../../components/CardsContainer/CardsContainer";
import React from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const auxiliar = useSelector((state) => state.countriesToFilter);

  const [orderOneValue, setOrderOneValue] = useState("ASCENDING");
  const [orderTwoValue, setOrderTwoValue] = useState("BY_COUNTRY");
  const [filterValueContinent, setFilterValueContinent] = useState("");
  const [filterValueActivity, setFilterValueActivity] = useState("");

  //Continentes unicos en auxiliar
  let continents = [];
  auxiliar.forEach((country) => {
    if (!continents.includes(country.continents)) {
      continents.push(country.continents);
    }
  });
  0;
  continents.unshift("Choose a Continent");
  //Aplanado de array de actividades

  let activities = auxiliar.flatMap((country) => {
    return country.Activities.map((activity) => ({
      id: country.id,
      activityName: activity.name,
    }));
  });

  let activitiesToFilter = [];
  activities.forEach((elemento) => {
    if (!activitiesToFilter.includes(elemento.activityName)) {
      activitiesToFilter.push(elemento.activityName);
    }
  });

  activitiesToFilter.unshift("Choose an Activity");

  const handleOrderOne = (event) => {
    const selectedValue = event;
    setOrderOneValue(selectedValue);
    dispatch(orderCards(selectedValue, orderTwoValue));
  };

  const handleOrderTwo = (event) => {
    const selectedValue = event;
    setOrderTwoValue(selectedValue);
    dispatch(orderCards(orderOneValue, selectedValue));
  };

  const handleFilterContinents = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Choose a Continent") {
      setFilterValueContinent("Choose a Continent");
      return;
    }
    setFilterValueContinent(selectedValue);
    dispatch(filterCards(selectedValue));
    return;
  };

  const handleFilterActivities = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Choose an Activity") {
      setFilterValueActivity("Choose an Activity");
      return;
    }
    setFilterValueActivity(selectedValue);
    dispatch(filterCardsAct(selectedValue));

    activities = auxiliar.flatMap((country) => {
      return country.Activities.map((activity) => ({
        id: country.id,
        activityName: activity.name,
      }));
    });

    activitiesToFilter = [];
    activities.forEach((elemento) => {
      if (!activitiesToFilter.includes(elemento.activityName)) {
        activitiesToFilter.push(elemento.activityName);
      }
    });
    activitiesToFilter.unshift("Choose an Activity");

    return;
  };

  return (
    <div className={styles["filters-container"]}>
      <div className={styles["button-select-container"]}>
        <div className={styles["boton1"]}>
          <div className={styles["order-buttons"]}>
            <button onClick={() => handleOrderOne(ASCENDING)}>ASCENDING</button>
            <button onClick={() => handleOrderOne(DESCENDING)}>
              DESCENDING
            </button>

            <h6> {`${orderOneValue}`}</h6>
          </div>
        </div>

        <div className={styles["boton1"]}>
          <div className={styles["order-buttons"]}>
            <button onClick={() => handleOrderTwo(BY_COUNTRY)}>
              BY COUNTRY
            </button>
            <button onClick={() => handleOrderTwo(BY_POPULATION)}>
              BY POPULATION
            </button>

            <h6> {`${orderTwoValue}`}</h6>
          </div>
        </div>

        <div className={styles["selectores"]}>
          <div className={styles["select-container"]}>
            <select onChange={handleFilterContinents}>
              {continents.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
            <h6> {filterValueContinent}</h6>
          </div>
        </div>

        <div className={styles["selectores"]}>
          <div className={styles["select-container"]}>
            <select onChange={handleFilterActivities}>
              {activitiesToFilter.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
            <h6> {filterValueActivity}</h6>
          </div>
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <CardsContainer countries={auxiliar} />
      </div>
    </div>
  );
};
export default Filters;

/*{auxiliar?.map((country) => {
  return (
    <div key={country.id}>
    <Card
    id={country.id}
    name={country.name}
    flags={country.flags}
    capital={country.capital}
    region={country.region}
    subregion={country.subregion}
    area={country.area}
    population={country.population}
    continents={country.continents}
    />
    </div>
    );
  })}*/
