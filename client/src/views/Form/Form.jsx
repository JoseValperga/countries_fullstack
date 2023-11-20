import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import axios from "axios";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const season = ["Spring", "Summer", "Autumn", "Winter"];
  const difficult = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [form, setForm] = useState({
    countryId: [],
    name: "",
    difficult: 1,
    duration: "",
    season: "",
  });

  const [errors, setErrors] = useState({
    countryId: "",
    name: "",
    difficult: 1,
    duration: "",
    season: "",
  });

  //const [responseMessages, setResponseMessages] = useState([]);

  const changeHandler = (event) => {
    const whoFiredEvent = event.target.name;
    const valueEvent = event.target.value;

    if (whoFiredEvent !== "countryId") {
      validate({ ...form, [whoFiredEvent]: valueEvent });
      setForm({ ...form, [whoFiredEvent]: valueEvent });
    } else {
      const selectedOptions = Array.from(event.target.selectedOptions).map(
        (option) => option.value
      );
      setForm({ ...form, [whoFiredEvent]: selectedOptions });
    }
  };

  const validate = (form) => {
    if (form.name === "") setErrors({ ...errors, name: "Nombre vacio" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const errors = {};

    if (form.countryId.length === 0) {
      errors.countryId = "Debes seleccionar al menos un país.";
    }

    if (!form.name.trim()) {
      errors.name = "El nombre no puede estar vacío.";
    }

    if (!form.duration.trim()) {
      errors.duration = "La duración no puede estar vacía.";
    }

    if (!form.season) {
      errors.season = "Debes seleccionar una temporada.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const auxiliar = JSON.parse(JSON.stringify(form));
    const { countryId, ...rest } = auxiliar;
    const objectsArray = countryId.map((country) => ({
      countryId: country,
      ...rest,
    }));

    objectsArray.forEach((toSend) => {
      const objetoBuscado = countries.find(
        (objeto) => objeto.name === toSend.countryId
      );

      const idPais = objetoBuscado.id;
      toSend.countryId = idPais;

      axios
        .post("http://localhost:3001/activities", toSend)
        .then((res) => {
          alert("Actividad almacenada");
        })
        .catch((error) => {
          alert("Error en la solicitud:", error);
        });
    });

    setForm({
      countryId: [],
      name: "",
      difficult: 1,
      duration: "",
      season: season[0],
    });
    setErrors({});
  };

  const countriesFiltered = countries
    .map((element) => {
      return element.name;
    })
    .sort();
    
  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-wrapper"]}>
        <form onSubmit={submitHandler}>
          <div className={styles["form-field"]}>
            <label>Country: </label>
            <div className={styles["select-container"]}>
              <select
                multiple
                value={form.countryId}
                onChange={changeHandler}
                name="countryId"
                style={{ width: "100%" }}
              >
                {countriesFiltered.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {errors.countryId && (
                <span className={styles["error"]}>{errors.countryId}</span>
              )}
            </div>
          </div>

          <div className={styles["form-field"]}>
            <label>Name: </label>
            <input
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            <div>
              {errors.name && (
                <span className={styles["error"]}>{errors.name}</span>
              )}
            </div>
          </div>

          <div>
            <label>Difficult: </label>
            <select
              value={form.difficult}
              onChange={changeHandler}
              name="difficult"
            >
              {difficult.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["form-field"]}>
            <label>Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={changeHandler}
              name="duration"
            />
            <div>
              {errors.duration && (
                <span className={styles["error"]}>{errors.duration}</span>
              )}
            </div>
          </div>

          <div>
            <label>Season: </label>
            <select value={form.season} onChange={changeHandler} name="season">
              {season.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
            <div>
              {errors.season && (
                <span className={styles["error"]}>{errors.season}</span>
              )}
            </div>
          </div>

          <button type="submit" className={styles["submit-button"]}>
            SUBMIT
          </button>
          <button
            type="button"
            className={styles["cancel-button"]}
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
//
