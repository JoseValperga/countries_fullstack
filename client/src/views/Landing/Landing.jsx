import styles from "./Landing.module.css"
import Login from "../Login/Login"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../redux/actions";

const Landing = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCountries());
  }, []);


    return (
      <div className={styles["landing-container"]}>
        <div className={styles["login-container"]}>
        {Login()}
      </div>
      </div>
    );
  };
  
  export default Landing;