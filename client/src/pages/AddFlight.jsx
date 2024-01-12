import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import './css/add.css'

const AddFlight = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    flightNumber: '',
    source: '',
    destination: '',
    date: '',
})

const addFlight = async (e) => {
  e.preventDefault();
  const { flightNumber, source, destination, date } = data
  try {
      const { data } = await axios.post('/add-flight',
          {
             flightNumber, source, destination, date
          })
      if (data.error) {
          toast.error(data.error)
      } else {
          setData({
            flightNumber: '',
            source: '',
            destination: '',
            date: '',
          });
        
          toast.success('Added Successful. Welcome!')
          navigate('/admin')
      }
  } catch (error) {
      console.log(error)
  }
}

  return (
    <div className='add'>
      <h2 className='addTitle'>Add Flight</h2>
      <form className='addForm' onSubmit={addFlight}>
      <input className='ainput'
        type="text"
        placeholder="Flight Number"
        value={data.flightNumber} onChange={(e) => setData({ ...data, flightNumber: e.target.value })}
      /> <br />
      <input className='ainput'
        type="text"
        placeholder="Source"
        value={data.source} onChange={(e) => setData({ ...data, source: e.target.value })}
      /> <br/>
      <input className='ainput'
        type="text"
        placeholder="Destination"
        value={data.destination} onChange={(e) => setData({ ...data, destination: e.target.value })}
      /> <br />
      <input className='ainput'
        type="date"
        value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })}
      /> <br />
      <button className='abutton' type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddFlight;
