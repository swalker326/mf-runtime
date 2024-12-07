import { loadRemote } from "@module-federation/enhanced/runtime";
import { lazy, Suspense } from "react";

export const System = ({ remote }: { remote: string }) => {
	if (!remote) {
		return <h2>No remote specified</h2>;
	}

	const Component = lazy(() => {
		const module = loadRemote<{ default: React.ComponentType }>(remote);
		if (module === null) {
			return Promise.resolve(() => <h2>Remote not found</h2>);
		}
		return module;
	});

	return (
		<Suspense fallback="Loading System">
			<Component />
		</Suspense>
	);
};
