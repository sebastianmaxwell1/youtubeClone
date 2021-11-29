import React from 'react';
import '../styles/App.css';
import Header from './Header';
import SideBar from './SideBar';
import RecommendedVideos from './ReccomendedVideos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <SideBar />
        <RecommendedVideos />
      </Router>
    </div>
  )
}

export default App;




