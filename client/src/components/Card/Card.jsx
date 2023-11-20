import { useSelector } from "react-redux";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCountryFiltered } from "../../redux/actions";

const Card = (props) => {
  const countries = useSelector((state) => state.countriesToFilter);
  const dispatch = useDispatch();

  const onClose = (id) => {
    const countriesFiltered = countries.filter((pais) => pais.id !== id);
    dispatch(deleteCountryFiltered(countriesFiltered));
  };

  return (
    <div className={style.card}>
     <Link to={`/detail/${props.id}`}>
        <img src={props.flags} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <p>{props.continents}</p>
      <button onClick={() => onClose(props.id)}>X</button>
    </div>
  );
};
export default Card;
/**/