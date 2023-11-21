import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Tramite from './pages/Tramite'
import Usuario from './pages/Usuario'
import Empleado from './pages/Empleado'
import Area from './pages/Area'
import TipoDocumento from './pages/TipoDocumento'
import FormTramiteAdd from './components/FormTramiteAdd'
import './App.css'

function App() {
  const bb=document.querySelector('.sidebar-mini');
  const ff=document.getElementById('sidebar-overlay');
  ff.addEventListener('click',()=>{
    bb.classList.replace('sidebar-open','sidebar-closed')
    bb.classList.add('sidebar-collapse')
  })
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/' element={<Login />}></Route> */}
          <Route exact path='/' element={<Home />}></Route>
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
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
