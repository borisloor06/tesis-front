import { Link } from 'react-router-dom';
import '../styles/global.css';

function Register() {
  return (
    <div className='login-container'>
      <div className='info-section'>
        <h1>
          <b>Regístrate hoy y comienza a encuestar!</b>
        </h1>
        <p>
          ¿Estás listo para obtener información relevante y tomar decisiones
          informadas? Regístrate en SurveyISP y comienza a crear encuestas en
          línea de manera efectiva.
        </p>
      </div>
      <div className='login-section'>
        <h1>Registro</h1>
        <form>
          <div className='input-group'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' name='name' />
          </div>
          <div className='input-group'>
            <label htmlFor='lastname'>Apellido</label>
            <input type='text' id='lastname' name='lastname' />
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' />
          </div>
          <div className='input-group'>
            <label htmlFor='username'>Usuario</label>
            <input type='text' id='username' name='username' />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' />
          </div>
          <div className='input-group'>
            <label htmlFor='confPassword'>Confirmar contraseña</label>
            <input type='password' id='confPassword' name='confPassword' />
          </div>
          <div className='btn-container'>
            <button type='submit'>Registrarse</button>
          </div>
          <div className='register-link'>
            ¿Ya tiene una cuenta? <Link to='/'>Inicie sesión aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
