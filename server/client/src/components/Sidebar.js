import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData';
import '../assets/css/Sidebar.css';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';

const Sidebar = (props) => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
           <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaBars onClick={showSidebar}/>
            </Link>
            <Link className="nav-logout" to="/logout">Logout</Link> 
            </div>
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
                {SidebarData.map((item, index) => {
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
        </>
    )
}

export default Sidebar
