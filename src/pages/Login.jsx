import { useContext, useEffect, useState } from 'react';
import '../templates/AdminLTE-3.2.0/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import { alertMessage } from '../libraries/alertMessage';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Login=()=> {

  const userData = {
    user_name: '',
    user_password: ''
  }

  const [user, setUser] = useState(userData);
  const { handleUser, isAuth, handleAuth } = useContext(UserContext)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/usuario/getLogin/${user.user_name}/${user.user_password}`);
      const data = await response.json();
      // console.log(data);

      if (data) {
        let timerInterval;
        Swal.fire({
          title: "Bienvenido",
          text: `Hola ${data.Empleado.employee_name + ' ' + data.Empleado.maternal_surname + ' ' + data.Empleado.paternal_surname}`,
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            //we load the data employee
            handleUser(data);
            //we update the autentication of user to true
            handleAuth(true);
            //we save the values in the localstorage
            saveDataLocalStorage(data, true);
          }
        });

      } else {
        throw Error('Nombre de usuario o contraseña incorrecta')
      }
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
    }
  }

  const saveDataLocalStorage = (data, value) => {
    sessionStorage.setItem('user', JSON.stringify(data))
    sessionStorage.setItem('auth', value)
    // localStorage.clear();
  }

  return (
    <>
      {
        !sessionStorage.getItem('auth') && !isAuth ? (
          //when we enter to the system first time or sign out
          // console.log('enter a 1'),
          <main className="hold-transition login-page">
            {/* <Preloader /> */}

            <section className="login-box">
              <header className="login-logo">
                <b>Admin</b>LTE
              </header>

              {/* /.login-logo  */}
              <article className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Inicio de sesión</p>

                  <form method="post" onSubmit={login}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Nombre de usuario" name='user_name' onChange={handleChange} />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input type="password" className="form-control" placeholder="Contraseña" name='user_password' onChange={handleChange} />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <input type="checkbox" id="remember" />
                          <label htmlFor="remember">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <button type='submit' className="btn btn-block btn-primary">
                          Aceptar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </article>
            </section>
          </main>
        ) : (
          // console.log('enter a 2'),
          //when the user is already signed in 
          handleAuth(sessionStorage.getItem('auth')),
          handleUser(JSON.parse(sessionStorage.getItem('user'))),
          <Navigate to='/home' />
        )
      }
    </>
  );
}
export default Login;