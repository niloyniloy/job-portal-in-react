import { getUsersProfie, getMyApplicationsWithFilters } from "./../../api/ApiCalls";
import { formatExperienceDates, formatEducationDates } from "./../../helpers/dateFormatters";
import { useState, useEffect } from "react";
import UserProfileContent from "./UserProfileContent";

function UserProfile() {
	const [usersProfile, setUsersProfile] = useState({});
	const [statusLists, setStatusLists] = useState([]);

	useEffect(() => {
		getUsersProfie(setUsersProfile);
		getMyApplicationsWithFilters({}, () => {}, setStatusLists);
	}, []);

	return (
		<UserProfileContent
			usersProfile={usersProfile}
			statusLists={statusLists}
			formatExperienceDates={formatExperienceDates}
			formatEducationDates={formatEducationDates}
		/>
	);
}

export default UserProfile;
