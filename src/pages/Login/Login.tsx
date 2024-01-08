import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMorty } from "../../services/auth.service";
import { UserKey, createUser, resetUser } from "../../redux/states/user";
import { Link, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../models";
import { useEffect } from "react";
import { clearLocalStorage } from "../../utilities";

function Login() {
	const [username, setUsername] = useState("Morty Smith");
	const [password, setPassword] = useState("Alive");
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const result = await getMorty();
			const { name, status } = result;
			if (username === name && password === status) {
				dispatch(createUser(result));
				navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
			} else {
				setError("Error al iniciar sesión. Verifica tu usuario y contraseña.");
			}
		} catch (error) {
			setError("Error al iniciar sesión. Verifica tu usuario y contraseña.");
		}
	};

	useEffect(() => {
		clearLocalStorage(UserKey);
		dispatch(resetUser());
		navigate(PublicRoutes.LOGIN, { replace: true });
	}, []);

	return (
		<div className="login-container">
			<div className="info-section-login">
				<h1>
					<b>Inicie sesión para visualizar los análisis</b>
				</h1>
				<p>
					<em>
						Iniciar sesión le permitirá acceder a los resultados de los análisis pero además podrá
						determinar el tema que desee analizar y mantener su historial activo.
					</em>
				</p>
			</div>
			<div className="login-section">
				<h1>Iniciar Sesión</h1>
				<form onSubmit={handleSubmit}>
					<div className="middle">
						<div className="fields">
							<div className="input-group">
								<label htmlFor="username">Usuario</label>
								<input
									type="text"
									id="username"
									name="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className="input-group">
								<label htmlFor="password">Contraseña</label>
								<input
									type="password"
									id="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="buts">
							<div className="btn-container">
								<button type="submit">Iniciar Sesión</button>
							</div>
							<div className="error-message">{error}</div>
							<div className="forgot-password">
								<Link to="#">¿Olvidó su contraseña?</Link>
							</div>
						</div>
					</div>
					<div className="register-link">
						¿No tiene una cuenta? <Link to="/register">Regístrese aquí</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
