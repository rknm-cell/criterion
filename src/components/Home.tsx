import React from 'react';
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();






  return (
    <div id="Home-div">
        <h1>Home</h1>
        <button onClick={()=>{navigate('/browse')}}> </button>
        </div>
  )
}

export default Home