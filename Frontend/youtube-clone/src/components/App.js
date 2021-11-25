import React from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import RecommendedVideos from './ReccomendedVideos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route path='/' element={<Header/>}>
              <div className="app_mainpage">
                <SideBar />
                <RecommendedVideos />
              </div>
            </Route>
          </Routes>
      </Router>
    </div>
  )
}

export default App;




