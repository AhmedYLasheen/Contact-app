import "./App.css";
import Home from "./Component/Home/Home";
import AddContact from "./Component/AddContact/AddContact";
import { Route, Routes } from "react-router-dom";
import UpdatContact from "./Component/UpdatContact/UpdatContact";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddContact />} />
        <Route path="updat/:id" element={<UpdatContact />} />
      </Routes>
    </>
  );
}

export default App;
