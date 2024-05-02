import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/">Register</Link>
      <Link to="/">Login</Link>
      <Link to="/">Profile</Link>
    </nav>
  )
}

export default Navbar
