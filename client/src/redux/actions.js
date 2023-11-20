import axios from "axios";
import {
  GET_COUNTRIES,
  GET_COUNTRY,
  ADD_COUNTRY,
  CLEAN_SEARCH,
  DELETE_COUNTRY,
  ALL_COUNTRIES_TO_FILTER,
  ORDER_CARDS_ONE,
  ORDER_CARDS_TWO,
  FILTER_CARDS,
  CLONE_TO_FILTER,
  ASCENDING,
  DESCENDING,
  BY_COUNTRY,
  BY_POPULATION,
  BY_CONTINENT,
  BY_TOURIST_ACTIVITY,
} from "./actions-types";

export const getCountries = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/countries");
      const countries = apiData.data;
      dispatch({ type: GET_COUNTRIES, payload: countries });
    } catch (error) {
      alert("No se cargó la base de datos");
    }
  };
};

export const addFilteredCountry = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      const country = apiData.data;
      dispatch({ type: ADD_COUNTRY, payload: country });
    } catch (error) {
      alert("No se ecnontró el Country");
    }
  };
};

export const cleanSearch = () => {
  return { type: CLEAN_SEARCH, payload: [] };
};

export const deleteCountryFiltered = (countriesFiltered) => {
  return { type: DELETE_COUNTRY, payload: countriesFiltered };
};

export const allCountriesToFilter = () => {
  return { type: ALL_COUNTRIES_TO_FILTER, payload: [] };
};

export const orderCards = (orderAscDes, orderCouPop) => {

  if (orderCouPop === BY_COUNTRY) {
    return { type: ORDER_CARDS_ONE, payload: orderAscDes };
  }

  if (orderCouPop === BY_POPULATION) {
    return { type: ORDER_CARDS_TWO, payload: orderAscDes };
  }
};

export const filterCards = (value) => {
  return { type: BY_CONTINENT, payload: value };
};
export const filterCardsAct = (value) => {
  return { type: BY_TOURIST_ACTIVITY, payload: value };
};

export const cloneToFilter = () => {
  return { type: CLONE_TO_FILTER, payload: [] };
};
