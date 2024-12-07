import { loadRemote } from "@module-federation/enhanced/runtime";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const loadRemoteWithZephyr = <T extends { default: React.ComponentType }>(
	remote: string,
) => {
	// Upload remote to Zephyr
	return lazy(() =>
		loadRemote<T>(remote).then(
			(module) =>
				module ?? {
					default: () => <h2>Remote not found</h2>,
				},
		),
	);
};

export const System = ({ remote }: { remote: string }) => {
	if (!remote) {
		return <h2>No remote specified</h2>;
	}

	const Component = loadRemoteWithZephyr(remote);

	return (
		<ErrorBoundary fallback={<h1>Remote Failed to load</h1>}>
			<Suspense fallback="Loading System">
				<Component />
			</Suspense>
		</ErrorBoundary>
	);
};
