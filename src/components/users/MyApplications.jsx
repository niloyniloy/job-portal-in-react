
import { useParams, Link } from "react-router-dom";
import { getMyApplicationsWithFilters, renderProfileImage, formatSalary, withdrawJobApplication, formatDate } from "./../../api/ApiCalls";
import { useState, useEffect, useRef } from "react";  
import ChevronRightIcon from './../icons/ChevronRightIcon' 
import RotateCcwIcon from './../icons/RotateCcwIcon'
import ChevronDownIcon from './../icons/ChevronDownIcon'  
import EyeIcon from './../icons/EyeIcon'
import ClockIcon from './../icons/ClockIcon'

function MyApplications() {

	const [appFilters, setAppFilter] = useState({ status: "", sort: "Newest First", date: "" });
	const [MyApplications, setMyApplications] = useState({ count: "", data: [] });
	const [statusLists, setStatusLists] = useState([]);
	const statusRef = useRef([]);
	const datesRef = useRef([]);
	const dropdownRef = useRef(null);
	const [isSortOpen, setIsSortOpen] = useState(false);

	const dateFilters = [
		{ label: "All Time", value: "all", default: true },
		{ label: "Last 7 Days", value: "last 7 days" },
		{ label: "Last 30 Days", value: "last 30 days" },
		{ label: "Last 3 Months", value: "last 90 days" },
	];

	useEffect(() => {
		setTimeout(() => {

		}, 100);
		getMyApplicationsWithFilters(appFilters, setMyApplications, setStatusLists);
	}, [appFilters]);

	const withdrawApplicaton = (applicationId) => {

		if (confirm("Are you sure to withdraw application?")) {

			withdrawJobApplication(applicationId, setMyApplications);
			setMyApplications(prev => ({
				...prev,
				data: prev.data.filter(app => app.id !== applicationId),
			}));
		}
	}

	const checkDateChecked = (index, item) => {

		let value = "";

		datesRef.current.forEach((checkbox, i) => {

			if (checkbox.checked == true) {
				value = checkbox.value;
			}
		});

		setAppFilter(prev => ({
			...prev,
			date: value
		}));
	}

	const handleCheck = (clickedIndex, value) => {

		let anyItemChecked = false;
		let valueArray = [];
		let status = '';

		statusRef.current.forEach((checkbox, i) => {

			if (checkbox.checked == true) {
				anyItemChecked = true;
				valueArray.push(checkbox.value)
			}
		});

		if (!anyItemChecked) {

			status = '';
		} else {
			status = valueArray.join(",");
		}

		// update filter value
		setAppFilter(prev => ({
			...prev,
			status: status
		}));
	};

	const filterBySort = (sort, text) => {

		document.querySelector(".sort-options span").innerHTML = text;
		dropdownRef.current.classList.remove("show");

		setMyApplications(prev => ({
			count: "",
			data: [],
		}));

		setAppFilter(prev => ({
			...prev,
			sort: sort
		}));

		setIsSortOpen(false);
	}

	const resetFilter = () => {

		statusRef.current.forEach((checkbox, i) => {
			checkbox.checked = false;
		});

		datesRef.current.forEach((checkbox, i) => {

			checkbox.checked = false;
		});

		document.querySelector(".sort-options span").innerHTML = "Newest First";

		setAppFilter({ status: "", sort: "Newest First", date: "" });
	}

	const toggleDropdowns = () => {

		setIsSortOpen(prev => !prev);
	}

	return (
		<>
			<main className="container mx-auto px-4 py-8">
				{/* Page Header */}
				<div className="mb-8">
					<div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
						<Link
							to="/user/dashboard"
							className="hover:text-[hsl(var(--color-primary))]"
							reloadDocument
						>
							Dashboard
						</Link>
						<ChevronRightIcon />
						<span className="text-[hsl(var(--color-foreground))]">Applied Jobs</span>
					</div>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
							<p className="text-[hsl(var(--color-muted-foreground))]">
								Track all your job applications in one place
							</p>
						</div>
						<div className="text-sm text-[hsl(var(--color-muted-foreground))]">
							<span className="font-medium text-[hsl(var(--color-foreground))]">
								{MyApplications.count} &nbsp;
							</span>
							applications
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Filters Sidebar */}
					<aside className="lg:col-span-1">
						<div className="card p-6 sticky top-20">
							<h2 className="font-semibold mb-4">Filters</h2>
							{/* Status Filter */}
							<div className="mb-6">
								<h3 className="text-sm font-medium mb-3">Application Status</h3>
								<div className="space-y-2">
									{statusLists.map((status, index) => (
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												ref={(el) => (statusRef.current[index] = el)}
												value={status.status}
												onChange={() => handleCheck(index, status)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">{status.status}</span>
											<span className="ml-auto text-xs text-[hsl(var(--color-muted-foreground))]">
												{status.count}
											</span>
										</label>
									))}

								</div>
							</div>
							{/* Date Filter */}
							<div className="mb-6">
								<h3 className="text-sm font-medium mb-3">Application Date</h3>
								<div className="space-y-2">
									{dateFilters.map((item, index) => (
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												name="date"
												value={item.value}
												className="border-[hsl(var(--color-input))]"
												onChange={() => checkDateChecked(index, item.value)}
												ref={(el) => (datesRef.current[index] = el)}
											/>
											<span className="text-sm">{item.label}</span>
										</label>
									))}
								</div>
							</div>
							<button onClick={() => resetFilter()} className="btn btn-outline w-full">
								<RotateCcwIcon />
								Reset Filters
							</button>
						</div>
					</aside>
					{/* Applications List */}
					<div className="lg:col-span-3 space-y-4">
						{/* Sort and View Options */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
							<div className="flex items-center gap-2">
								<span className="text-sm text-[hsl(var(--color-muted-foreground))]">
									Sort by:
								</span>
								<div className="relative">
									<button
										className="btn btn-outline text-sm h-9 sort-options"
										onClick={toggleDropdowns}
									>
										<span>Newest First</span>
										<ChevronDownIcon />
									</button>
									<div
										ref={dropdownRef}
										className={`dropdown-content absolute top-full left-0 mt-2 w-48 card p-2 shadow-lg z-10 ${isSortOpen ? "show" : ""}`}
									>
										<button onClick={() => filterBySort('Newest First', 'Newest First')} className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]">
											Newest First
										</button>
										<button onClick={() => filterBySort('Oldest First', 'Oldest First')} className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[hsl(var(--color-accent))]">
											Oldest First
										</button>
									</div>
								</div>
							</div>
						</div>

						{MyApplications.data.map((job) => (

							<div className="card p-6 hover:shadow-md transition-shadow" >
								<div className="flex flex-col md:flex-row gap-6">
									{/* Company Logo */}
									<div className="flex-shrink-0">
										{job.job?.company?.logoUrl ? (
											<div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
												<img src={renderProfileImage(job.job?.company?.logoUrl)} alt={job?.company?.name} className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center" />
											</div>
										) : (
											<div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-8 w-8 text-[hsl(var(--color-primary))]"
												>
													<path d="M10 12h4" />
													<path d="M10 8h4" />
													<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
													<path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
													<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
												</svg>

											</div>
										)}
									</div>
									{/* Job Info */}
									<div className="flex-1 min-w-0">
										<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
											<div className="flex-1">
												<h3 className="text-lg font-semibold mb-1">
													<Link
														to={`/job-details/${job.job.slug}`}
														className="hover:text-[hsl(var(--color-primary))]"
														reloadDocument
													>
														{job.job.title}
													</Link>
												</h3>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
													<span
														className="hover:text-[hsl(var(--color-primary))]"
													>
														{job?.job?.company?.name}
													</span>
												</p>

												<p>
													{job?.coverLetter}
												</p>
											</div>
											<span className="badge badge-warning">{job.status}</span>
										</div>
										<div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
											<span className="flex items-center gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													data-lucide="map-pin"
													className="lucide lucide-map-pin h-4 w-4"
												>
													<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
													<circle cx="12" cy="10" r="3" />
												</svg>

												{job?.job?.company?.location}
											</span>
											<span className="flex items-center gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-4 w-4"
												>
													<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
													<rect width="20" height="14" x="2" y="6" rx="2" />
												</svg>

												{job.job.type}
											</span>
											<span className="flex items-center gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-4 w-4"
												>
													<line x1="12" y1="2" x2="12" y2="22" />
													<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
												</svg>

												{formatSalary(job.job.salaryMin, job.job.salaryMax)}
											</span>
										</div>
										{/* Application Info */}
										<div className="flex flex-wrap items-center justify-between gap-3">
											<div className="flex items-center gap-4 text-xs text-[hsl(var(--color-muted-foreground))]">
												<span className="flex items-center gap-1">
													<ClockIcon />
													Applied on {formatDate(job.createdAt)}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Link
													to={`/job-details/${job.job.slug}`}
													className="btn btn-outline text-sm h-9"
													reloadDocument
												>
													<EyeIcon />
													View Job
												</Link>
												<button onClick={() => withdrawApplicaton(job.id)} className="btn btn-outline text-sm h-9">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="x" className="lucide lucide-x h-4 w-4 mr-2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
													Withdraw
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

						))}


						{/* Loading State (Hidden by default) */}
						<div className="hidden space-y-4" id="loadingState">
							<div className="card p-6">
								<div className="flex gap-6">
									<div className="skeleton h-16 w-16 rounded-lg" />
									<div className="flex-1 space-y-3">
										<div className="skeleton h-6 w-3/4" />
										<div className="skeleton h-4 w-1/2" />
										<div className="skeleton h-4 w-full" />
									</div>
								</div>
							</div>
							<div className="card p-6">
								<div className="flex gap-6">
									<div className="skeleton h-16 w-16 rounded-lg" />
									<div className="flex-1 space-y-3">
										<div className="skeleton h-6 w-3/4" />
										<div className="skeleton h-4 w-1/2" />
										<div className="skeleton h-4 w-full" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main >
		</>
	)
}

export default MyApplications
