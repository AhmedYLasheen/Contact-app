import "./App.css";
import Home from "./Component/Home/Home";
import AddContact from "./Component/AddContact/AddContact";
import {  Route, Routes } from "react-router-dom";


function App() {
  return (
   <>
    

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="add" element={<AddContact/>}/>
     </Routes>

   </>
  );
}

export default App;
