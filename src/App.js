import './App.css';
import { Routes ,Route } from "react-router-dom";
import Signup from "../src/components/Signup";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/home";
import List from "./components/List";
import Bookdetail from "./components/bookdetailpage";
import Orders from "./components/Userorders";
import Login from "../src/components/login";
import Orderdetailpage from './components/Orderdetailpage';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/book/list' element={<List/>}/>
      <Route path='/book/:bookid' element={<Bookdetail/>}/>
      <Route path='/book/userorders' element={<Orders/>}/>
      <Route path='/book/userorders/:bookid' element={<Orderdetailpage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
