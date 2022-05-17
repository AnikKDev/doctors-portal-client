import './App.css';
import Navbar from './Pages/Home/Shared/Navbar/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import Appointment from './Pages/Appointment/Appointment';
import RequireAuth from './RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import Review from './Pages/Dashboard/Review';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import RequireAdmin from './RequireAdmin';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>

        } />
        <Route path="dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>

        } >
          <Route index element={<MyAppointment />}></Route>
          <Route path="review" element={<Review />}></Route>
          <Route path="history" element={<MyHistory />}></Route>
          <Route path="users" element={<RequireAdmin>
            <Users />
          </RequireAdmin>}></Route>
          <Route path="addDoctor" element={<RequireAdmin>
            <AddDoctor />
          </RequireAdmin>}></Route>
          <Route path="manageDoctors" element={<RequireAdmin>
            <ManageDoctors />
          </RequireAdmin>}></Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
