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
        if (data.userType === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/user');
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
        <input className='linput' type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /><br />
        <label><b>Password</b></label>
        <input className='linput' type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} /><br />
        <label><b>User Type</b></label>
        <div className='rad'>
          <label htmlFor='Admin'>Admin</label>
          <input type="radio" id="admin" name="userType" value="Admin" checked={data.userType === 'Admin'}
            onChange={(e) => setData({ ...data, userType: e.target.value })} />
          <label htmlFor='User'>User</label>
          <input type="radio" id="user" name="userType" value="User" checked={data.userType === 'User'}
            onChange={(e) => setData({ ...data, userType: e.target.value })} />
        </div>
        <br />
        <button className='lbutton' type='submit'>Login</button>
      </form>
    </div>
  )
}
