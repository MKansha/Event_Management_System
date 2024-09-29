import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsCart3, 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsListCheck, 
  BsMenuButtonWideFill, 
  BsFillGearFill 
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, toggleSidebar }) { 
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar sidebar-responsive" : "sidebar"}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header'/> Events
        </div>
        <span className='icon close_icon' onClick={toggleSidebar}>X</span> 
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/home">
            <BsGrid1X2Fill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/events">
            <BsFillArchiveFill className='icon'/>  Events
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/registered_events">
            <BsFillGrid3X3GapFill className='icon'/> Registered Events
          </Link>
        </li>
        
      </ul>
    </aside>
  );
}

export default Sidebar;
