import axios from "axios";
import { addFilteredCountry } from "../../redux/actions";
import { useDispatch } from "react-redux";

export const Onsearch = async (name) => {
  dispatch = useDispatch();
  try {
    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${name}`
    );
    dispatch(addFilteredCountry(data));
  } catch (error) {
    return error.message;
  }
};
