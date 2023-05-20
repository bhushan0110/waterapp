import './App.css';
import Dashboard from './components/Dashboard';
import DateWise from './components/DateWise';
import FlatDetails from './components/FlatDetails';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ProtoBuff from './components/ProtoBuff';
import Results from './components/Results';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}></Route>
          <Route exact path='/flatDetails' element={<FlatDetails/>}></Route>
          <Route exact path='/customRecords' element={<DateWise/>}></Route>
          <Route exact path='/proto' element={<ProtoBuff/>}></Route>
          <Route exact path='/results' element={<Results/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
