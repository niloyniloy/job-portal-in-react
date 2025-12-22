export const formatExperienceDates = (startDate, endDate) => {
	if (!startDate) return "";

	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();

	const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
	const endStr = endDate ? end.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";

	const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
	const years = Math.floor(months / 12);
	const remainingMonths = months % 12;

	let duration = "";
	if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
	if (remainingMonths > 0) duration += `${duration ? " " : ""}${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;

	return `${startStr} - ${endStr} • ${duration || "< 1 month"}`;
};

export const formatEducationDates = (startDate, endDate) => {
	if (!startDate || !endDate) return "";
	const start = new Date(startDate).getFullYear();
	const end = new Date(endDate).getFullYear();
	return `${start} - ${end}`;
};

export const formatMonthYear = (dateString) => {
	if (!dateString) return "";

	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
};


export const formatDeadLineDate = (dateString) => {
	if (!dateString) return "";

	const date = new Date(dateString);

	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};
