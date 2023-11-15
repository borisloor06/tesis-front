import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/logAndReg.css";
import { MdOutlineDoubleArrow } from "react-icons/md";
import ReactComponent from "../assets/data_p.svg";

interface LoginProps {
	handleLogin: () => void;
}

function Login({ handleLogin }: LoginProps) {
	const [username, setUsername] = useState("user");
	const [password, setPassword] = useState("pass");
	const [error, setError] = useState("");

	const correctUsername = "user";
	const correctPassword = "pass";
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Verifica si el usuario y la contraseña son correctos
		if (username === correctUsername && password === correctPassword) {
			// Iniciar sesión exitosa
			handleLogin();
		} else {
			// Mostrar un mensaje de error si las credenciales son incorrectas
			setError("Usuario o contraseña incorrectos");
		}
	};

	return (
		<div className="login-container">
			<div className="info-section">
				<h1>
					<b>Natural Language Processing</b>
					<br />
					<br />
				</h1>
				<p>
					<em>
						El Procesamiento del Lenguaje Natural (NLP) es una rama de la inteligencia artificial
						que se enfoca en la interacción entre las computadoras y el lenguaje humano. En nuestra
						aplicación, utilizamos técnicas avanzadas de NLP para ofrecer un análisis profundo de
						sentimientos sobre temas específicos en la plataforma Reddit.
					</em>
				</p>
				<hr />
				<p>
					<em>
						El análisis de sentimientos implica la evaluación y comprensión de las emociones
						expresadas en el texto. En este contexto, nuestra aplicación extrae información valiosa
						de las conversaciones en Reddit, permitiéndote descubrir la percepción general de la
						comunidad hacia un tema en particular.
					</em>
				</p>
			</div>
			<div className="login-section">
				<img src={ReactComponent} alt="SVG Image" width="270" height="180" />
				<img />
				<h1>
					<center>Descubra el potencial del NLP</center>
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="error-message">{error}</div>
					<div className="btn-container">
						<button type="submit">
							Empezar <MdOutlineDoubleArrow />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
