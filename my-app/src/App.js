
//Using the Houses API, or any open API of your choice you can find online, create a single page 
//that allows for all 4 CRUD operations to be performed on a resource from the API.
//Create a React component (or more, if needed) to represent the resource.
//Make all forms and other necessary UI pieces their own components as reasonable.

import React, { useEffect, useState } from 'react';
import './App.css';

// Define the mock API endpoint URL
const MOCK_API = 'https://650a0373f6553137159c5b85.mockapi.io/GET';

// Define the main functional component App
function App() {
// State variables for managing house data and input values
  const [houses, setHouses] = useState([{}]);
  const [newHouse, setNewHouse] = useState('');
  const [newCounty, setNewCounty] = useState('');
  const [newZipcode, setNewZipcode] = useState('');
  const [updatedHouse, setUpdatedHouse] = useState('');
  const [updatedCounty, setUpdatedCounty] = useState('');
  const [updatedZipcode, setUpdatedZipcode] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Function to fetch house data from the mock API
  function getHouses() {
    fetch(MOCK_API)
      .then((data) => data.json())
      .then((data) => setHouses(data));
  }
 
 // useEffect hook to fetch houses data 
  useEffect(() => {
    getHouses();
  }, []);
 
  // Function to delete a house by its ID
  function deleteHouse(id) {
    fetch(`${MOCK_API}/${id}`, {
      method: 'DELETE'
    }).then(() => getHouses());
  }
 
  // Function to post a new house to the mock API
  function postNewHouse(e) {
    e.preventDefault();

    fetch(MOCK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        house: newHouse,
        county: newCounty,
        zipcode: newZipcode
      })
    })
      .then(() => {
        getHouses();
        setNewHouse('');
        setNewCounty('');
        setNewZipcode('');
      })
      .catch((error) => console.error('Error posting new house:', error));
  }
   
  // Function to update a house with new information
  function updateHouse(e, houseObject) {
    e.preventDefault();

    const updatedHouseObject = {
      ...houseObject,
      house: updatedHouse,
      county: updatedCounty,
      zipcode: updatedZipcode
    };

    fetch(`${MOCK_API}/${houseObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedHouseObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        getHouses();
        setUpdatedHouse('');
        setUpdatedCounty('');
        setUpdatedZipcode('');
      })
      .catch((error) => console.error('Error updating house:', error));
  }
 
  // Function to handle submission of the contact form
  function submitContactForm(e) {
    e.preventDefault();
    console.log('Contact form submitted!', {
      name: contactName,
      email: contactEmail,
      message: contactMessage
    });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  }
  // The return statement defines what the component should render. It defines structure of the component, 
  //including a navbar, a container for house forms and data, and a contact form with input fields for name, email,
  // and message.
  return (
    <div>
      <nav className='navbar'>
        <h1>Trust and Confidence</h1>
      </nav>

      <div className='container'>
        <form className='form-container'>
          <h3>Post New House</h3>
          <label>House</label>
          <input
            value={newHouse}
            onChange={(e) => setNewHouse(e.target.value)}
          />
          <label>County</label>
          <input
            value={newCounty}
            onChange={(e) => setNewCounty(e.target.value)}
          />
          <label>Zip Code</label>
          <input
            value={newZipcode}
            onChange={(e) => setNewZipcode(e.target.value)}
          />
          <button onClick={(e) => postNewHouse(e)}>Submit</button>
        </form>

        <div className='house-container'>
          {houses.map((house, index) => (
            <div className='house' key={index}>
              <div>
                House: {house.house} <br />
                County: {house.county} <br />
                Zipcode: {house.zipcode} <br />
                <button onClick={() => deleteHouse(house.id)}>Delete</button>
              </div>
              <form>
                <h3>Update House</h3>
                <label>House</label>
                <input
                  value={updatedHouse}
                  onChange={(e) => setUpdatedHouse(e.target.value)}
                />
                <br />
                <label>County</label>
                <input
                  value={updatedCounty}
                  onChange={(e) => setUpdatedCounty(e.target.value)}
                />
                <br />
                <label>Zip Code</label>
                <input
                  value={updatedZipcode}
                  onChange={(e) => setUpdatedZipcode(e.target.value)}
                />
                <br />
                <button onClick={(e) => updateHouse(e, house)}>Update</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div className='contact-container'>
        <form className='contact-form'>
          <h3>Contact Us</h3>
          <label>Name</label>
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            type='text'
            placeholder='Your name'
          />
          <label>Email</label>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            type='email'
            placeholder='Your email'
          />
          <label>Message</label>
          <textarea
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          rows='5'
          placeholder='Your message'
        ></textarea>
        <button onClick={submitContactForm}>Submit</button>
      </form>
    </div>
  </div>
);
}

export default App;
