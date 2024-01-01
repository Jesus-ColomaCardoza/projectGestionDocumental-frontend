import { useContext, useEffect, useState } from 'react';
import '../templates/AdminLTE-3.2.0/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import { alertMessage } from '../libraries/alertMessage';
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Login = () => {

  const userData = {
    user_name: '',
    user_password: ''
  }

  const [user, setUser] = useState(userData);
  const [check, setCheck] = useState(false);

  const { handleUser, isAuth, handleAuth } = useContext(UserContext)

  const userPassword = document.getElementById('user_password');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      setCheck(!check);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setCheck(!check);
      localStorage.removeItem('user');
    }
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
            saveDataSessionStorage(data, true);
          }
        });

      } else {
        throw Error('Nombre de usuario o contraseña incorrecta')
      }
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
    }
  }

  const saveDataSessionStorage = (data, value) => {
    sessionStorage.setItem('user', JSON.stringify(data))
    sessionStorage.setItem('auth', value)
    // sessionStorage.clear();
  }

  const loadDataLocalStorage = () => {
    let user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setCheck(true);
    }
    // localStorage.clear();
  }

  const seePassword = (e) => {
    if (e.target) {
      userPassword.setAttribute('type', 'text')
    }
  }

  const dontSeePassword = (e) => {
    if (e.target) {
      userPassword.setAttribute('type', 'password')
    }
  }

  useEffect(() => { loadDataLocalStorage() }, []);

  return (
    <>
      {
        !sessionStorage.getItem('auth') && !isAuth ? (
          //when we enter to the system first time or sign out
          // console.log('enter a 1'),
          <main className="hold-transition login-page login__container">
            {/* <Preloader /> */}

            <section className="login-box">
              <header className="login-logo">
                Sistema <b>Gestión</b> Documental
              </header>

              {/* /.login-logo  */}
              <article className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Inicio de sesión</p>

                  <form method="post" onSubmit={login}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Nombre de usuario" name='user_name' id='user_name' onChange={handleChange} value={user.user_name} />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-user"></span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input type="password" className="form-control" placeholder="Contraseña" name='user_password' id='user_password' onChange={handleChange} value={user.user_password} />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-eye" onMouseDown={seePassword} onMouseUp={dontSeePassword}></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <input type="checkbox" id="remember" onChange={handleChecked} checked={check} />
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