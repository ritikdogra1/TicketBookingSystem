import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Booking from './components/Booking';
import Tickets from './components/Tickets';
import AddCart from './components/AddCart';
import Logout from './components/Logout';
import PasswordSetting from './components/PasswordSetting';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div>
      <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/tickets" element={<Tickets/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/addcart" element={<AddCart/>}/> */}
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/passwordsetting' element={<PasswordSetting/>}/>
      <Route path='/UserDetails' element={<UserDetails/>}/>
     </Routes>
    </>
    </div>
  );
}
export default App;
