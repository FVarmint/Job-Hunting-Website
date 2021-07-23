import React , {useState} from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData';
import '../assets/css/Sidebar.css';


const Header = (props) => {

  const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
      
      <Navbar bg="light" expand="lg">
        <Link to='#' className='menu-bars'>
                <FaBars onClick={showSidebar}/>
            </Link>
      <Navbar.Brand href="#">{props.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                
                <li className="navbar-toggle">
                    <Link to="#" className='menu-bars'>
                        <AiOutlineClose />
                    </Link>
                </li>
                <Link to ="#" className='menu-bars'>
                      <AiOutlineUser />
                    <Navbar.Brand href="#">{props.loggedInUser}</Navbar.Brand>
                    </Link>
                {SidebarData.map((item, index) =>{
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                      </Link>
                      </li>
                  )
                } )}
            </ul>
        </nav> 
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default Header
