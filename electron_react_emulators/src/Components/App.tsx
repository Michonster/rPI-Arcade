import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Emulators from './Emulators';
import Startup from './Startup';


function App() {

  return (
    <div className='App'>
      <Router>
            <Routes>
                <Route path="/" element={<Startup />} />
                <Route path="/emulator" element={<Emulators />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
