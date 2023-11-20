import { Link } from "react-router-dom";
import { getCountries, allCountriesToFilter } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css"; // Importa el módulo CSS

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  useEffect(() => {
    dispatch(allCountriesToFilter());
  }, []);

  return (
    <div className="login">
      <Link to={"/home"}>
        <button className={styles["login-button"]}>
          {" "}
          <span className={styles["login-text"]}>Iniciar sesión</span>{" "}
        </button>
      </Link>
    </div>
  );
};

export default Login;
