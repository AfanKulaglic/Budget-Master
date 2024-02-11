import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './pages/Start';
import { Home } from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/start.css';
import './styles/home.css';
import { Authentification } from './pages/Authentification';
import { EditProfile } from './pages/EditProfile';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route
          path="/start"
          element={<Start />}
        ></Route>
        <Route
          path="/"
          element={<Authentification />}
        ></Route>
        <Route
          path="/home"
          element={<Home />}
        ></Route>
        <Route
          path="/editProfile"
          element={<EditProfile />}
        ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
