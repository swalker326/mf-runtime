import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
	init,
	loadRemote,
	loadShare,
} from "@module-federation/enhanced/runtime";

init({
	name: "host",
	remotes: [
		{
			name: "remote",
			// mf-manifest.json is a file type generated in the new version of Module Federation build tools, providing richer functionality compared to remoteEntry
			// Preloading depends on the use of the mf-manifest.json file type
			entry: "http://localhost:8081/remoteEntry.js",
			alias: "remote",
		},
	],
	shared: {
		react: {
			version: "18.2.0",
			scope: "default",
			lib: () => React,
			shareConfig: {
				singleton: true,
				requiredVersion: "^18.2.0",
			},
		},
		"react-dom": {
			version: "18.2.0",
			scope: "default",
			lib: () => ReactDOM,
			shareConfig: {
				singleton: true,
				requiredVersion: "^18.2.0",
			},
		},
	},
});
// loadShare("react");
// loadShare("react-dom");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
