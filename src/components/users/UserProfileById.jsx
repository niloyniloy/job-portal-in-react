import { useParams, Link } from "react-router-dom";
import { getUserProfileById } from "./../../api/ApiCalls";
import { formatExperienceDates, formatEducationDates } from "./../../helpers/dateFormatters";
import { useState, useEffect } from "react";
import UserProfileContent from "./UserProfileContent";


function UserProfileById() {
	const { userId } = useParams();
	const [usersProfile, setUsersProfile] = useState({});
	const [statusLists, setStatusLists] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (userId) {
			getUserProfileById(userId, setUsersProfile, setError);
		}
	}, [userId]);

	if (error) {
		return (
			<main className="container mx-auto px-4 py-8">
				<div className="card p-12 text-center">
					<svg
						className="mx-auto h-12 w-12 text-muted-foreground mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 className="text-lg font-semibold mb-2">{error}</h3>
					<p className="text-sm text-muted-foreground mb-4">
						The user you're looking for doesn't exist or has been removed.
					</p>
					<Link to="/" className="btn btn-primary" reloadDocument>
						Back to Home
					</Link>
				</div>
			</main>
		);
	}

	return (
		<UserProfileContent
			usersProfile={usersProfile}
			statusLists={statusLists}
			formatExperienceDates={formatExperienceDates}
			formatEducationDates={formatEducationDates}
		/>
	);
}

export default UserProfileById;
