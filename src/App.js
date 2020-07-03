import React from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import dotenv from 'dotenv';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
dotenv.config({path: '../.env'});

function App() {
  console.log(process.env.PORT);
  const socket = socketIOClient('http://localhost:5000/');
  return (
    <div className="App">
      <Header></Header>
      <Sidebar></Sidebar>
    </div>
  );
}

export default App;
