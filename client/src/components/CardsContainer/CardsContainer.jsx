import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CardsContainer = ({ countries }) => {

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  const comienzo = (paginaActual - 1) * itemsPorPagina;
  const final = comienzo + itemsPorPagina;

  const paisesAMostrar = countries.slice(comienzo, final);

  const continentes = countries.slice().map((pais) => pais.continents);
  const continentesAMostrar = [...new Set(continentes)];

  const cambiador = (pagina) => {
    setPaginaActual(pagina);
  };
  
  useEffect(() => {
    setPaginaActual(1);
  }, [countries]);


  return (
    <div>
      <div>
        <button className={style.button}
          onClick={() => cambiador(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <button className={style.button}
          onClick={() => cambiador(paginaActual + 1)}
          disabled={final >= countries.length}
        >
          Siguiente
        </button>
      </div>

      <div className={style.container}>
        {paisesAMostrar.map((country) => {
          return (
            <div key={country.id} className={style.cardWrapper}>
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
        })}
      </div>
    </div>
  );
};

export default CardsContainer;
