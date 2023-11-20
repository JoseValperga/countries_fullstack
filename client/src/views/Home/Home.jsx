import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries, allCountriesToFilter } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesToFilter);

  useEffect(() => {
    dispatch(allCountriesToFilter());
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Choose a Country!</h1>
      <CardsContainer countries={countries} />
    </div>
  );
};

export default Home;
