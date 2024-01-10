import "./styles/global.css";

import { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import { Config, useConfig } from "./Config/Config";
import { PrivateRoutes, PublicRoutes } from "./models";
import Landing from "./pages/Login/Landing";
import store from "./redux/store";
import { fetchData } from "./services/GetDataServices";
import { RoutesWithNotFound } from "./utilities";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
	const { getSettings } = fetchData();
	const { updateConfig } = useConfig();

	useEffect(() => {
		getSettings()
			.then((settings) => {
				const { urlProd, urlDev, devEnv } = settings.data as Config;
				updateConfig({ urlProd, urlDev, devEnv });
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<Suspense fallback={<Loader />}>
				<Provider store={store}>
					<BrowserRouter>
						<Header />
						<RoutesWithNotFound>
							<Route path="/" element={<Navigate replace to={PrivateRoutes.PRIVATE} />} />
							<Route path={PublicRoutes.LANDING} element={<Landing />} />
							{/* <Route path={PublicRoutes.LOGIN} element={<Login />} /> */}
							{/* <Route element={<AuthGuard privateValidation={true} />}> */}
							<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
							{/* </Route> */}
						</RoutesWithNotFound>
					</BrowserRouter>
				</Provider>
			</Suspense>
			{/* {!isLoggedIn && <Footer />} */}
		</div>
	);
}

export default App;
