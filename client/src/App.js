import Settings from './pages/settings/Settings';
import Topbar from './components/topbar/Topbar'
import Homepage from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from './pages/contact/Contact';
import { useContext } from 'react';
import {Context} from './context/Context'

function App() {
  const {user} = useContext(Context)

  return (
    <Router>
      <Topbar/>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/Single" element={<Single />} />
          <Route path="/write" element={user? <Write />: <Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={user? <Settings /> : <Register/>} />
          <Route path = '/contact' element={<Contact />} />
          <Route path = '/single/:postid' element={<Single />} />
        </Routes>
    </Router>
    )
}

export default App;
