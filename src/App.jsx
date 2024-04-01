import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Tramite from './pages/Tramite'
import Usuario from './pages/Usuario'
import Empleado from './pages/Empleado'
import Area from './pages/Area'
import TipoDocumento from './pages/TipoDocumento'
import FormTramiteAdd from './components/FormTramiteAdd'
import './App.css'
import { UserProvider } from './contexts/UserContext'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <UserProvider>

        <BrowserRouter>

          <Routes>
            {/* change route */}
            <Route exact path='/' element={<Login />}></Route>
            
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home />}>
                <Route exact path='/home/tramite'>
                  <Route exact path='/home/tramite/lista' element={<Tramite />}></Route>
                  <Route exact path='/home/tramite/registro' element={<FormTramiteAdd />}></Route>
                </Route>
                <Route exact path='/home/usuario' element={<Usuario />}></Route>
                <Route exact path='/home/empleado' element={<Empleado />}></Route>
                <Route exact path='/home/area' element={<Area />}></Route>
                <Route exact path='/home/tipodocumento' element={<TipoDocumento />}></Route>
              </Route>
            </Route>

          </Routes>
          
        </BrowserRouter>

      </UserProvider>
    </>
  )
}

export default App
