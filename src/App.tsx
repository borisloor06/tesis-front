import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Login/Landing";
import "./styles/global.css";
import { PrivateRoutes, PublicRoutes } from "./models";
import { AuthGuard } from "./guards";
import { RoutesWithNotFound } from "./utilities";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loader from "./components/Loader/Loader";

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
