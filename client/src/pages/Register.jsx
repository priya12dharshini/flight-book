import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './css/register.css'

export default function Register() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        userType: '',
    })

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password, userType } = data
        try {
            const { data } = await axios.post('/register',
                {
                    name, email, password, userType
                })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login Successful. Welcome!')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='register'>
                <form className='registerForm' onSubmit={registerUser}>
                    <h2 className='registerTitle'>Register</h2>
                    <label>Name</label>
                    <input className='rinput' type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <label>Email</label>
                    <input className='rinput' type='text' placeholder='enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <label>Password</label>
                    <input className='rinput' type='text' placeholder='enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <label>User Type</label>
                    <div className='rad'>
                        <label htmlFor='Admin'>Admin</label>
                        <input type="radio" id="admin" name="userType" value="Admin" checked={data.userType === 'Admin'}
                            onChange={(e) => setData({ ...data, userType: e.target.value })} />
                        <label htmlFor='User'>User</label>
                        <input type="radio" id="user" name="userType" value="User" checked={data.userType === 'User'}
                            onChange={(e) => setData({ ...data, userType: e.target.value })} />
                    </div>
                    <br />
                    <button className='rbutton' type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
