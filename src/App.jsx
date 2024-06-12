import './App.css'
import { useMemo } from "react";
import { useSelector } from "react-redux";
import HomePage from './scenes/Homepage';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import WordBowl from './components/WordBowl';
import LetterGrid from './components/WordBowl.jsx';
// import GamePage from './scenes/Gamepage';
function App() {


  return (
    <div className="app">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/play"
            element={<LetterGrid/>}
          />
        
        </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
