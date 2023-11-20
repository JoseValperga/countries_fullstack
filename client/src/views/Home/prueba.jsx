import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries); // Obtener la lista completa de países desde el estado de Redux

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const countriesToShow = countries.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h1>Esta es la vista de Home</h1>
      <CardsContainer countries={countriesToShow} />
      {/* Botones para cambiar de página */}
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex >= countries.length}>
        Siguiente
      </button>
    </>
  );
};

export default Home;
