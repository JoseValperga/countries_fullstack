import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  //const [country, setCountry] = useState({ Activities: [] });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/countries/${id}`).then(({ data }) => {
      if (data.name) {
        setCountry(data);
      } else {
        window.alert("No hay paises con ese ID");
      }
    });
    return setCountry({});
  }, [id]);

  const formatNumber = (number) => {
    return number?.toLocaleString();
  };

  return (
    <div className={styles["detail-container"]}>
      <div className={styles.card}>
      <img src={country.flags} alt={country.name}/></div>
      <p>{country?.name}</p>
      <p>Area (km2): {formatNumber(country?.area)}</p>
      <p>Capital: {country?.capital}</p>
      <p>Continent: {country?.continents}</p>
      <p>Population: {formatNumber(country?.population)}</p>
      <p>Region: {country?.region}</p>
      <p>Subregion: {country.subregion}</p>

      {country.Activities && country.Activities.length > 0 ? (
        <div>
          <div className={styles["activity-container"]}>
            <p className={styles["available-activities"]}>
              ACTIVIDADES DISPONIBLES
            </p>
            <div className={styles["activity-items"]}>
              {country.Activities.map((actividad, index) => (
                <div key={index} className={styles["activity-item"]}>
                  <p>Activity name: {actividad.name}</p>
                  <p>Difficult: {actividad.difficult}</p>
                  <p>Duration: {actividad.duration}</p>
                  <p>Season: {actividad.season}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>SIN ACTIVIDADES DISPONIBLES</p>
      )}
    </div>
  );
};

export default Detail;
/*
{country.Activities && country.Activities.length > 0 ? (
  <div>
    <p className={styles["available-activities"]}>ACTIVIDADES DISPONIBLES          </p>
    <div className={styles["activity-container"]}>
      {country.Activities.map((actividad, index) => (
        <div key={index} className={styles["activity-item"]}>
          <p>Activity: {actividad.name}</p>
          <p>Difficult: {actividad.difficult}</p>
          <p>Duration: {actividad.duration}</p>
          <p>Season: {actividad.season}</p>
        </div>
      ))}
    </div>
  </div>
) : (
  <p>SIN ACTIVIDADES DISPONIBLES</p>
)}
*/
