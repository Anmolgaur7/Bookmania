import './App.css';
import { Routes ,Route } from "react-router-dom";
import Signup from "../src/components/Signup";
import Navbar from "../src/components/Navbar";
import List from "./components/List";
import Login from "../src/components/login";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<h1>home</h1>}/>
      <Route path='/book/list' element={<List/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
