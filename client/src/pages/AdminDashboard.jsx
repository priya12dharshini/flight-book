import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/admin.css'
import axios from 'axios';

export default function AdminDashboard() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []); 

  return (
    <>
      <div className="adminpage">
        <h1 className="adminhead">Admin Dashboard</h1>
      <h3 style={{textAlign: "center"}}>Available Flights</h3>
      <div className="admin">
        <ul>
          {flights.map((flight) => (
            <li key={flight._id}>
              <strong>Flight Number:</strong> {flight.flightNumber}<br />
              <strong>Source:</strong> {flight.source}<br />
              <strong>Destination:</strong> {flight.destination}<br />
              <strong>Date:</strong> {flight.date}<br />
              <br/>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
