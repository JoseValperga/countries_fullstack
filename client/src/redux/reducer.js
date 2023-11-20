import {
  GET_COUNTRIES,
  ADD_COUNTRY,
  CLEAN_SEARCH,
  DELETE_COUNTRY,
  ALL_COUNTRIES_TO_FILTER,
  ORDER_CARDS_ONE,
  ORDER_CARDS_TWO,
  FILTER_CARDS,
  CLONE_TO_FILTER,
  BY_CONTINENT,
  BY_TOURIST_ACTIVITY,
} from "./actions-types";

const initialState = {
  countries: [],
  loaded: false,
  countriesToFilter: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      if (state.loaded === false) {
        return {
          ...state,
          countries: action.payload,
          loaded: true,
          countriesToFilter: action.payload,
        };
      } else {
        return state;
      }

    case ADD_COUNTRY:
      return {
        ...state,
        countriesToFilter: [...state.countriesToFilter, ...action.payload],
      };

    case CLEAN_SEARCH:
      return { ...state, countriesToFilter: action.payload };

    case DELETE_COUNTRY:
      return { ...state, countriesToFilter: action.payload };

    case ALL_COUNTRIES_TO_FILTER:
      return { ...state, countriesToFilter: state.countries };

    case CLONE_TO_FILTER:
      return { ...state, countriesToFilter: state.countriesToFilter };

    case ORDER_CARDS_ONE:
      const orderAux = [...state.countriesToFilter];
      if (action.payload === "ASCENDING") {
        orderAux.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "DESCENDING") {
        orderAux.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }
      return { ...state, countriesToFilter: orderAux };

    case ORDER_CARDS_TWO:
      const orderAuxiliar2 = [...state.countriesToFilter];

      if (action.payload === "ASCENDING") {
        orderAuxiliar2.sort((a, b) => a.population - b.population);
      }

      if (action.payload === "DESCENDING") {
        orderAuxiliar2.sort((a, b) => b.population - a.population);
      }
      return { ...state, countriesToFilter: orderAuxiliar2 };

    case BY_CONTINENT:
      const continentFiltered = state.countriesToFilter.filter(
        (continent) => continent.continents === action.payload
      );
      return { ...state, countriesToFilter: continentFiltered };

    case BY_TOURIST_ACTIVITY:
      const activityFiltered = state.countriesToFilter.filter((objeto) =>
        objeto.Activities.some((actividad) => actividad.name === action.payload)
      );

      /*const activityFiltered = state.countriesToFilter.filter(
        (activity) => activity.Activities.name === action.payload
      );*/

      return { ...state, countriesToFilter: activityFiltered };

    default:
      return { ...state };
  }
};
export default rootReducer;
