import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlantMatch from "./pages/PlantMatch";
import MyPlants from "./pages/MyPlants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlantMatch />} />
        <Route path="/plant-match" element={<PlantMatch />} />
        <Route path="/my-plants" element={<MyPlants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;