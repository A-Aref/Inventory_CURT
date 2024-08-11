
import { useEffect, useState } from 'react'
import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Inventory from './Inventory.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Routing() {

  const [page, setPage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Router>
        <Routes>
              <Route path='/' element={<Signin setPage={setPage} setUser={setUser}/>} />
              <Route path='/Register' element={<Register />} />
              <Route element={<PrivateRoute viewSet="Inventory" view={page}/>}>
                <Route path='/Inventory' element={<Inventory setPage={setPage} user={user} setUser={setUser}/>} /> 
              </Route>
              
        </Routes>
      </Router>
    </>
  )
}

export default Routing
