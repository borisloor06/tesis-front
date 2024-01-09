import "./styles/global.css";

import { lazy, Suspense, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import { AuthGuard } from "./guards";
import { PrivateRoutes, PublicRoutes } from "./models";
import Landing from "./pages/Login/Landing";
import store from "./redux/store";
import { RoutesWithNotFound } from "./utilities";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		// Lógica de autenticación (por ejemplo, hacer una solicitud al servidor)
		// Si la autenticación es exitosa, establece isLoggedIn en true
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Lógica para cerrar sesión
		setIsLoggedIn(false);
	};

	return (
		<div>
			<Suspense fallback={<Loader />}>
				<Provider store={store}>
					<BrowserRouter>
						<Header />
						<RoutesWithNotFound>
							<Route path="/" element={<Navigate replace to={PrivateRoutes.PRIVATE} />} />
							<Route path={PublicRoutes.LANDING} element={<Landing />} />
							<Route path={PublicRoutes.LOGIN} element={<Login />} />
							<Route element={<AuthGuard privateValidation={true} />}>
								<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
							</Route>
						</RoutesWithNotFound>
					</BrowserRouter>
				</Provider>
			</Suspense>
			{/* {!isLoggedIn && <Footer />} */}
		</div>
	);
}

export default App;
