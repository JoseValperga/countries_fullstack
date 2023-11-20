import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { Searchbar } from "../Searchbar/Searchbar";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Searchbar />

      <Link to="/home">
        <button className={style.button}>START</button>
      </Link>

      <Link to="/create">
        <button className={style.button}>ADD ACTIVITIES</button>
      </Link>
      
      <Link to="/">
        <button className={style.button}>LOG OUT</button>
      </Link>
    </div>
  );
};
export default NavBar;