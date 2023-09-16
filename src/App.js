import './App.css';
import { Routes ,Route } from "react-router-dom";
import Signup from "../src/components/Signup";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/home";
import List from "./components/List";
import Bookdetail from "./components/bookdetailpage";
import Login from "../src/components/login";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/book/list' element={<List/>}/>
      <Route path='/book/view/:bookid' element={<Bookdetail/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
