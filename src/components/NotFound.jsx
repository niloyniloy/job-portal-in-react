import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
				<p className="text-2xl font-semibold text-foreground mb-2">Page Not Found</p>
				<p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
				<Link to="/" className="btn btn-primary" reloadDocument>
					Go Home
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
