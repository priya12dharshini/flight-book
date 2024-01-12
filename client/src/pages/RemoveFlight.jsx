import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import './css/remove.css'

const RemoveFlight = () => {
  const [data, setData] = useState({
    flightNumber: '',
    source: '',
    destination: '',
    date: '',
  });

  const removeFlight = async (e) => {
    e.preventDefault();
    const { flightNumber, source, destination, date } = data;
    try {
      const response = await axios.delete(`/remove-flight/${flightNumber}`, {
        data: { flightNumber, source, destination, date },
      });
      
      console.log(response.data);
      if (response.status === 200) {
        toast.success('Flight removed successfully');
      } else {
        toast.error('Failed to remove flight');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className='rem'>
      <h2 className='rTitle'>Remove Flight</h2>
      <form className='rForm' onSubmit={removeFlight}>
        <input className='rinput'
          type="text"
          placeholder="Flight Number"
          value={data.flightNumber}
          onChange={(e) => setData({ ...data, flightNumber: e.target.value })}
        />{' '}
        <br />
        <input className='rinput'
          type="text"
          placeholder="Source"
          value={data.source}
          onChange={(e) => setData({ ...data, source: e.target.value })}
        />{' '}
        <br />
        <input className='rinput'
          type="text"
          placeholder="Destination"
          value={data.destination}
          onChange={(e) => setData({ ...data, destination: e.target.value })}
        />{' '}
        <br />
        <input className='rinput'
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />{' '}
        <br />
        <button className='rbutton' type="submit">Remove</button>
      </form>
    </div>
  );
};

export default RemoveFlight;
