import "../../styles/global.css";
import "../../styles/landing.css";

import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

import ReactComponent from "../../assets/data_p.svg";

function Landing() {
	return (
		<div className="landing-container">
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
			<div className="landing-section">
				<img src={ReactComponent} alt="SVG Image" width="270" height="180" />
				<img />
				<h1>
					<center>Descubra el potencial del NLP</center>
				</h1>
				<div className="btn-container">
					<button>
						<Link to="/login">
							Empezar <MdOutlineDoubleArrow />
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Landing;
