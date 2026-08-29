import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlantMatch from "./pages/PlantMatch";
import MyPlants from "./pages/MyPlants";
import Home from "./pages/Home";
import PlantDoctor from "./pages/PlantDoctor/PlantDoctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />

        {/* طبيب النباتات */}
        <Route path="/plant-doctor" element={<PlantDoctor />} />

        {/* اكتشف نبتتك */}

        <Route path="/discover" element={<PlantMatch />} />
        <Route path="/plant-match" element={<PlantMatch />} />
        {/* نباتاتي */}

        <Route path="/my-plants" element={<MyPlants />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
