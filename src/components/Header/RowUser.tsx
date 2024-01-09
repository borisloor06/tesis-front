import { GiExtractionOrb } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";

function RowUser() {
	return (
		<ul className="row-user">
			<li className="btn-extract">
				<GiExtractionOrb
					style={{
						marginRight: "1rem",
						width: "1.5rem",
						height: "1.5rem",
					}}
				/>
				<Link to="/private/extraction">Nueva Extracción</Link>
			</li>
			<li>
				<MdNotifications
					style={{
						marginRight: "1rem",
						width: "2rem",
						height: "2rem",
					}}
					className="btn-notifications"
				/>
				<Link to="/private/profile" className="btn-profile">
					<HiUserCircle
						style={{
							width: "2rem",
							height: "2rem",
						}}
					/>
				</Link>
			</li>
		</ul>
	);
}

export default RowUser;
