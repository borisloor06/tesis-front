import { Link } from "react-router-dom";
import { GiProcessor } from "react-icons/gi";
import ReactComponent from "../../assets/logo-uleam.png";

interface HeaderProps {
	isLoggedIn: boolean;
}

const Header = () => {
	return (
		<nav className="navbar bg-light pt-3 pb-2">
			<div className="container container-fluid">
				<div className="container-fluid p-0">
					<div className="d-flex justify-content-between">
						<Link className="navbar-brand text-dark" to="/">
							<div>
								<GiProcessor style={{ marginRight: "1rem", width: "2.5rem", height: "2.5rem" }} />
								Natural Language Processing (prototype)
							</div>
						</Link>
						<img src={ReactComponent} alt="SVG Image" height="48" />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
