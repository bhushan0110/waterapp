import './App.css';
import Dashboard from './components/Dashboard';
import FlatDetails from './components/FlatDetails';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}></Route>
          <Route exact path='/flatDetails' element={<FlatDetails/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
