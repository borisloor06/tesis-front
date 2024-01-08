import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { resetUser, UserKey } from "../../redux/states/user";
import { clearLocalStorage } from "../../utilities";
import { BiLogOut } from "react-icons/bi";

function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logOut = () => {
		clearLocalStorage(UserKey);
		dispatch(resetUser());
		navigate(PublicRoutes.LANDING, { replace: true });
		console.log("Logged out");
	};
	return (
		<li className="nav-item">
			<button className="navBar nav-link text-white" onClick={logOut}>
				<BiLogOut
					style={{
						marginRight: "1.15rem",
						marginLeft: "-.15rem",
						width: "1.2rem",
						height: "1.5rem",
						marginTop: "-.3rem",
					}}
				/>
				Cerrar Sesión
			</button>
		</li>
	);
}
export default Logout;
