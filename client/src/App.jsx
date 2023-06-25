import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import './App.css'
import Home from '../src/pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Booking from './pages/Booking';
import AddFlight from './pages/AddFlight';
import RemoveFlight from './pages/RemoveFlight';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-flight' element={<AddFlight />} />
        <Route path='/remove-flight' element={<RemoveFlight />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/user' element={<UserDashboard />} />
      </Routes>

    </UserContextProvider>
  );
}

export default App;
