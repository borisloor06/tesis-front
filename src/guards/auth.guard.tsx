import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Outlet, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models";

interface Props {
	privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: Props) => {
	const userState = useSelector((store: AppStore) => store.user);
	return userState.name ? (
		privateValidation ? (
			<Outlet />
		) : (
			<Navigate replace to={PrivateRoutes.PRIVATE} />
		)
	) : (
		<Navigate replace to={PublicRoutes.LANDING} />
	);
};

export default AuthGuard;
