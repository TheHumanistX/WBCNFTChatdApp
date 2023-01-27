import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage.js';
import Mint from './Components/Mint.js';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">
            <h1><a href="#">GrandPa's Chat</a></h1>
          </div>

          <ul>
            <li><a href="./">Home</a></li>
            <li className="nav-cta"><a href="/Mint">Mint</a></li>
          </ul>
        </nav>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Mint" element={<Mint />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
