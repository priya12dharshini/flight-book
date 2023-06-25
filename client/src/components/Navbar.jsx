import { Link } from "react-router-dom"
import './navbar.css'
export default function Navbar() {
  return (
    <div className="navcenter">
    <nav className="navList">
      <Link to='/' className="navItem"><b>Home</b></Link>
      <Link to='/register' className="navItem"><b>Register</b></Link>
      <Link to='/login' className="navItem"><b>Login</b></Link>
      <Link to='/admin' className="navItem"><b>Admin</b></Link>
      <Link to='/user' className="navItem"><b>User</b></Link>
      <Link to='/add-flight' className="navItem"><b>AddFlight</b></Link>
      <Link to='/remove-flight' className="navItem"><b>RemoveFlight</b></Link>
    </nav>
    </div>
  )
}
