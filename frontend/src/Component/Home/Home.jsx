import React from 'react';
import { 
  BsFillArchiveFill, 
  BsPeopleFill, 
} from 'react-icons/bs';
import PersonIcon from '@mui/icons-material/Person';

import "./Home.css";
import { useNavigate } from 'react-router-dom';

function Home({ eventCount, No_of_Events }) {
  const events = JSON.parse(localStorage.getItem('events')) || []; 
  const myEvents = JSON.parse(localStorage.getItem('my_registered_events')) || 0; 
  const Navigate=useNavigate()
  const NavigatetoEventList=()=>
  {
    Navigate('/events')
  }
  return (
    <main className="main-container p-6 bg-gray-100 min-h-screen">
      <div className="main-title mb-8">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">Dashboard</h3>
      </div>

      <div className="main-cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="card-inner flex items-center space-x-4 mb-4">
            <BsFillArchiveFill className="card_icon text-blue-500 text-4xl" />
            <h3 className="text-lg font-medium text-gray-700">Total Events</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{eventCount}</h1>
        </div>

        <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="card-inner flex items-center space-x-4 mb-4">
            <BsPeopleFill className="card_icon text-purple-500 text-4xl" />
            <h3 className="text-lg font-medium text-gray-700">Total Registrations</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{No_of_Events}</h1>
        </div>

        <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="card-inner flex items-center space-x-4 mb-4">
            <PersonIcon className="card_icon text-green-500 text-4xl" />
            <h3 className="text-lg font-medium text-gray-700">My Registrations</h3>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{myEvents}</h1>
        </div>
      </div>

      <div className="interest-container">
        <div className="interest-head">
          <h3>Events</h3>
        </div>
        <ul>
          {events.map(event => (
            <li onClick={NavigatetoEventList} key={event.id}>{event.title.toUpperCase()}</li> 
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Home;
