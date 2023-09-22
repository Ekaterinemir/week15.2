import {React, useEffect, useState} from 'react';
import './App.css';

const MOCK_API='https://650a0373f6553137159c5b85.mockapi.io/GET';



function App(){


const [houses, setHouses]= useState([{}])
let [newHouse, setNewHouse]=useState('')
let [newCounty, setNewCounty]=useState('')
let [newZipcode, setNewZipcode]=useState('')

const [updatedHouse, setUpdatedHouse]=useState('')
const [updatedCounty, setUpdatedCounty]=useState('')
const [updatedZipcode, setUpdatedZipcode]=useState('')

function getHouses(){
  fetch(MOCK_API)
  .then(data => data.json())
  .then(data => setHouses(data))
}

useEffect(() =>{
  getHouses()
},[])



function deleteHouse(id){
fetch(`${MOCK_API}/${id}`,{
  method: 'DELETE'
}) .then(() => getHouses())

}

function postNewHouse(e){
  e.preventDefault()
 
  
  fetch(MOCK_API, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      house: newHouse,
      county: newCounty,
      zipcode: newZipcode,
    })
  }) .then(()=> getHouses())
}


function updateHouse(e, houseObject){
e.preventDefault()

  let updatedHouseObject={
    ...houseObject,
    house: updatedHouse,
    county: updatedCounty,
    zipcode: updatedZipcode,

  }
  fetch(`${MOCK_API}/${houseObject.id}`,{
    method: 'PUT',
    body: JSON.stringify(updatedHouseObject),
    headers: {
      "Content-Type": "application/json"
    }
  }) .then(()=> getHouses())
}


return(
  <div className='App'>

  <form>
  <h3>Post New House</h3>
   <label>House</label>
   <input onChange={(e)=> setNewHouse=(e.target.value)}></input>
  <label>County</label>
  <input onChange={(e) => setNewCounty=(e.target.value)}></input>
  <label>Zip Code</label>
  <input onChange={(e) => setNewZipcode=(e.target.value)}></input>
  <button onClick={(e) => postNewHouse(e)}>Submit</button>
  
  </form>
  
  {houses.map((house, index)=>
    (
      <div  className='House' key={index}>
      <div>
      House: {house.house} <br></br>
      County: {house.county} <br></br>
      zipcode: {house.zipcode} <br></br>
      <button onClick={()=> deleteHouse(house.id)}>Delete</button>
      </div>
      <form>
      <h3>Update House</h3>
      <label>House</label>
      <input onChange={(e) => setUpdatedHouse(e.target.value)}></input><br></br>

      <label>County</label>
      <input onChange={(e)=> setUpdatedCounty(e.target.value)}></input><br></br>

      <label>Zip Code</label>
      <input onChange={(e)=> setUpdatedZipcode(e.target.value)}></input><br></br>
      <button onClick={(e) => updateHouse(e, house)}>Update</button>
      
      </form>
      
      </div>
    ))}
  </div>
)



}

export default App