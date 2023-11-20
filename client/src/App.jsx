import { Home, Landing, Form, Detail, Filters } from "./views/index";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar /> : null}
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="/filters" element={<Filters />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
//