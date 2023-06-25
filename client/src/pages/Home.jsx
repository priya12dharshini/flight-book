import React from 'react'
import './css/home.css'

export default function () {
  return (
    <div className='home'>
      <form className='hForm'>
      <h2 className='hTitle'>Home</h2>
      <label>Flight Number</label>
      <input className='hinput' type='text' placeholder='enter number...'  /><br/>
      <label>Source</label>
      <select className='hinput'>
      <option>Bangalore</option>
      <option>Mumbai</option>
      <option>New Delhi</option>
      <option>Pune</option>
      <option>Chennai</option>
      </select><br/>
      <label>destination</label>
      <select className='hinput'><br/>
      <option>Bangalore</option>
      <option>Mumbai</option>
      <option>New Delhi</option>
      <option>Pune</option>
      <option>Chennai</option>
      </select><br/>
      <label>Date</label>
      <input className='hinput' type='Date'/>
      <button className='hbutton' type="submit">Submit</button>
      </form>
    </div>
  )
}
