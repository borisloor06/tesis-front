import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ConfigProvider } from "./Config/Config";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);
