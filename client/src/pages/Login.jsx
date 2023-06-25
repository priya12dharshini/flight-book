import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import './css/login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
    userType: 'User',
  });

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password, userType } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
        userType,
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({});
        if (data.userType === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='login'>
      <form className='loginForm' onSubmit={loginUser}>
        <h2 className='loginTitle'>Login</h2>
        <label><b>Email</b></label>
        <input className='linput' type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /><br/>
        <label><b>Password</b></label>
        <input  className='linput'  type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} /><br/>
        <label><b>User Type</b></label>
        <select  className='linput'  value={data.userType} onChange={(e) => setData({ ...data, userType: e.target.value })}><br/>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select><br/>
        <button className='lbutton' type='submit'>Login</button>
      </form>
    </div>
  )
}
