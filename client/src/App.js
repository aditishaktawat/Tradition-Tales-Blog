import { useState, useEffect } from 'react';
import axios from 'axios';

import DataProvider from './context/DataProvider';

import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';

// components 
import Login from './components/account/Login.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';
import CreatePost from './components/create/CreatePost';
import DetailView from './details/DetailView';
import Update from './components/create/update.jsx';
import About from './components/about/About';
import Contact from './components/contact/Contact';


const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
  <>
  <Header />
  <Outlet />
  </>
  : <Navigate replace to='/login' />
}

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);

  const backendUrl = 'https://tradition-tales-backend.vercel.app';
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/auth/check-auth`, { withCredentials: true })
      .then((response) => {
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error('Authentication check failed:', error);
      });
  }, []);

  
  return (
      <DataProvider>
        <BrowserRouter>
        
        <div style={{marginTop: 64}}>
          <Routes>
      <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

      <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/' element={<Home />} />
      </Route>

      <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/create' element={<CreatePost />} />
      </Route>

      <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/details/:id' element={<DetailView />} />
      </Route>

      <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/update/:id' element={<Update />} />
      </Route>

      <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/about' element={<About />} />
      </Route>

      <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
      <Route path='/contact' element={<Contact />} />
      </Route>

      </Routes>
      </div>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;

