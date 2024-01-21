import "./App.css";
import Home from "./Component/Home/Home";
import AddContact from "./Component/AddContact/AddContact";
import {  Route, Routes } from "react-router-dom";
import UpdatUser from "./Component/UpdatUser/UpdatUser";




function App() {
  return (
   <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="add" element={<AddContact/>}/>
      <Route path="update/:id" element={<UpdatUser/>}/>
     </Routes>
   </>
  );
}

export default App;
