import { lazy } from "react";
import { Route } from "react-router-dom";

import { PrivateRoutes } from "../../models";
import { RoutesWithNotFound } from "../../utilities";

const Home = lazy(() => import("./Home/Home"));
const Index = lazy(() => import("./App/Dashboard"));
const AnalysisNLP = lazy(() => import("./App/AnalysisNLP"));
const WCPage = lazy(() => import("./App/WCPage"));
const Transformers = lazy(() => import("./App/Transformers"));
const History = lazy(() => import("./App/History"));
const Posts = lazy(() => import("./App/Posts"));
const Settings = lazy(() => import("./App/Settings"));
const NewExtraction = lazy(() => import("./App/NewExtraction"));
const Profile = lazy(() => import("./App/Profile"));

function Private() {
	return (
		<RoutesWithNotFound>
			<Route path="/" element={<Home />}>
				<Route index element={<Index />} />
				<Route path={PrivateRoutes.ANALYSIS_NLP} element={<AnalysisNLP />} />
				<Route path={PrivateRoutes.WC_PAGE} element={<WCPage />} />
				<Route path={PrivateRoutes.TRANSFORMERS} element={<Transformers />} />
				<Route path={PrivateRoutes.HISTORY} element={<History />} />
				<Route path={PrivateRoutes.POSTS} element={<Posts />} />
				<Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
				<Route path={PrivateRoutes.EXTRACTION} element={<NewExtraction />} />
				<Route path={PrivateRoutes.PROFILE} element={<Profile />} />
			</Route>
		</RoutesWithNotFound>
	);
}

export default Private;
