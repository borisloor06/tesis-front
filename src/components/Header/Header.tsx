import { Link } from "react-router-dom";
import { GiProcessor } from "react-icons/gi";

interface HeaderProps {
	isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
	return (
		<nav className="navbar bg-light pt-3 pb-2">
			<div className="container container-fluid">
				<div className="container-fluid p-0">
					<div className="d-flex">
						<Link className="navbar-brand text-dark" to="/">
							<GiProcessor style={{ marginRight: "1rem", width: "2.5rem", height: "2.5rem" }} />
							Natural Language Processing (prototype)
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
