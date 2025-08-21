import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
     
     
     <div className="min-h-screen overflow-x-hidden max-w-full">
       <main> <Outlet/></main>
    </div>
    </>
  );
}

export default App;