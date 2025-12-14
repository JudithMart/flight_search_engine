import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/flight/:id" element={<FlightDetails />} /> */}
    </Routes>
  );
}

export default App;
